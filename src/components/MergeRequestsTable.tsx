import { h, Fragment } from 'preact'
import type { MR } from '../types'
import type { User } from '../types'
import { UserAvatar } from '../UserAvatar'
import { extractJiraTicket, isDraftMr } from '../utils/mrUtils'
import { UpdatedDate } from './UpdatedDate'

const PipelineSuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

const PipelineFailedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
)

const PipelineRunningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <circle cx="8" cy="8" r="3" fill="currentColor"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill="currentColor"/>
    <path d="M11.5 5.5L7 10.5L4.5 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

const CrossCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill="currentColor"/>
    <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>
)

export interface MRWithProject extends MR { projectPath: string }
interface Props { mrs: MRWithProject[]; filter: string; setFilter: (v:string)=>void; approvalsUsersByMr: Record<number, User[]>; reviewersUsersByMr: Record<number, User[]>; approvalsStatusByMr: Record<number,{ready:boolean;details:string;teamCounts:Array<{team:string;have:number;need:number}>}>; reviewersStatusByMr: Record<number,{ready:boolean;details:string;teamCounts:Array<{team:string;have:number;need:number}>}>; groupByTicket: boolean; sortDirection: 'asc'|'desc'; setSortDirection: (d:'asc'|'desc')=>void }

const pipelineCell = (mr: MRWithProject) => {
  const status = mr.head_pipeline?.status
  if (!status) return '–'
  if (status === 'success') return <span className="gb-pipeline-status success" title="Pipeline succeeded"><PipelineSuccessIcon /></span>
  if (status === 'failed') return <span className="gb-pipeline-status failed" title="Pipeline failed"><PipelineFailedIcon /></span>
  return <span className="gb-pipeline-status other" title={`Pipeline status: ${status}`}><PipelineRunningIcon /></span>
}

