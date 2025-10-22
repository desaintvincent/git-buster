import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Options, MR } from './types'
// Add Approval import
import type { Approval } from './types'
import type { User } from './types'

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

const isDraftMr = (mr: MR): boolean => {
  const title = mr.title.toLowerCase()
  return mr.draft || mr.work_in_progress || title.startsWith('draft:') || title.startsWith('wip:')
}
// New helper: hotfix if targeting main/master or has 🚑 in title
const isHotfixMr = (mr: MR): boolean => {
  const target = mr.target_branch.toLowerCase()
  return target === 'main' || target === 'master' || mr.title.includes('🚑')
}
// Persistent filters localStorage helpers
const LS_FILTER_KEY = 'gb_persistent_filters'
interface PersistFilters { hideDrafts: boolean; onlyHotfixes: boolean; authorFilter: 'all' | 'mine' | 'others' }
const loadFilters = (): PersistFilters => {
  try {
    const raw = localStorage.getItem(LS_FILTER_KEY)
    if (!raw) return { hideDrafts: false, onlyHotfixes: false, authorFilter: 'all' }
    const parsed = JSON.parse(raw)
    return {
      hideDrafts: !!parsed.hideDrafts,
      onlyHotfixes: !!parsed.onlyHotfixes,
      authorFilter: ['all','mine','others'].includes(parsed.authorFilter) ? parsed.authorFilter : 'all'
    }
  } catch { return { hideDrafts: false, onlyHotfixes: false, authorFilter: 'all' } }
}
const saveFilters = (f: PersistFilters) => { try { localStorage.setItem(LS_FILTER_KEY, JSON.stringify(f)) } catch {} }

const PersistantFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, authorFilter, setAuthorFilter, username }: { hideDrafts: boolean; setHideDrafts: (v: boolean) => void; onlyHotfixes: boolean; setOnlyHotfixes: (v: boolean) => void; authorFilter: 'all' | 'mine' | 'others'; setAuthorFilter: (v: 'all' | 'mine' | 'others') => void; username?: string }) => (
  <div style="margin-top:10px;padding:8px 12px;border:1px solid #ccc;border-radius:6px;display:flex;gap:18px;align-items:center;font-size:12px;flex-wrap:wrap">
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer" title="Draft: GitLab draft/WIP flag or title starts with draft:/wip:">
      <input type="checkbox" checked={hideDrafts} onChange={e => setHideDrafts((e.target as HTMLInputElement).checked)} />
      <span>Hide draft MRs</span>
    </label>
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer" title="Hotfix: targets main or master branch OR title contains 🚑">
      <input type="checkbox" checked={onlyHotfixes} onChange={e => setOnlyHotfixes((e.target as HTMLInputElement).checked)} />
      <span>Only hotfix MRs</span>
    </label>
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer" title="Filter by author relative to configured username">
      <span>Author:</span>
      <select value={authorFilter} onChange={e => setAuthorFilter((e.target as HTMLSelectElement).value as 'all' | 'mine' | 'others')} style="padding:4px 6px;border:1px solid #bbb;border-radius:4px;font-size:12px">
        <option value="all">All</option>
        <option value="mine" disabled={!username}>Mine</option>
        <option value="others" disabled={!username}>Others</option>
      </select>
    </label>
  </div>
)

const extractJiraTicket = (title: string): string | null => {
  const match = title.toUpperCase().match(/([A-Z][A-Z0-9]+-\d+)/)
  return match ? match[1] : null
}

