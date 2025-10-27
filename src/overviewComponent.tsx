import { h, Fragment } from 'preact'
import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Options, ProjectGroup, TeamRequirement } from './types'
import { PersistentFilterBar } from './components/PersistentFilterBar'
import { NonPersistentFilter } from './components/NonPersistentFilter'
import { MergeRequestsTable } from './components/MergeRequestsTable'
import { SkeletonLoader } from './components/SkeletonLoader'
import { useProjectMergeRequests } from './hooks/useProjectMergeRequests'
import { useReviewMeta } from './hooks/useReviewMeta'
import { isHotfixMr, isDraftMr } from './utils/mrUtils'
import { OVERVIEW_CSS } from './overviewStyles'
import { usePageTitle } from './hooks/usePageTitle'
import { NOT_ME } from './components/NonPersistentAuthorFilter'
import { NonPersistentTeamReqFilter } from './components/NonPersistentTeamReqFilter'

interface OverviewProps { options: Options; initialVisible: boolean }

const LS_FILTER_KEY = 'gb_persistent_filters'
const LS_PROJECT_GROUP_KEY = 'gb_project_group'
interface PersistFilters { hideDrafts: boolean; onlyHotfixes: boolean; groupByTicket: boolean; pipelineStatus: 'all'|'success'|'failed'; approvalReadyFilter: 'all'|'ready'|'not_ready'; reviewerReadyFilter: 'all'|'ready'|'not_ready' }
const loadFilters = (): PersistFilters => {
  try {
    const raw = localStorage.getItem(LS_FILTER_KEY)
    if (!raw) return { hideDrafts: false, onlyHotfixes: false, groupByTicket: false, pipelineStatus: 'all', approvalReadyFilter: 'all', reviewerReadyFilter: 'all' }
    const parsed = JSON.parse(raw)
    // Backward compatibility: older version stored booleans onlyApprovalReady/onlyReviewerReady
    const approvalReadyFilter: 'all'|'ready'|'not_ready' = (() => {
      if (parsed.approvalReadyFilter === 'ready' || parsed.approvalReadyFilter === 'not_ready') return parsed.approvalReadyFilter
      if (parsed.approvalReadyFilter === 'all') return 'all'
      if (typeof parsed.onlyApprovalReady === 'boolean') return parsed.onlyApprovalReady ? 'ready' : 'all'
      return 'all'
    })()
    const reviewerReadyFilter: 'all'|'ready'|'not_ready' = (() => {
      if (parsed.reviewerReadyFilter === 'ready' || parsed.reviewerReadyFilter === 'not_ready') return parsed.reviewerReadyFilter
      if (parsed.reviewerReadyFilter === 'all') return 'all'
      if (typeof parsed.onlyReviewerReady === 'boolean') return parsed.onlyReviewerReady ? 'ready' : 'all'
      return 'all'
    })()
    return {
      hideDrafts: !!parsed.hideDrafts,
      onlyHotfixes: !!parsed.onlyHotfixes,
      groupByTicket: !!parsed.groupByTicket,
      pipelineStatus: parsed.pipelineStatus === 'success' || parsed.pipelineStatus === 'failed' ? parsed.pipelineStatus : 'all',
      approvalReadyFilter,
      reviewerReadyFilter
    }
  } catch {
    return { hideDrafts: false, onlyHotfixes: false, groupByTicket: false, pipelineStatus: 'all', approvalReadyFilter: 'all', reviewerReadyFilter: 'all' }
  }
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
  const [pipelineStatus, setPipelineStatus] = useState<'all'|'success'|'failed'>(() => loadFilters().pipelineStatus)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [selectedReviewer, setSelectedReviewer] = useState<string | null>(null)
  const [invertReviewer, setInvertReviewer] = useState<boolean>(false)
  const [selectedApprover, setSelectedApprover] = useState<string | null>(null)
  const [invertApprover, setInvertApprover] = useState<boolean>(false)
  const [reviewMetaRefreshToken, setReviewMetaRefreshToken] = useState(0)
  const [sortDirection, setSortDirection] = useState<'asc'|'desc'>('desc') // updated column sort
  const [invertAuthor, setInvertAuthor] = useState<boolean>(false)
  const [approvalReadyFilter, setApprovalReadyFilter] = useState<'all'|'ready'|'not_ready'>(() => loadFilters().approvalReadyFilter)
  const [reviewerReadyFilter, setReviewerReadyFilter] = useState<'all'|'ready'|'not_ready'>(() => loadFilters().reviewerReadyFilter)
  const [selectedApprovalTeam, setSelectedApprovalTeam] = useState<string | null>(null)
  const [approvalTeamMode, setApprovalTeamMode] = useState<'all'|'missing'|'ready'>('all')
  const [selectedReviewerTeam, setSelectedReviewerTeam] = useState<string | null>(null)
  const [reviewerTeamMode, setReviewerTeamMode] = useState<'all'|'missing'|'ready'>('all')
  const [approvalsMissingMode, setApprovalsMissingMode] = useState<'all'|'missing'|'none_missing'>('all')
  const [reviewersMissingMode, setReviewersMissingMode] = useState<'all'|'missing'|'none_missing'>('all')
  useEffect(() => { saveFilters({ hideDrafts, onlyHotfixes, groupByTicket, pipelineStatus, approvalReadyFilter, reviewerReadyFilter }) }, [hideDrafts, onlyHotfixes, groupByTicket, pipelineStatus, approvalReadyFilter, reviewerReadyFilter])

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
  const pipelineFiltered = pipelineStatus === 'all' ? hotfixFiltered : hotfixFiltered.filter(mr => mr.head_pipeline && mr.head_pipeline.status === pipelineStatus)
  const projectFiltered = selectedProject ? pipelineFiltered.filter(mr => mr.projectPath.split('/').slice(-1)[0] === selectedProject) : pipelineFiltered
  // Fetch review meta (approvals/reviewers) for projectFiltered set (before reviewer/approver filters)
  const { approvalsUsersByMr, reviewersUsersByMr, loading: reviewMetaLoading } = useReviewMeta(options.baseUrl, projectFiltered, reviewMetaRefreshToken)
  // Apply reviewer filter
  const reviewerFiltered = selectedReviewer ? projectFiltered.filter(mr => {
    const reviewers = reviewersUsersByMr[mr.id] || []
    const has = reviewers.some(u => u.username === selectedReviewer)
    return invertReviewer ? !has : has
  }) : projectFiltered
  // Apply approver filter
  const approverFiltered = selectedApprover ? reviewerFiltered.filter(mr => {
    const approvers = approvalsUsersByMr[mr.id] || []
    const has = approvers.some(u => u.username === selectedApprover)
    return invertApprover ? !has : has
  }) : reviewerFiltered
  // After we have approval/reviewer maps compute team requirement statuses
  const teamReqs: TeamRequirement[] = (options.teamRequirements || []).map(t => ({ ...t, members: t.members.map(m => m.trim().toLowerCase()).filter(Boolean) }))
  const approvalsStatusByMr: Record<number, { ready: boolean; details: string; teamCounts: Array<{ team: string; have: number; need: number }> }> = {}
  const reviewersStatusByMr: Record<number, { ready: boolean; details: string; teamCounts: Array<{ team: string; have: number; need: number }> }> = {}
  for (const mr of projectFiltered) {
    const approvalsUsers = approvalsUsersByMr[mr.id] || []
    const reviewersUsers = reviewersUsersByMr[mr.id] || []
    const approvalsUsernames = approvalsUsers.map(u => u.username.toLowerCase())
    const reviewersUsernames = reviewersUsers.map(u => u.username.toLowerCase())
    let approvalsReadyAll = true
    let reviewersReadyAll = true
    const approvalsParts: string[] = []
    const reviewersParts: string[] = []
    const approvalsCounts: Array<{ team: string; have: number; need: number }> = []
    const reviewersCounts: Array<{ team: string; have: number; need: number }> = []
    for (const team of teamReqs) {
      const aCount = team.members.reduce((acc,m) => acc + (approvalsUsernames.includes(m) ? 1 : 0), 0)
      const aReq = team.approvalsRequired
      approvalsCounts.push({ team: team.name, have: aCount, need: aReq })
      approvalsParts.push(`${team.name}: ${aCount}/${aReq}`)
      if (aCount < aReq) approvalsReadyAll = false
      const rReq = team.reviewersRequired ?? 0
      if (rReq > 0) {
        const rCount = team.members.reduce((acc,m) => acc + (reviewersUsernames.includes(m) ? 1 : 0), 0)
        reviewersCounts.push({ team: team.name, have: rCount, need: rReq })
        reviewersParts.push(`${team.name}: ${rCount}/${rReq}`)
        if (rCount < rReq) reviewersReadyAll = false
      }
    }
    approvalsStatusByMr[mr.id] = { ready: approvalsReadyAll, details: approvalsParts.join(' | ') || 'No team requirements', teamCounts: approvalsCounts }
    reviewersStatusByMr[mr.id] = { ready: reviewersReadyAll, details: reviewersParts.join(' | ') || 'No reviewer requirements', teamCounts: reviewersCounts }
  }
  const applyReadyFilter = (list: typeof approverFiltered, statusMap: Record<number,{ready:boolean}>, mode: 'all'|'ready'|'not_ready') => {
    if (mode === 'ready') return list.filter(mr => statusMap[mr.id]?.ready)
    if (mode === 'not_ready') return list.filter(mr => statusMap[mr.id] && !statusMap[mr.id].ready)
    return list
  }
  const applyTeamReqFilters = (list: typeof approverFiltered) => {
    let out = list
    // Global missing presence filters (approvals)
    if (approvalsMissingMode !== 'all') {
      out = out.filter(mr => {
        const counts = approvalsStatusByMr[mr.id]?.teamCounts || []
        const hasMissing = counts.some(c => c.have < c.need)
        return approvalsMissingMode === 'missing' ? hasMissing : !hasMissing
      })
    }
    // Global missing presence filters (reviewers)
    if (reviewersMissingMode !== 'all') {
      out = out.filter(mr => {
        const counts = reviewersStatusByMr[mr.id]?.teamCounts || []
        const hasMissing = counts.some(c => c.have < c.need)
        return reviewersMissingMode === 'missing' ? hasMissing : !hasMissing
      })
    }
    if (selectedApprovalTeam) {
      out = out.filter(mr => {
        const counts = approvalsStatusByMr[mr.id]?.teamCounts || []
        const entry = counts.find(c => c.team === selectedApprovalTeam)
        if (!entry) return false
        const missing = entry.have < entry.need
        if (approvalTeamMode === 'missing') return missing
        if (approvalTeamMode === 'ready') return !missing
        return true
      })
    }
    if (selectedReviewerTeam) {
      out = out.filter(mr => {
        const counts = reviewersStatusByMr[mr.id]?.teamCounts || []
        const entry = counts.find(c => c.team === selectedReviewerTeam)
        if (!entry) return false
        const missing = entry.have < entry.need
        if (reviewerTeamMode === 'missing') return missing
        if (reviewerTeamMode === 'ready') return !missing
        return true
      })
    }
    return out
  }
  const teamFiltered = applyTeamReqFilters(approverFiltered)
  const approvalFiltered = applyReadyFilter(teamFiltered, approvalsStatusByMr, approvalReadyFilter)
  const reviewerReadyFiltered = applyReadyFilter(approvalFiltered, reviewersStatusByMr, reviewerReadyFilter)
  // Apply author filter last (replace previous authorFiltered definition)
  const authorFiltered = selectedAuthor
    ? (selectedAuthor === NOT_ME && options.username
        ? reviewerReadyFiltered.filter(mr => invertAuthor ? mr.author?.username === options.username : mr.author?.username !== options.username)
        : reviewerReadyFiltered.filter(mr => invertAuthor ? (mr.author?.username !== selectedAuthor && mr.author?.name !== selectedAuthor) : (mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor)))
    : reviewerReadyFiltered
  const totalHotfixes = mrs.filter(isHotfixMr).length
  const displayedHotfixes = authorFiltered.filter(isHotfixMr).length
  const handleRefreshReviewMeta = () => setReviewMetaRefreshToken(t => t + 1)

  if (!visible) { return null }

  const reviewerUsers = Array.from(new Map(projectFiltered.flatMap(mr => (reviewersUsersByMr[mr.id]||[]).map(u => [u.username, u]))).values()).filter(u => !!u?.username)
  const approverUsers = Array.from(new Map(projectFiltered.flatMap(mr => (approvalsUsersByMr[mr.id]||[]).map(u => [u.username, u]))).values()).filter(u => !!u?.username)

  return (
    <div className="gb-container">
      <div className="gb-header-row">
        <h1>Git Buster Overview</h1>
        <div className="gb-header-right">
          {(loading || (reviewMetaLoading && !!authorFiltered.length) || error) && (
            <div className="gb-header-status">
              {loading && (
                <>
                  <div className="gb-header-spinner">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" fill="none"/>
                      <path d="M 8 2 A 6 6 0 0 1 14 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="1s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                  </div>
                  <span className="gb-header-status-text">Loading merge requests…</span>
                </>
              )}
              {!loading && reviewMetaLoading && !!authorFiltered.length && (
                <>
                  <div className="gb-header-spinner">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-opacity="0.3" fill="none"/>
                      <path d="M 8 2 A 6 6 0 0 1 14 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="1s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                  </div>
                  <span className="gb-header-status-text">Loading approvals & reviewers…</span>
                </>
              )}
              {!loading && error && (
                <>
                  <div className="gb-header-error-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="7" fill="currentColor"/>
                      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <span className="gb-header-status-text gb-header-error-text">Error loading data</span>
                </>
              )}
            </div>
          )}
          <label className="gb-group-select-label">
            <select className="gb-group-select" value={projectGroup} onChange={e => setProjectGroup((e.target as HTMLSelectElement).value)}>
              {groups.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
            </select>
          </label>
        </div>
      </div>
      <PersistentFilterBar hideDrafts={hideDrafts} setHideDrafts={setHideDrafts} onlyHotfixes={onlyHotfixes} setOnlyHotfixes={setOnlyHotfixes} groupByTicket={groupByTicket} setGroupByTicket={setGroupByTicket} pipelineStatus={pipelineStatus} setPipelineStatus={setPipelineStatus} approvalReadyFilter={approvalReadyFilter} setApprovalReadyFilter={setApprovalReadyFilter} reviewerReadyFilter={reviewerReadyFilter} setReviewerReadyFilter={setReviewerReadyFilter} />
      <NonPersistentFilter projects={projectNames} selectedProject={selectedProject} setSelectedProject={setSelectedProject} authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} reviewerUsers={reviewerUsers} selectedReviewer={selectedReviewer} setSelectedReviewer={setSelectedReviewer} invertReviewer={invertReviewer} setInvertReviewer={setInvertReviewer} approverUsers={approverUsers} selectedApprover={selectedApprover} setSelectedApprover={setSelectedApprover} invertApprover={invertApprover} setInvertApprover={setInvertApprover} username={options.username} disabled={false} reviewMetaLoading={reviewMetaLoading} invertAuthor={invertAuthor} setInvertAuthor={setInvertAuthor} />
      {!!teamReqs.length && <div className="gb-filter-bar" style={{ marginTop:'8px' }}>
        <NonPersistentTeamReqFilter teams={teamReqs.map(t=>t.name)} selectedApprovalTeam={selectedApprovalTeam} setSelectedApprovalTeam={setSelectedApprovalTeam} approvalTeamMode={approvalTeamMode} setApprovalTeamMode={setApprovalTeamMode} selectedReviewerTeam={selectedReviewerTeam} setSelectedReviewerTeam={setSelectedReviewerTeam} reviewerTeamMode={reviewerTeamMode} setReviewerTeamMode={setReviewerTeamMode} approvalsMissingMode={approvalsMissingMode} setApprovalsMissingMode={setApprovalsMissingMode} reviewersMissingMode={reviewersMissingMode} setReviewersMissingMode={setReviewersMissingMode} disabled={reviewMetaLoading} />
      </div>}
      <div className="gb-filter-row">
        <input value={filter} onInput={e => setFilter((e.target as HTMLInputElement).value)} placeholder="Filter MRs by title..." className="gb-input" />
        <div className="gb-small-text">{authorFiltered.length}/{mrs.length} displayed · Hotfixes: {displayedHotfixes}/{totalHotfixes}</div>
        <button type="button" onClick={handleRefreshReviewMeta} disabled={reviewMetaLoading || !authorFiltered.length} className="gb-btn" title="Force refetch approvals & reviewers for visible MRs">Refresh review meta</button>
      </div>
      <div className="gb-section">
        {loading && <SkeletonLoader />}
        {error && !loading && <div className="gb-error">Failed to load: {error}</div>}
        {!loading && !error && !authorFiltered.length && <div className="gb-sub">No open merge requests found.</div>}
        {!!authorFiltered.length && <MergeRequestsTable mrs={authorFiltered as any} filter={filter} setFilter={setFilter} approvalsUsersByMr={approvalsUsersByMr} reviewersUsersByMr={reviewersUsersByMr} approvalsStatusByMr={approvalsStatusByMr} reviewersStatusByMr={reviewersStatusByMr} groupByTicket={groupByTicket} sortDirection={sortDirection} setSortDirection={setSortDirection} />}
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
