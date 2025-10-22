import type { MR } from '../types'
import type { User } from '../types'
import { UserAvatar } from '../UserAvatar'
import { extractJiraTicket, formatUpdatedAt } from '../utils/mrUtils'

export interface MRWithProject extends MR { projectPath: string }
interface Props { mrs: MRWithProject[]; filter: string; setFilter: (v:string)=>void; approvalsUsersByMr: Record<number, User[]>; reviewersUsersByMr: Record<number, User[]> }

export const MergeRequestsTable = ({ mrs, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr }: Props) => (
  <table className="gb-table">
    <thead>
      <tr>
        <th className="gb-th">Title</th>
        <th className="gb-th">Project</th>
        <th className="gb-th">Author</th>
        <th className="gb-th gb-td-small">Approvals</th>
        <th className="gb-th gb-td-small">Reviewers</th>
        <th className="gb-th gb-td-small">Updated</th>
      </tr>
    </thead>
    <tbody>
      {mrs.map(mr => {
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
              <div className="gb-title-cell">
                <button type="button" onClick={addTicket} disabled={disabled} title={disabled ? 'No JIRA-like ticket (ABC-123) found in title' : `Add ${ticket} to title filter`} className="gb-magnify-btn">🔍</button>
                <a href={mr.web_url} target="_blank" className="gb-link">{mr.title}</a>
              </div>
              <div className="gb-sub">{mr.source_branch} → {mr.target_branch}</div>
            </td>
            <td className="gb-td">{mr.projectPath}</td>
            <td className="gb-td">{mr.author && <UserAvatar user={mr.author} />}</td>
            <td className="gb-td gb-td-small">{approvalsUsers.length ? <span title={`Approvals (${approvalsUsers.length})`} className="gb-avatar-stack">{approvalsUsers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '–'}</td>
            <td className="gb-td gb-td-small">{reviewersUsers.length ? <span title={`Reviewers (${reviewersUsers.length})`} className="gb-avatar-stack">{reviewersUsers.map((u,i)=><UserAvatar user={u} overlap={i>0} />)}</span> : '–'}</td>
            <td className="gb-td gb-td-small">{formatUpdatedAt(mr.updated_at)}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
