import type { MR } from '../types'
import type { User } from '../types'
import { UserAvatar } from '../UserAvatar'
import { extractJiraTicket, isDraftMr } from '../utils/mrUtils'
import { UpdatedDate } from './UpdatedDate'

export interface MRWithProject extends MR { projectPath: string }
interface Props { mrs: MRWithProject[]; filter: string; setFilter: (v:string)=>void; approvalsUsersByMr: Record<number, User[]>; reviewersUsersByMr: Record<number, User[]>; groupByTicket: boolean; sortDirection: 'asc'|'desc'; setSortDirection: (d:'asc'|'desc')=>void }

const pipelineCell = (mr: MRWithProject) => {
  const status = mr.head_pipeline?.status
  if (!status) return '\u2013'
  if (status === 'success') return <span className="gb-pipeline-status success" title="Pipeline succeeded">✓</span>
  if (status === 'failed') return <span className="gb-pipeline-status failed" title="Pipeline failed">✗</span>
  return <span className="gb-pipeline-status other" title={`Pipeline status: ${status}`}>•</span>
}

export const MergeRequestsTable = ({ mrs, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr, groupByTicket, sortDirection, setSortDirection }: Props) => {
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
            <th className="gb-th gb-td-small">Approvals</th>
            <th className="gb-th gb-td-small">Reviewers</th>
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
            const approvalsUsers = approvalsUsersByMr[mr.id] || []
            const reviewersUsers = reviewersUsersByMr[mr.id] || []
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
                      <span className="gb-mr-branches">{mr.source_branch} → {mr.target_branch}</span>
                    </div>
                  </div>
                </td>
                <td className="gb-td">{mr.projectPath.split('/').slice(-1)[0]}</td>
                <td className="gb-td">{mr.author && <UserAvatar user={mr.author} />}</td>
                <td className="gb-td gb-td-small">{approvalsUsers.length ? <span title={`Approvals (${approvalsUsers.length})`} className="gb-avatar-stack">{approvalsUsers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '\u2013'}</td>
                <td className="gb-td gb-td-small">{reviewersUsers.length ? <span title={`Reviewers (${reviewersUsers.length})`} className="gb-avatar-stack">{reviewersUsers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '\u2013'}</td>
                <td className="gb-td gb-td-small">{pipelineCell(mr)}</td>
                <td className="gb-td gb-td-small"><UpdatedDate iso={mr.updated_at} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  // Group by JIRA ticket (uppercase) or __NO_TICKET__ sentinel
  type Group = { key: string; ticket: string | null; items: MRWithProject[]; latestTs: number }
  const groupMap = new Map<string, Group>()
  for (const mr of sortedMrs) { // already sorted, but we'll compute latestTs explicitly
    const ticket = extractJiraTicket(mr.title)
    const key = ticket || '__NO_TICKET__'
    if (!groupMap.has(key)) {
      groupMap.set(key, { key, ticket, items: [], latestTs: 0 })
    }
    const g = groupMap.get(key)!
    g.items.push(mr)
    const ts = new Date(mr.updated_at).getTime()
    if (ts > g.latestTs) g.latestTs = ts
  }
  const groups: Group[] = Array.from(groupMap.values())
  groups.sort((a,b) => sortDirection === 'asc' ? a.latestTs - b.latestTs : b.latestTs - a.latestTs)
  // Sort MRs inside each group by updated according to sortDirection
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
          <th className="gb-th gb-td-small">Approvals</th>
          <th className="gb-th gb-td-small">Reviewers</th>
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
              const approvalsUsers = approvalsUsersByMr[mr.id] || []
              const reviewersUsers = reviewersUsersByMr[mr.id] || []
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
                        <span className="gb-mr-branches">{mr.source_branch} → {mr.target_branch}</span>
                      </div>
                    </div>
                  </td>
                  <td className="gb-td">{mr.projectPath.split('/').slice(-1)[0]}</td>
                  <td className="gb-td">{mr.author && <UserAvatar user={mr.author} />}</td>
                  <td className="gb-td gb-td-small">{approvalsUsers.length ? <span title={`Approvals (${approvalsUsers.length})`} className="gb-avatar-stack">{approvalsUsers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '\u2013'}</td>
                  <td className="gb-td gb-td-small">{reviewersUsers.length ? <span title={`Reviewers (${reviewersUsers.length})`} className="gb-avatar-stack">{reviewersUsers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '\u2013'}</td>
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
