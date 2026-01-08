import { useEffect, useState, useRef } from 'preact/hooks'
import type { MR, Approval, User } from '../types'

const REVIEW_META_BATCH_SIZE = 15
const reviewMetaCache: Record<number, { updated_at: string; approvalsUsers: User[]; reviewersUsers: User[] }> = {}

// NEW: Fetch approvals for all MRs in a project at once
const fetchProjectApprovals = async (baseUrl: string, projectId: number, mrIids: number[]): Promise<Record<number, User[]>> => {
  const approvalsByIid: Record<number, User[]> = {}

  // Fetch approvals in parallel for all MRs in this project
  const results = await Promise.all(
    mrIids.map(async iid => {
      try {
        const url = `${baseUrl}/api/v4/projects/${projectId}/merge_requests/${iid}/approvals`
        const res = await fetch(url)
        if (!res.ok) return { iid, users: [] }
        const data: Approval = await res.json()
        const users = Array.isArray(data.approved_by) ? data.approved_by.map(a => a.user).filter(u => !!u?.username) : []
        return { iid, users }
      } catch {
        return { iid, users: [] }
      }
    })
  )

  results.forEach(r => { approvalsByIid[r.iid] = r.users })
  return approvalsByIid
}

const fetchReviewMeta = async (baseUrl: string, mr: MR, projectApprovals?: Record<number, User[]>): Promise<{ approvalsUsers: User[]; reviewersUsers: User[] }> => {
  // Use pre-fetched approvals if available, otherwise fetch individually (fallback)
  const approvalsUsers = projectApprovals?.[mr.iid] ?? []

  // Optimize: Use existing MR.reviewers field (already fetched in initial API call)
  const existingReviewers = Array.isArray(mr.reviewers) ? mr.reviewers.filter(u => !!u?.username) : []

  // Optimize notes query: reduce page size to 50, add sorting
  const notesUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/notes?per_page=50&sort=asc&order_by=created_at`

  // Only fetch notes if needed, approvals already provided
  const commentUsers = mr.user_notes_count > 0
    ? await fetch(notesUrl)
        .then(async res => {
          if (!res.ok) return []
          const notes = await res.json()
          return notes.filter((n: any) => !n.system && n.author?.username).map((n: any) => n.author as User)
        })
        .catch(() => [])
    : []

  const authorUsername = mr.author?.username
  const reviewerMap: Record<string, User> = {}
  // Combine: existing reviewers + approvers + comment authors
  for (const u of existingReviewers.concat(approvalsUsers).concat(commentUsers)) {
    if (!u?.username || u.username === authorUsername) continue
    reviewerMap[u.username] = u
  }
  const reviewersUsers = Object.values(reviewerMap)
  return { approvalsUsers, reviewersUsers }
}

export const useReviewMeta = (baseUrl: string | undefined, mrs: MR[], refreshToken: number) => {
  const [approvalsUsersByMr, setApprovalsUsersByMr] = useState<Record<number, User[]>>({})
  const [reviewersUsersByMr, setReviewersUsersByMr] = useState<Record<number, User[]>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const prevRefreshToken = useRef(refreshToken)

  useEffect(() => {
    let cancelled = false
    if (!baseUrl || !mrs.length) { setApprovalsUsersByMr({}); setReviewersUsersByMr({}); setLoading(false); return }

    if (prevRefreshToken.current !== refreshToken) {
      mrs.forEach(mr => delete reviewMetaCache[mr.id])
      prevRefreshToken.current = refreshToken
    }

    const toFetch = mrs.filter(mr => !reviewMetaCache[mr.id] || reviewMetaCache[mr.id].updated_at !== mr.updated_at)
    const populateFromCache = () => {
      const approvals: Record<number, User[]> = {}
      const reviewers: Record<number, User[]> = {}
      mrs.forEach(mr => {
        const c = reviewMetaCache[mr.id]
        approvals[mr.id] = c.approvalsUsers
        reviewers[mr.id] = c.reviewersUsers
      })
      setApprovalsUsersByMr(approvals)
      setReviewersUsersByMr(reviewers)
    }
    if (!toFetch.length) { populateFromCache(); setLoading(false); return }
    setLoading(true)
    const run = async () => {
      try {
        // NEW STRATEGY: Group MRs by project and fetch all approvals per project in parallel
        const mrsByProject: Record<number, MR[]> = {}
        toFetch.forEach(mr => {
          if (!mrsByProject[mr.project_id]) mrsByProject[mr.project_id] = []
          mrsByProject[mr.project_id].push(mr)
        })

        // Fetch approvals for all projects in parallel
        const projectIds = Object.keys(mrsByProject).map(Number)
        const allProjectApprovals = await Promise.all(
          projectIds.map(async projectId => {
            const mrs = mrsByProject[projectId]
            const iids = mrs.map(mr => mr.iid)
            const approvals = await fetchProjectApprovals(baseUrl!, projectId, iids)
            return { projectId, approvals }
          })
        )

        // Build approval lookup map
        const approvalsByProjectAndIid: Record<number, Record<number, User[]>> = {}
        allProjectApprovals.forEach(({ projectId, approvals }) => {
          approvalsByProjectAndIid[projectId] = approvals
        })

        if (cancelled) return

        // Now fetch notes for MRs (with approvals already available)
        const batches: MR[][] = []
        for (let i = 0; i < toFetch.length; i += REVIEW_META_BATCH_SIZE) {
          batches.push(toFetch.slice(i, i + REVIEW_META_BATCH_SIZE))
        }

        const batchResults = await Promise.all(
          batches.map(batch =>
            Promise.all(
              batch.map(mr =>
                fetchReviewMeta(baseUrl!, mr, approvalsByProjectAndIid[mr.project_id])
                  .then(meta => ({ id: mr.id, updated_at: mr.updated_at, meta }))
                  .catch(() => null)
              )
            )
          )
        )

        if (cancelled) return

        // Update cache with all results
        for (const batchResult of batchResults) {
          for (const r of batchResult) {
            if (r) {
              reviewMetaCache[r.id] = {
                updated_at: r.updated_at,
                approvalsUsers: r.meta.approvalsUsers,
                reviewersUsers: r.meta.reviewersUsers
              }
            }
          }
        }

        populateFromCache()
      } catch (error) {
        // Even if some batches fail, populate what we have
        if (!cancelled) populateFromCache()
      }

      if (!cancelled) setLoading(false)
    }
    run()
    return () => { cancelled = true }
  }, [baseUrl, mrs, refreshToken])

  return { approvalsUsersByMr, reviewersUsersByMr, loading }
}