const reviewersCell = (reviewers: User[], status: {ready:boolean;details:string;teamCounts:Array<{team:string;have:number;need:number}>}|undefined) => {
  const missingEntries = status?.teamCounts.filter(c => c.need>0 && c.have < c.need) || []
  const tooltip = missingEntries.length ? `Missing reviewers: ${missingEntries.map(c=>`${c.team} ${c.have}/${c.need}`).join(', ')}` : status ? `Reviewer requirements: ${status.details}` : 'No reviewer data'
  return (
    <div className="gb-right">
      <span className="gb-inline-cell right">
        {reviewers.length ? <span title={`Reviewers (${reviewers.length})`} className="gb-avatar-stack">{reviewers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '\u2013'}
        {status && <span className={`gb-req-status ${status.ready ? 'ready':'not-ready'}`} title={status.ready ? `All reviewer team requirements met` : `Some reviewer team requirements missing`}>{status.ready ? <CheckCircleIcon />:<CrossCircleIcon />}</span>}
        {!!missingEntries.length && <span className="gb-miss-agg" title={tooltip}>!{missingEntries.length}</span>}
      </span>
    </div>
  )
}

const approversCell = (approvers: User[], status: {ready:boolean;details:string;teamCounts:Array<{team:string;have:number;need:number}>}|undefined) => {
  const missingEntries = status?.teamCounts.filter(c => c.need>0 && c.have < c.need) || []
  const tooltip = missingEntries.length ? `Missing approvals: ${missingEntries.map(c=>`${c.team} ${c.have}/${c.need}`).join(', ')}` : status ? `Approver requirements: ${status.details}` : 'No approval data'
  return (
    <div className="gb-right">
      <span className="gb-inline-cell right">
        {approvers.length ? <span title={`Approvers (${approvers.length})`} className="gb-avatar-stack">{approvers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '\u2013'}
        {status && <span className={`gb-req-status ${status.ready ? 'ready':'not-ready'}`} title={status.ready ? `All approval team requirements met` : `Some approval team requirements missing`}>{status.ready ? <CheckCircleIcon />:<CrossCircleIcon />}</span>}
        {!!missingEntries.length && <span className="gb-miss-agg" title={tooltip}>!{missingEntries.length}</span>}
      </span>
    </div>
  )
}

export const MergeRequestsTable = ({ mrs, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr, approvalsStatusByMr, reviewersStatusByMr, groupByTicket, sortDirection, setSortDirection }: Props) => {
  const sortedMrs = [...mrs].sort((a,b) => {
    const da = new Date(a.updated_at).getTime();
    const db = new Date(b.updated_at).getTime();
    return sortDirection === 'asc' ? da - db : db - da
  })

  const toggleSort = () => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  const updatedHeader = (
    <button type="button" className="gb-sortable" onClick={toggleSort} title="Sort by updated date">
      Updated <span className="gb-sort-indicator">{sortDirection === 'asc' ? '\u25b2' : '\u25bc'}</span>
    </button>
  )

  if (!groupByTicket) {
    return (
      <table className="gb-table">
        <thead>
          <tr>
            <th className="gb-th">Title</th>
            <th className="gb-th">Project</th>
            <th className="gb-th">Author</th>
            <th className="gb-th gb-td-small">Reviewers</th>
            <th className="gb-th gb-td-small">Approvers</th>
            <th className="gb-th gb-td-small">Pipeline</th>
            <th className="gb-th gb-td-small">{updatedHeader}</th>
          </tr>
        </thead>
        <tbody>
          {sortedMrs.map(mr => {
            const ticket = extractJiraTicket(mr.title)
            const disabled = !ticket
            const addTicket = () => {
              if (!ticket) return
              const parts = filter.trim().split(/\s+/).filter(Boolean)
              if (parts.includes(ticket)) return
              setFilter(filter.trim().length ? `${filter.trim()} ${ticket}` : ticket)
            }
            const approvers = approvalsUsersByMr[mr.id] || []
            const reviewers = reviewersUsersByMr[mr.id] || []
            return (
              <tr key={mr.id}>
                <td className="gb-td">
                  <div className="gb-mr-title-block">
                    <div className="gb-mr-title-line">
                      <span className="gb-mr-iid">!{mr.iid}</span>
                      {isDraftMr(mr) && <span className="gb-mr-draft">Draft:</span>}
                      <a href={mr.web_url} target="_blank" className="gb-mr-link" title={mr.title}>{isDraftMr(mr) ? mr.title.replace(/^\s*(?:draft:|wip:)\s*/i,'') : mr.title}</a>
                    </div>
                    <div className="gb-mr-meta-line">
                      <button type="button" onClick={addTicket} disabled={disabled} title={disabled ? 'No JIRA-like ticket (ABC-123) found in title' : `Add ${ticket} to title filter`} className="gb-magnify-btn">🔍</button>
                      <span className="gb-mr-branches">{mr.source_branch} {'\u2192'} {mr.target_branch}</span>
                    </div>
                  </div>
                </td>
                <td className="gb-td">{mr.projectPath.split('/').slice(-1)[0]}</td>
                <td className="gb-td">{mr.author && <UserAvatar user={mr.author} />}</td>
                <td className="gb-td gb-td-small gb-right">{reviewersCell(reviewers, reviewersStatusByMr[mr.id])}</td>
                <td className="gb-td gb-td-small gb-right">{approversCell(approvers, approvalsStatusByMr[mr.id])}</td>
                <td className="gb-td gb-td-small">{pipelineCell(mr)}</td>
                <td className="gb-td gb-td-small"><UpdatedDate iso={mr.updated_at} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  // Group mode
  type Group = { key: string; ticket: string | null; items: MRWithProject[]; latestTs: number }
  const groupMap = new Map<string, Group>()
  for (const mr of sortedMrs) {
    const ticket = extractJiraTicket(mr.title)
    const key = ticket || '__NO_TICKET__'
    if (!groupMap.has(key)) groupMap.set(key, { key, ticket, items: [], latestTs: 0 })
    const g = groupMap.get(key)!
    g.items.push(mr)
    const ts = new Date(mr.updated_at).getTime()
    if (ts > g.latestTs) g.latestTs = ts
  }
  const groups: Group[] = Array.from(groupMap.values())
  groups.sort((a,b) => sortDirection === 'asc' ? a.latestTs - b.latestTs : b.latestTs - a.latestTs)
  groups.forEach(g => g.items.sort((a,b) => {
    const da = new Date(a.updated_at).getTime();
    const db = new Date(b.updated_at).getTime();
    return sortDirection === 'asc' ? da - db : db - da
  }))

  return (
    <table className="gb-table">
      <thead>
        <tr>
          <th className="gb-th">Title</th>
          <th className="gb-th">Project</th>
          <th className="gb-th">Author</th>
          <th className="gb-th gb-td-small">Reviewers</th>
          <th className="gb-th gb-td-small">Approvers</th>
          <th className="gb-th gb-td-small">Pipeline</th>
          <th className="gb-th gb-td-small">{updatedHeader}</th>
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <>
            <tr key={`group-${group.key}`} className="gb-group-row">
              <td className="gb-group-cell" colSpan={7}>
                <div className="gb-group-header">
                  <span className="gb-group-title">{group.ticket ? `${group.ticket} (${group.items.length})` : `No ticket (${group.items.length})`}</span>
                  <span className="gb-group-latest" title="Latest updated MR in this group"><UpdatedDate iso={new Date(group.latestTs).toISOString()} /></span>
                </div>
              </td>
            </tr>
            {group.items.map(mr => {
              const ticket = extractJiraTicket(mr.title)
              const disabled = !ticket
              const addTicket = () => {
                if (!ticket) return
                const parts = filter.trim().split(/\s+/).filter(Boolean)
                if (parts.includes(ticket)) return
                setFilter(filter.trim().length ? `${filter.trim()} ${ticket}` : ticket)
              }
              const approvers = approvalsUsersByMr[mr.id] || []
              const reviewers = reviewersUsersByMr[mr.id] || []
              return (
                <tr key={mr.id}>
                  <td className="gb-td">
                    <div className="gb-mr-title-block">
                      <div className="gb-mr-title-line">
                        <span className="gb-mr-iid">!{mr.iid}</span>
                        {isDraftMr(mr) && <span className="gb-mr-draft">Draft:</span>}
                        <a href={mr.web_url} target="_blank" className="gb-mr-link" title={mr.title}>{isDraftMr(mr) ? mr.title.replace(/^\s*(?:draft:|wip:)\s*/i,'') : mr.title}</a>
                      </div>
                      <div className="gb-mr-meta-line">
                        <button type="button" onClick={addTicket} disabled={disabled} title={disabled ? 'No JIRA-like ticket (ABC-123) found in title' : `Add ${ticket} to title filter`} className="gb-magnify-btn">🔍</button>
                        <span className="gb-mr-branches">{mr.source_branch} {'\u2192'} {mr.target_branch}</span>
                      </div>
                    </div>
                  </td>
                  <td className="gb-td">{mr.projectPath.split('/').slice(-1)[0]}</td>
                  <td className="gb-td">{mr.author && <UserAvatar user={mr.author} />}</td>
                  <td className="gb-td gb-td-small gb-right">{reviewersCell(reviewers, reviewersStatusByMr[mr.id])}</td>
                  <td className="gb-td gb-td-small gb-right">{approversCell(approvers, approvalsStatusByMr[mr.id])}</td>
                  <td className="gb-td gb-td-small">{pipelineCell(mr)}</td>
                  <td className="gb-td gb-td-small"><UpdatedDate iso={mr.updated_at} /></td>
                </tr>
              )
            })}
          </>
        ))}
      </tbody>
    </table>
  )
}
