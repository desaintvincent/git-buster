import { useEffect, useState } from 'preact/hooks'
import { MR, ProjectGroup, PROJECTS } from '../types'

export interface MRWithProject extends MR { projectPath: string }

const fetchOpenedMrsForProject = async (baseUrl: string, projectPath: string): Promise<MRWithProject[]> => {
  const encoded = encodeURIComponent(projectPath)
  const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests?state=opened&per_page=100`
  const res = await fetch(url)
  if (!res.ok) { throw new Error(`Failed ${projectPath}: ${res.status}`) }
  const data: MR[] = await res.json()
  return data.map(mr => ({ ...mr, projectPath }))
}

export const useProjectMergeRequests = (baseUrl: string | undefined, projectGroups: ProjectGroup[] | undefined, groupName: string) => {
  const [mrs, setMrs] = useState<MRWithProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!baseUrl) { setError('Missing baseUrl option'); setLoading(false); return }
    let cancelled = false
    setLoading(true)
    const groups = (projectGroups && projectGroups.length ? projectGroups : PROJECTS)
    const group: ProjectGroup = groups.find((g: ProjectGroup) => g.name === groupName) || groups[0]
    const paths = group?.projects || []
    Promise.all(paths.map(p => fetchOpenedMrsForProject(baseUrl, p)))
      .then(results => { if (!cancelled) { setMrs(results.flat()); setError(null) } })
      .catch(e => { if (!cancelled) { setError(e.message) } })
      .finally(() => { if (!cancelled) { setLoading(false) } })
    return () => { cancelled = true }
  }, [baseUrl, projectGroups, groupName])

  return { mrs, loading, error }
}
