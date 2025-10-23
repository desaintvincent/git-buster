import { useEffect, useState } from 'preact/hooks'
import { MR } from '../types'

export interface MRWithProject extends MR { projectPath: string }

export interface ProjectGroup { name: string; projects: string[] }
export const PROJECTS: ProjectGroup[] = [
  { name: 'sywa', projects: [ 'sywa/sywa/frontend', 'sywa/sywa/backend', 'sywa/sywa/sywatt', 'sywa/sywa/sywack' ] },
  { name: 'slip', projects: [ 'slip/mono-slip' ] }
]

const fetchOpenedMrsForProject = async (baseUrl: string, projectPath: string): Promise<MRWithProject[]> => {
  const encoded = encodeURIComponent(projectPath)
  const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests?state=opened&per_page=100`
  const res = await fetch(url)
  if (!res.ok) { throw new Error(`Failed ${projectPath}: ${res.status}`) }
  const data: MR[] = await res.json()
  return data.map(mr => ({ ...mr, projectPath }))
}

export const useProjectMergeRequests = (baseUrl: string | undefined, groupName: string) => {
  const [mrs, setMrs] = useState<MRWithProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!baseUrl) { setError('Missing baseUrl option'); setLoading(false); return }
    let cancelled = false
    setLoading(true)
    const group = PROJECTS.find(g => g.name === groupName) || PROJECTS[0]
    const paths = group?.projects || []
    Promise.all(paths.map(p => fetchOpenedMrsForProject(baseUrl, p)))
      .then(results => { if (!cancelled) { setMrs(results.flat()); setError(null) } })
      .catch(e => { if (!cancelled) { setError(e.message) } })
      .finally(() => { if (!cancelled) { setLoading(false) } })
    return () => { cancelled = true }
  }, [baseUrl, groupName])

  return { mrs, loading, error }
}
