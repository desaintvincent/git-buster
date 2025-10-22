import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Options, MR } from './types'

interface OverviewProps { options: Options }

// Project paths to display (namespace/project)
const PROJECT_PATHS = [
  'sywa/sywa/frontend',
  'sywa/sywa/backend',
  'sywa/sywa/sywatt',
  'sywa/sywa/sywack'
];

interface MRWithProject extends MR { projectPath: string }

const fetchOpenedMrsForProject = async (baseUrl: string, projectPath: string): Promise<MRWithProject[]> => {
  const encoded = encodeURIComponent(projectPath)
  const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests?state=opened&per_page=100`
  const res = await fetch(url)
  if (!res.ok) { throw new Error(`Failed ${projectPath}: ${res.status}`) }
  const data: MR[] = await res.json()
  return data.map(mr => ({ ...mr, projectPath }))
}

const useProjectMergeRequests = (baseUrl?: string) => {
  const [mrs, setMrs] = useState<MRWithProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!baseUrl) { setError('Missing baseUrl option'); setLoading(false); return }
    let cancelled = false
    setLoading(true)
    Promise.all(PROJECT_PATHS.map(p => fetchOpenedMrsForProject(baseUrl, p)))
      .then(results => { if (!cancelled) { setMrs(results.flat()); setError(null) } })
      .catch(e => { if (!cancelled) { setError(e.message) } })
      .finally(() => { if (!cancelled) { setLoading(false) } })
    return () => { cancelled = true }
  }, [baseUrl])

  return { mrs, loading, error }
}

const Table = ({ mrs }: { mrs: MRWithProject[] }) => (
  <table style="border-collapse:collapse;min-width:760px;width:100%;font-size:13px;line-height:18px">
    <thead>
    <tr>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Project</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Updated</th>
    </tr>
    </thead>
    <tbody>
    {mrs.map(mr => (
      <tr key={mr.id}>
        <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">
          <a href={mr.web_url} target="_blank" style="text-decoration:none;color:#1f78d1">{mr.title}</a>
          <div style="opacity:.6;font-size:11px">{mr.source_branch} → {mr.target_branch}</div>
        </td>
        <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">{mr.projectPath}</td>
        <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">{mr.author?.name}</td>
        <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">{new Date(mr.updated_at).toLocaleString()}</td>
      </tr>
    ))}
    </tbody>
  </table>
)

const OverviewPage = ({ options }: OverviewProps) => {
  const { mrs, loading, error } = useProjectMergeRequests(options.baseUrl)
  const [filter, setFilter] = useState('')
  const filtered = filter.trim() ? mrs.filter(mr => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs

  return (
    <div style="min-height:calc(100vh - 60px);padding:24px;color:var(--gl-text-color,#222);font-family:var(--gl-font-family,system-ui,sans-serif);max-width:1100px">
      <h1 style="margin-top:0;">Git Buster Overview</h1>
      <p style="max-width:780px">Open merge requests for configured projects fetched directly from GitLab API.</p>
      <div style="margin-top:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <input
          value={filter}
          onInput={e => setFilter((e.target as HTMLInputElement).value)}
          placeholder="Filter MRs by title..."
          style="flex:1;min-width:260px;padding:6px 10px;border:1px solid #bbb;border-radius:6px;font-size:13px"
        />
        <div style="font-size:12px;opacity:.7">{filtered.length}/{mrs.length} displayed</div>
      </div>
      <div style="margin-top:20px">
        {loading && <div style="opacity:.7">Loading merge requests…</div>}
        {error && !loading && <div style="color:#ec5941">Failed to load: {error}</div>}
        {!loading && !error && !mrs.length && <div style="opacity:.6">No opened merge requests found.</div>}
        {!!filtered.length && <Table mrs={filtered} />}
      </div>
      <div style="margin-top:32px;font-size:12px;opacity:.7">Base URL: {options.baseUrl}</div>
    </div>
  )
}

export const mountOverview = (container: HTMLElement, options: Options) => {
  render(<OverviewPage options={options} />, container)
}
