import { useEffect, useState } from 'preact/hooks'
import { MR, ProjectGroup } from '../types'

export interface MRWithProject extends MR { projectPath: string }

const fetchOpenedMrsForProject = async (baseUrl: string, projectPath: string): Promise<MRWithProject[]> => {
  const encoded = encodeURIComponent(projectPath)
  // Optimized query: include pipeline data, check merge status, and maximize items per page
  // Note: GitLab API supports up to per_page=100 by default, some instances allow higher
  const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests?state=opened&per_page=100&with_head_pipeline=true&with_merge_status_recheck=false`
  const res = await fetch(url)
  if (!res.ok) { throw new Error(`Failed ${projectPath}: ${res.status}`) }
  const data: MR[] = await res.json()
  return data.map(mr => ({ ...mr, projectPath }))
}

const fetchMrDetails = async (baseUrl: string, projectPath: string, iid: number): Promise<Partial<MR>> => {
  const encoded = encodeURIComponent(projectPath)
  const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests/${iid}`
  const res = await fetch(url)
  if (!res.ok) { throw new Error(`Failed details ${projectPath}!${iid}: ${res.status}`) }
  const data: MR = await res.json()
  return { head_pipeline: data.head_pipeline }
}

export const useProjectMergeRequests = (baseUrl: string | undefined, projectGroups: ProjectGroup[] | undefined, groupName: string) => {
  const [mrs, setMrs] = useState<MRWithProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!baseUrl) { setError('Missing baseUrl option'); setLoading(false); return }
    if (!projectGroups || !projectGroups.length) { setError('No projects configured'); setMrs([]); setLoading(false); return }
    let cancelled = false
    setLoading(true)
    const group: ProjectGroup = projectGroups.find((g: ProjectGroup) => g.name === groupName) || projectGroups[0]
    const paths = group?.projects || []
    Promise.all(paths.map(p => fetchOpenedMrsForProject(baseUrl, p)))
      .then(async results => {
        if (cancelled) return
        const flat = results.flat()
        setError(null)
        // With with_head_pipeline=true, we should have pipeline data. Only fetch details as fallback for edge cases
        const needDetails = flat.filter(mr => typeof mr.head_pipeline === 'undefined')
        if (needDetails.length > 0) {
          // Increased concurrency from 6 to 12 for faster fallback fetching
          const concurrency = 12
          const detailResults: Array<{ idx: number; pipeline: any }> = []
          let i = 0
          const runNext = async () => {
            if (i >= needDetails.length) return
            const currentIndex = i++
            const mr = needDetails[currentIndex]
            try {
              const partial = await fetchMrDetails(baseUrl, mr.projectPath, mr.iid)
              detailResults.push({ idx: flat.indexOf(mr), pipeline: partial.head_pipeline })
            } catch {}
            await runNext()
          }
          await Promise.all(Array.from({ length: concurrency }, () => runNext()))
          for (const { idx, pipeline } of detailResults) {
            if (pipeline && flat[idx]) { (flat[idx] as any).head_pipeline = pipeline }
          }
        }
        if (!cancelled) { setMrs(flat) }
      })
      .catch(e => { if (!cancelled) { setError(e.message) } })
      .finally(() => { if (!cancelled) { setLoading(false) } })
    return () => { cancelled = true }
  }, [baseUrl, projectGroups, groupName])

  return { mrs, loading, error }
}
