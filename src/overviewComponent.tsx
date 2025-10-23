import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Options, ProjectGroup } from './types'
import { PersistentFilterBar } from './components/PersistentFilterBar'
import { NonPersistantFilter } from './components/NonPersistantFilter'
import { MergeRequestsTable } from './components/MergeRequestsTable'
import { useProjectMergeRequests } from './hooks/useProjectMergeRequests'
import { useReviewMeta } from './hooks/useReviewMeta'
import { isHotfixMr, isDraftMr } from './utils/mrUtils'
import { OVERVIEW_CSS } from './overviewStyles'
import { usePageTitle } from './hooks/usePageTitle'
import { NOT_ME } from './components/NonPersistentAuthorFilter'

interface OverviewProps { options: Options; initialVisible: boolean }

const LS_FILTER_KEY = 'gb_persistent_filters'
const LS_PROJECT_GROUP_KEY = 'gb_project_group'
interface PersistFilters { hideDrafts: boolean; onlyHotfixes: boolean; groupByTicket: boolean }
const loadFilters = (): PersistFilters => {
  try {
    const raw = localStorage.getItem(LS_FILTER_KEY)
    if (!raw) return { hideDrafts: false, onlyHotfixes: false, groupByTicket: false }
    const parsed = JSON.parse(raw)
    return { hideDrafts: !!parsed.hideDrafts, onlyHotfixes: !!parsed.onlyHotfixes, groupByTicket: !!parsed.groupByTicket }
  } catch { return { hideDrafts: false, onlyHotfixes: false, groupByTicket: false } }
}
const saveFilters = (f: PersistFilters) => { try { localStorage.setItem(LS_FILTER_KEY, JSON.stringify(f)) } catch {} }

