import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Options } from './types'
import { PersistentFilterBar } from './components/PersistentFilterBar'
import { NonPersistentAuthorFilter } from './components/NonPersistentAuthorFilter'
import { MergeRequestsTable } from './components/MergeRequestsTable'
import { useProjectMergeRequests } from './hooks/useProjectMergeRequests'
import { useReviewMeta } from './hooks/useReviewMeta'
import { isHotfixMr, isDraftMr } from './utils/mrUtils'
import { OVERVIEW_CSS } from './overviewStyles'

interface OverviewProps { options: Options }

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

const OverviewPage = ({ options }: OverviewProps) => {
  const { mrs, loading, error } = useProjectMergeRequests(options.baseUrl)
  const [filter, setFilter] = useState('')
  const [hideDrafts, setHideDrafts] = useState<boolean>(() => loadFilters().hideDrafts)
  const [onlyHotfixes, setOnlyHotfixes] = useState<boolean>(() => loadFilters().onlyHotfixes)
  const [authorFilter, setAuthorFilter] = useState<'all' | 'mine' | 'others'>(() => loadFilters().authorFilter)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [reviewMetaRefreshToken, setReviewMetaRefreshToken] = useState(0)
  useEffect(() => { saveFilters({ hideDrafts, onlyHotfixes, authorFilter }) }, [hideDrafts, onlyHotfixes, authorFilter])
  useEffect(() => { if (authorFilter === 'mine' && selectedAuthor) { setSelectedAuthor(null) } }, [authorFilter, selectedAuthor])

  const authors = Array.from(new Map(mrs.map(mr => [mr.author?.username || '', { username: mr.author?.username || '', name: mr.author?.name || '' }])).values())
    .filter(a => a.username)
    .sort((a, b) => a.username.localeCompare(b.username))

  const titleFiltered = filter.trim() ? mrs.filter(mr => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs
  const draftFiltered = hideDrafts ? titleFiltered.filter(mr => !isDraftMr(mr)) : titleFiltered
  const hotfixFiltered = onlyHotfixes ? draftFiltered.filter(isHotfixMr) : draftFiltered
  const fullyFiltered = selectedAuthor && authorFilter !== 'mine'
    ? hotfixFiltered.filter(mr => mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor)
    : hotfixFiltered
  const fullyFilteredAuthorScoped = authorFilter === 'mine'
    ? hotfixFiltered.filter(mr => mr.author?.username === options.username)
    : authorFilter === 'others'
      ? hotfixFiltered.filter(mr => mr.author?.username !== options.username)
      : fullyFiltered

  const totalHotfixes = mrs.filter(isHotfixMr).length
  const displayedHotfixes = fullyFilteredAuthorScoped.filter(isHotfixMr).length
  const { approvalsUsersByMr, reviewersUsersByMr, loading: reviewMetaLoading } = useReviewMeta(options.baseUrl, fullyFilteredAuthorScoped, reviewMetaRefreshToken)

  const handleRefreshReviewMeta = () => {
    setReviewMetaRefreshToken(t => t + 1)
  }

  return (
    <div className="gb-container">
      <h1>Git Buster Overview</h1>
      <PersistentFilterBar hideDrafts={hideDrafts} setHideDrafts={setHideDrafts} onlyHotfixes={onlyHotfixes} setOnlyHotfixes={setOnlyHotfixes} authorFilter={authorFilter} setAuthorFilter={setAuthorFilter} username={options.username} />
      <NonPersistentAuthorFilter authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} disabled={authorFilter === 'mine'} />
      <div className="gb-filter-row">
        <input
          value={filter}
          onInput={e => setFilter((e.target as HTMLInputElement).value)}
          placeholder="Filter MRs by title..."
          className="gb-input"
        />
        <div className="gb-small-text">{fullyFilteredAuthorScoped.length}/{mrs.length} displayed · Hotfixes: {displayedHotfixes}/{totalHotfixes}</div>
        <button type="button" onClick={handleRefreshReviewMeta} disabled={reviewMetaLoading || !fullyFilteredAuthorScoped.length} className="gb-btn" title="Force refetch approvals & reviewers for visible MRs">Refresh review meta</button>
      </div>
      <div className="gb-section">
        {loading && <div className="gb-sub">Loading merge requests…</div>}
        {error && !loading && <div className="gb-error">Failed to load: {error}</div>}
        {!loading && !error && !fullyFilteredAuthorScoped.length && <div className="gb-sub">No opened merge requests found.</div>}
        {!!fullyFilteredAuthorScoped.length && <MergeRequestsTable mrs={fullyFilteredAuthorScoped as any} filter={filter} setFilter={setFilter} approvalsUsersByMr={approvalsUsersByMr} reviewersUsersByMr={reviewersUsersByMr} />}
        {reviewMetaLoading && !!fullyFilteredAuthorScoped.length && <div className="gb-helper">Loading approvals & reviewers…</div>}
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