const formatUpdatedAt = (iso: string): string => {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// New fetch function for approvals count AND reviewers (comments)
const fetchReviewMeta = async (baseUrl: string, mr: MR): Promise<{ approvals: number; reviewers: string[] }> => {
  // approvals
  const approvalsUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`
  let approvals: number = 0
  let approvedUsers: User[] = []
  try {
    const res = await fetch(approvalsUrl)
    if (res.ok) {
      const data: Approval = await res.json()
      approvals = Array.isArray(data.approved_by) ? data.approved_by.length : 0
      approvedUsers = Array.isArray(data.approved_by) ? data.approved_by.map(a => a.user) : []
    }
  } catch { /* ignore */ }
  // notes (comments)
  const notesUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/notes?per_page=100`
  let commentUsers: User[] = []
  try {
    const res = await fetch(notesUrl)
    if (res.ok) {
      const notes = await res.json()
      // Each note has author and possibly system flag
      commentUsers = notes
        .filter((n: any) => !n.system && n.author?.username)
        .map((n: any) => n.author as User)
    }
  } catch { /* ignore */ }
  const authorUsername = mr.author?.username
  const reviewerMap: Record<string, User> = {}
  for (const u of approvedUsers.concat(commentUsers)) {
    if (!u?.username) continue
    if (u.username === authorUsername) continue // exclude author
    reviewerMap[u.username] = u
  }
  const reviewers = Object.values(reviewerMap).map(u => u.name || u.username)
  return { approvals, reviewers }
}

const useReviewMeta = (baseUrl: string | undefined, mrs: MR[]) => {
  const [approvalsByMr, setApprovalsByMr] = useState<Record<number, number>>({})
  const [reviewersByMr, setReviewersByMr] = useState<Record<number, string[]>>({})
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    let cancelled = false
    if (!baseUrl || !mrs.length) { setApprovalsByMr({}); setReviewersByMr({}); setLoading(false); return }
    setLoading(true)
    Promise.all(mrs.map(mr => fetchReviewMeta(baseUrl, mr).then(meta => ({ id: mr.id, meta })) ))
      .then(results => {
        if (cancelled) return
        const approvals: Record<number, number> = {}
        const reviewers: Record<number, string[]> = {}
        results.forEach(r => { approvals[r.id] = r.meta.approvals; reviewers[r.id] = r.meta.reviewers })
        setApprovalsByMr(approvals)
        setReviewersByMr(reviewers)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [baseUrl, mrs])
  return { approvalsByMr, reviewersByMr, loading }
}

const Table = ({ mrs, filter, setFilter, approvalsByMr, reviewersByMr }: { mrs: MRWithProject[]; filter: string; setFilter: (v: string) => void; approvalsByMr: Record<number, number>; reviewersByMr: Record<number, string[]> }) => (
  <table style="border-collapse:collapse;min-width:760px;width:100%;font-size:13px;line-height:18px">
    <thead>
    <tr>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Project</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444;width:1%;white-space:nowrap">Approvals</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444;width:1%;white-space:nowrap">Reviewers</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444;width:1%;white-space:nowrap">Updated</th>
    </tr>
    </thead>
    <tbody>
    {mrs.map(mr => {
      const ticket = extractJiraTicket(mr.title)
      const disabled = !ticket
      const addTicket = () => {
        if (!ticket) return
        const parts = filter.trim().split(/\s+/).filter(Boolean)
        if (parts.includes(ticket)) { return }
        const newFilter = filter.trim().length ? `${filter.trim()} ${ticket}` : ticket
        setFilter(newFilter)
      }
      const approvalsCount = approvalsByMr[mr.id]
      const reviewerNames = reviewersByMr[mr.id] || []
      const reviewersDisplay = reviewerNames.length ? reviewerNames.length : '–'
      const reviewersTooltip = reviewerNames.length ? reviewerNames.join(', ') : 'No reviewers (approval or comment)'
      return (
        <tr key={mr.id}>
          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">
            <div style="display:flex;align-items:flex-start;gap:6px">
                <button
                    type="button"
                    onClick={addTicket}
                    disabled={disabled}
                    title={disabled ? 'No JIRA-like ticket (ABC-123) found in title' : `Add ${ticket} to title filter`}
                    style="border:1px solid #bbb;background:${disabled ? '#f5f5f5' : '#fff'};color:${disabled ? '#999' : '#222'};padding:2px 5px;border-radius:4px;font-size:11px;cursor:${disabled ? 'not-allowed' : 'pointer'};line-height:1;display:inline-flex;align-items:center;gap:2px"
                >🔍</button>
              <a href={mr.web_url} target="_blank" style="text-decoration:none;color:#1f78d1;flex:1">{mr.title}</a>
            </div>
            <div style="opacity:.6;font-size:11px">{mr.source_branch} → {mr.target_branch}</div>
          </td>
          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">{mr.projectPath}</td>
          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">{mr.author?.name}</td>
          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;width:1%;white-space:nowrap;font-size:11px" title="Number of approvals">{approvalsCount ?? '–'}</td>
          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;width:1%;white-space:nowrap;font-size:11px" title={reviewersTooltip}>{reviewersDisplay}</td>
          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;width:1%;white-space:nowrap;font-size:11px">{formatUpdatedAt(mr.updated_at)}</td>
        </tr>
      )
    })}
    </tbody>
  </table>
)

const OverviewPage = ({ options }: OverviewProps) => {
  const { mrs, loading, error } = useProjectMergeRequests(options.baseUrl)
  const [filter, setFilter] = useState('')
  const [hideDrafts, setHideDrafts] = useState<boolean>(() => loadFilters().hideDrafts)
  const [onlyHotfixes, setOnlyHotfixes] = useState<boolean>(() => loadFilters().onlyHotfixes)
  const [authorFilter, setAuthorFilter] = useState<'all' | 'mine' | 'others'>(() => loadFilters().authorFilter)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null) // non-persistent author filter
  useEffect(() => { saveFilters({ hideDrafts, onlyHotfixes, authorFilter }) }, [hideDrafts, onlyHotfixes, authorFilter])
  // Clear ephemeral author filter if switching to 'mine'
  useEffect(() => { if (authorFilter === 'mine' && selectedAuthor) { setSelectedAuthor(null) } }, [authorFilter, selectedAuthor])
  const authors = Array.from(new Map(mrs.map(mr => [mr.author?.username || '', { username: mr.author?.username || '', name: mr.author?.name || '' }])).values())
    .filter(a => a.username) // remove empty
    .sort((a, b) => a.username.localeCompare(b.username))
  const titleFiltered = filter.trim() ? mrs.filter(mr => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs
  const draftFiltered = hideDrafts ? titleFiltered.filter(mr => !isDraftMr(mr)) : titleFiltered
  const fullyFilteredBase = onlyHotfixes ? draftFiltered.filter(isHotfixMr) : draftFiltered
  const fullyFilteredAfterPersistent = authorFilter === 'mine'
    ? fullyFilteredBase.filter(mr => mr.author?.username === options.username)
    : authorFilter === 'others'
      ? fullyFilteredBase.filter(mr => mr.author?.username !== options.username)
      : fullyFilteredBase
  const fullyFiltered = selectedAuthor && authorFilter !== 'mine'
    ? fullyFilteredAfterPersistent.filter(mr => mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor)
    : fullyFilteredAfterPersistent
  const totalHotfixes = mrs.filter(isHotfixMr).length
  const displayedHotfixes = fullyFiltered.filter(isHotfixMr).length
  const { approvalsByMr, reviewersByMr, loading: reviewMetaLoading } = useReviewMeta(options.baseUrl, fullyFiltered)

  return (
    <div style="min-height:calc(100vh - 60px);padding:24px;color:var(--gl-text-color,#222);font-family:var(--gl-font-family,system-ui,sans-serif);max-width:1100px">
      <h1 style="margin-top:0;">Git Buster Overview</h1>
      <PersistantFilterBar hideDrafts={hideDrafts} setHideDrafts={setHideDrafts} onlyHotfixes={onlyHotfixes} setOnlyHotfixes={setOnlyHotfixes} authorFilter={authorFilter} setAuthorFilter={setAuthorFilter} username={options.username} />
      <NonPersistentAuthorFilter
        authors={authors}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
        disabled={authorFilter === 'mine'}
      />
        <div style="margin-top:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
            <input
                value={filter}
                onInput={e => setFilter((e.target as HTMLInputElement).value)}
                placeholder="Filter MRs by title..."
                style="flex:1;min-width:260px;padding:6px 10px;border:1px solid #bbb;border-radius:6px;font-size:13px"
            />
            <div style="font-size:12px;opacity:.7">{fullyFiltered.length}/{mrs.length} displayed · Hotfixes: {displayedHotfixes}/{totalHotfixes}</div>
        </div>
      <div style="margin-top:20px">
        {loading && <div style="opacity:.7">Loading merge requests…</div>}
        {error && !loading && <div style="color:#ec5941">Failed to load: {error}</div>}
        {!loading && !error && !fullyFiltered.length && <div style="opacity:.6">No opened merge requests found.</div>}
        {!!fullyFiltered.length && <Table mrs={fullyFiltered} filter={filter} setFilter={setFilter} approvalsByMr={approvalsByMr} reviewersByMr={reviewersByMr} />}
        {reviewMetaLoading && !!fullyFiltered.length && <div style="margin-top:6px;font-size:11px;opacity:.6">Loading approvals & reviewers…</div>}
      </div>
    </div>
  )
}

// Ephemeral author filter component
const NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled }: { authors: Array<{ username: string; name: string }>; selectedAuthor: string | null; setSelectedAuthor: (v: string | null) => void; disabled: boolean }) => {
  return (
    <div style="margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:12px">
      <div style="display:flex;flex-direction:column;gap:4px;min-width:240px">
        <label style="font-weight:600">Ephemeral author filter</label>
        <div style="display:flex;gap:6px;align-items:center">
          <input
            list="gb-authors-list"
            disabled={disabled}
            value={selectedAuthor ?? ''}
            onInput={e => {
              const v = (e.target as HTMLInputElement).value.trim()
              setSelectedAuthor(v ? v : null)
            }}
            placeholder={disabled ? 'Disabled (Mine)' : 'Type to filter by author...'}
            style="flex:1;padding:6px 8px;border:1px solid #bbb;border-radius:6px;font-size:12px"
          />
          <button
            type="button"
            disabled={disabled || !selectedAuthor}
            onClick={() => setSelectedAuthor(null)}
            style="padding:6px 10px;border:1px solid #bbb;border-radius:6px;cursor:pointer;font-size:12px"
            title="Clear author filter"
          >Clear</button>
        </div>
        <datalist id="gb-authors-list">
          {authors.map(a => (
            <option value={a.username} label={a.name} />
          ))}
        </datalist>
        <div style="opacity:.6;font-size:11px">Not persisted. Filters after persistent author scope. Matches username or full name.</div>
      </div>
    </div>
  )
}

export const mountOverview = (container: HTMLElement, options: Options) => {
  render(<OverviewPage options={options} />, container)
}
