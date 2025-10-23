import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Options, PROJECTS, ProjectGroup } from './types'
import { PersistentFilterBar } from './components/PersistentFilterBar'
import { NonPersistantFilter } from './components/NonPersistantFilter'
import { MergeRequestsTable } from './components/MergeRequestsTable'
import { useProjectMergeRequests } from './hooks/useProjectMergeRequests'
import { useReviewMeta } from './hooks/useReviewMeta'
import { isHotfixMr, isDraftMr } from './utils/mrUtils'
import { OVERVIEW_CSS } from './overviewStyles'
import { usePageTitle } from './hooks/usePageTitle'
import { NOT_ME } from './components/NonPersistentAuthorFilter'

interface OverviewProps { options: Options }

const LS_FILTER_KEY = 'gb_persistent_filters'
const LS_PROJECT_GROUP_KEY = 'gb_project_group'
interface PersistFilters { hideDrafts: boolean; onlyHotfixes: boolean }
const loadFilters = (): PersistFilters => {
  try {
    const raw = localStorage.getItem(LS_FILTER_KEY)
    if (!raw) return { hideDrafts: false, onlyHotfixes: false }
    const parsed = JSON.parse(raw)
    return {
      hideDrafts: !!parsed.hideDrafts,
      onlyHotfixes: !!parsed.onlyHotfixes
    }
  } catch { return { hideDrafts: false, onlyHotfixes: false } }
}
const saveFilters = (f: PersistFilters) => { try { localStorage.setItem(LS_FILTER_KEY, JSON.stringify(f)) } catch {} }

const OverviewPage = ({ options }: OverviewProps) => {
  // Set page title while overview is displayed
  usePageTitle('Git Buster Overview')

  const groups: ProjectGroup[] = (options.projects && options.projects.length ? options.projects : PROJECTS)
  const initialGroup = (() => {
    try { const v = localStorage.getItem(LS_PROJECT_GROUP_KEY); return groups.find(g => g.name === v)?.name || groups[0].name } catch { return groups[0].name } })()
  const [projectGroup, setProjectGroup] = useState<string>(initialGroup)
  const [selectedProject, setSelectedProject] = useState<string | null>(null) // no initial selection
  useEffect(() => { try { localStorage.setItem(LS_PROJECT_GROUP_KEY, projectGroup) } catch {} }, [projectGroup])
  // On group change do not auto-select a project
  useEffect(() => { setSelectedProject(null) }, [projectGroup])

  const { mrs, loading, error } = useProjectMergeRequests(options.baseUrl, groups, projectGroup)
  const [filter, setFilter] = useState('')
  const [hideDrafts, setHideDrafts] = useState<boolean>(() => loadFilters().hideDrafts)
  const [onlyHotfixes, setOnlyHotfixes] = useState<boolean>(() => loadFilters().onlyHotfixes)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [reviewMetaRefreshToken, setReviewMetaRefreshToken] = useState(0)
  useEffect(() => { saveFilters({ hideDrafts, onlyHotfixes }) }, [hideDrafts, onlyHotfixes])

  const authors = Array.from(new Map(mrs.map(mr => [mr.author?.username || '', mr.author])).values()).filter((a): a is any => !!a?.username)
  const projectNames = Array.from(new Set(mrs.map(mr => mr.projectPath.split('/').slice(-1)[0]))).sort((a,b)=>a.localeCompare(b))

  // Filtering pipeline
  const titleFiltered = filter.trim() ? mrs.filter(mr => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs
  const draftFiltered = hideDrafts ? titleFiltered.filter(mr => !isDraftMr(mr)) : titleFiltered
  const hotfixFiltered = onlyHotfixes ? draftFiltered.filter(isHotfixMr) : draftFiltered
  const projectFiltered = selectedProject ? hotfixFiltered.filter(mr => mr.projectPath.split('/').slice(-1)[0] === selectedProject) : hotfixFiltered
  const authorFiltered = selectedAuthor
    ? (selectedAuthor === NOT_ME && options.username
        ? projectFiltered.filter(mr => mr.author?.username !== options.username)
        : projectFiltered.filter(mr => mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor))
    : projectFiltered

  const visibleMrs = authorFiltered
  const totalHotfixes = mrs.filter(isHotfixMr).length
  const displayedHotfixes = visibleMrs.filter(isHotfixMr).length
  const { approvalsUsersByMr, reviewersUsersByMr, loading: reviewMetaLoading } = useReviewMeta(options.baseUrl, visibleMrs, reviewMetaRefreshToken)

  const handleRefreshReviewMeta = () => { setReviewMetaRefreshToken(t => t + 1) }

  return (
    <div className="gb-container">
      <div className="gb-header-row">
        <h1>Git Buster Overview</h1>
        <label className="gb-group-select-label">
          <select className="gb-group-select" value={projectGroup} onChange={e => setProjectGroup((e.target as HTMLSelectElement).value)}>
            {groups.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
          </select>
        </label>
      </div>
      <PersistentFilterBar hideDrafts={hideDrafts} setHideDrafts={setHideDrafts} onlyHotfixes={onlyHotfixes} setOnlyHotfixes={setOnlyHotfixes} />
      <NonPersistantFilter projects={projectNames} selectedProject={selectedProject} setSelectedProject={setSelectedProject} authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} username={options.username} />
      <div className="gb-filter-row">
        <input value={filter} onInput={e => setFilter((e.target as HTMLInputElement).value)} placeholder="Filter MRs by title..." className="gb-input" />
        <div className="gb-small-text">{visibleMrs.length}/{mrs.length} displayed · Hotfixes: {displayedHotfixes}/{totalHotfixes}</div>
        <button type="button" onClick={handleRefreshReviewMeta} disabled={reviewMetaLoading || !visibleMrs.length} className="gb-btn" title="Force refetch approvals & reviewers for visible MRs">Refresh review meta</button>
      </div>
      <div className="gb-section">
        {loading && <div className="gb-sub">Loading merge requests…</div>}
        {error && !loading && <div className="gb-error">Failed to load: {error}</div>}
        {!loading && !error && !visibleMrs.length && <div className="gb-sub">No opened merge requests found.</div>}
        {!!visibleMrs.length && <MergeRequestsTable mrs={visibleMrs as any} filter={filter} setFilter={setFilter} approvalsUsersByMr={approvalsUsersByMr} reviewersUsersByMr={reviewersUsersByMr} />}
        {reviewMetaLoading && !!visibleMrs.length && <div className="gb-helper">Loading approvals & reviewers…</div>}
      </div>
    </div>
  )
}

export const mountOverview = (container: HTMLElement, options: Options) => {
  if (!document.getElementById('gb-overview-styles')) {
    const style = document.createElement('style')
    style.id = 'gb-overview-styles'
    style.textContent = OVERVIEW_CSS
    document.head.appendChild(style)
  }
  render(<OverviewPage options={options} />, container)
}

export const unmountOverview = (container: HTMLElement) => { render(null, container) }
