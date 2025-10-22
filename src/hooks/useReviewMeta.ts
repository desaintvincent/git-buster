import { useEffect, useState } from 'preact/hooks'
import type { MR, Approval, User } from '../types'

const REVIEW_META_BATCH_SIZE = 5
const reviewMetaCache: Record<number, { updated_at: string; approvalsUsers: User[]; reviewersUsers: User[] }> = {}

const fetchReviewMeta = async (baseUrl: string, mr: MR): Promise<{ approvalsUsers: User[]; reviewersUsers: User[] }> => {
  const approvalsUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`
  let approvalsUsers: User[] = []
  try {
    const res = await fetch(approvalsUrl)
    if (res.ok) {
      const data: Approval = await res.json()
      approvalsUsers = Array.isArray(data.approved_by) ? data.approved_by.map(a => a.user).filter(u => !!u?.username) : []
    }
  } catch {}
  const notesUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/notes?per_page=100`
  let commentUsers: User[] = []
  try {
    const res = await fetch(notesUrl)
    if (res.ok) {
      const notes = await res.json()
      commentUsers = notes.filter((n: any) => !n.system && n.author?.username).map((n: any) => n.author as User)
    }
  } catch {}
  const authorUsername = mr.author?.username
  const reviewerMap: Record<string, User> = {}
  for (const u of approvalsUsers.concat(commentUsers)) {
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

  useEffect(() => {
    let cancelled = false
    if (!baseUrl || !mrs.length) { setApprovalsUsersByMr({}); setReviewersUsersByMr({}); setLoading(false); return }
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
      for (let i = 0; i < toFetch.length && !cancelled; i += REVIEW_META_BATCH_SIZE) {
        const slice = toFetch.slice(i, i + REVIEW_META_BATCH_SIZE)
        try {
          const results = await Promise.all(slice.map(mr => fetchReviewMeta(baseUrl!, mr).then(meta => ({ id: mr.id, updated_at: mr.updated_at, meta }))))
          if (cancelled) return
          for (const r of results) {
            reviewMetaCache[r.id] = { updated_at: r.updated_at, approvalsUsers: r.meta.approvalsUsers, reviewersUsers: r.meta.reviewersUsers }
          }
          populateFromCache()
        } catch {}
      }
      if (!cancelled) setLoading(false)
    }
    run()
    return () => { cancelled = true }
  }, [baseUrl, mrs, refreshToken])

  return { approvalsUsersByMr, reviewersUsersByMr, loading }
}