const OverviewRoot = ({ options, initialVisible }: OverviewProps) => {
  if (!options.projects || !options.projects.length) { return null }
  const [visible, setVisible] = useState(initialVisible)
  // Expose setter globally for index.ts button
  ;(window as any).gitBusterSetVisible = (v: boolean) => setVisible(!!v)
  const groups: ProjectGroup[] = options.projects
  const initialGroup = (() => { try { const v = localStorage.getItem(LS_PROJECT_GROUP_KEY); return groups.find(g => g.name === v)?.name || groups[0].name } catch { return groups[0].name } })()
  const [projectGroup, setProjectGroup] = useState<string>(initialGroup)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  useEffect(() => { try { localStorage.setItem(LS_PROJECT_GROUP_KEY, projectGroup) } catch {} }, [projectGroup])
  useEffect(() => { setSelectedProject(null) }, [projectGroup])

  const { mrs, loading, error } = useProjectMergeRequests(options.baseUrl, groups, projectGroup)
  const [filter, setFilter] = useState('')
  const [hideDrafts, setHideDrafts] = useState<boolean>(() => loadFilters().hideDrafts)
  const [onlyHotfixes, setOnlyHotfixes] = useState<boolean>(() => loadFilters().onlyHotfixes)
  const [groupByTicket, setGroupByTicket] = useState<boolean>(() => loadFilters().groupByTicket)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [reviewMetaRefreshToken, setReviewMetaRefreshToken] = useState(0)
  useEffect(() => { saveFilters({ hideDrafts, onlyHotfixes, groupByTicket }) }, [hideDrafts, onlyHotfixes, groupByTicket])

  // Page title only while visible
  usePageTitle(visible ? 'Git Buster Overview' : document.title)

  // Hide/show main GitLab content
  useEffect(() => {
    const main = document.querySelector('#content-body') as HTMLElement || document.querySelector('main') as HTMLElement || document.querySelector('.content-wrapper') as HTMLElement
    if (main) { main.style.display = visible ? 'none' : '' }
  }, [visible])

  // Sync URL hash with visibility
  useEffect(() => {
    const anchor = 'git-buster'
    const currentHash = window.location.hash.replace('#','')
    if (visible && currentHash !== anchor) {
      history.replaceState(null, '', `${location.pathname}${location.search}#${anchor}`)
    } else if (!visible && currentHash === anchor) {
      history.replaceState(null, '', `${location.pathname}${location.search}`)
    }
    // Update button color if index keeps reference
    if ((window as any).gitBusterOnVisibleChange) { (window as any).gitBusterOnVisibleChange(visible) }
  }, [visible])

  // React to external hash changes (user edits URL)
  useEffect(() => {
    const handler = () => {
      const shouldBeVisible = window.location.hash.replace('#','') === 'git-buster'
      setVisible(v => v === shouldBeVisible ? v : shouldBeVisible)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const authors = Array.from(new Map(mrs.map(mr => [mr.author?.username || '', mr.author])).values()).filter((a): a is any => !!a?.username)
  const projectNames = Array.from(new Set(mrs.map(mr => mr.projectPath.split('/').slice(-1)[0]))).sort((a,b)=>a.localeCompare(b))

  const titleFiltered = filter.trim() ? mrs.filter(mr => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs
  const draftFiltered = hideDrafts ? titleFiltered.filter(mr => !isDraftMr(mr)) : titleFiltered
  const hotfixFiltered = onlyHotfixes ? draftFiltered.filter(isHotfixMr) : draftFiltered
  const projectFiltered = selectedProject ? hotfixFiltered.filter(mr => mr.projectPath.split('/').slice(-1)[0] === selectedProject) : hotfixFiltered
  const authorFiltered = selectedAuthor
    ? (selectedAuthor === NOT_ME && options.username
        ? projectFiltered.filter(mr => mr.author?.username !== options.username)
        : projectFiltered.filter(mr => mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor))
    : projectFiltered
  const totalHotfixes = mrs.filter(isHotfixMr).length
  const displayedHotfixes = authorFiltered.filter(isHotfixMr).length
  const { approvalsUsersByMr, reviewersUsersByMr, loading: reviewMetaLoading } = useReviewMeta(options.baseUrl, authorFiltered, reviewMetaRefreshToken)
  const handleRefreshReviewMeta = () => setReviewMetaRefreshToken(t => t + 1)

  if (!visible) { return null }

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
      <PersistentFilterBar hideDrafts={hideDrafts} setHideDrafts={setHideDrafts} onlyHotfixes={onlyHotfixes} setOnlyHotfixes={setOnlyHotfixes} groupByTicket={groupByTicket} setGroupByTicket={setGroupByTicket} />
      <NonPersistantFilter projects={projectNames} selectedProject={selectedProject} setSelectedProject={setSelectedProject} authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} username={options.username} disabled={false} />
      <div className="gb-filter-row">
        <input value={filter} onInput={e => setFilter((e.target as HTMLInputElement).value)} placeholder="Filter MRs by title..." className="gb-input" />
        <div className="gb-small-text">{authorFiltered.length}/{mrs.length} displayed · Hotfixes: {displayedHotfixes}/{totalHotfixes}</div>
        <button type="button" onClick={handleRefreshReviewMeta} disabled={reviewMetaLoading || !authorFiltered.length} className="gb-btn" title="Force refetch approvals & reviewers for visible MRs">Refresh review meta</button>
      </div>
      <div className="gb-section">
        {loading && <div className="gb-sub">Loading merge requests…</div>}
        {error && !loading && <div className="gb-error">Failed to load: {error}</div>}
        {!loading && !error && !authorFiltered.length && <div className="gb-sub">No opened merge requests found.</div>}
        {!!authorFiltered.length && <MergeRequestsTable mrs={authorFiltered as any} filter={filter} setFilter={setFilter} approvalsUsersByMr={approvalsUsersByMr} reviewersUsersByMr={reviewersUsersByMr} groupByTicket={groupByTicket} />}
        {reviewMetaLoading && !!authorFiltered.length && <div className="gb-helper">Loading approvals & reviewers…</div>}
      </div>
    </div>
  )
}

export const mountOverview = (container: HTMLElement, options: Options, initialVisible: boolean) => {
  if (!document.getElementById('gb-overview-styles')) {
    const style = document.createElement('style')
    style.id = 'gb-overview-styles'
    style.textContent = OVERVIEW_CSS
    document.head.appendChild(style)
  }
  render(<OverviewRoot options={options} initialVisible={initialVisible} />, container)
}

export const unmountOverview = (container: HTMLElement) => { render(null, container) }
