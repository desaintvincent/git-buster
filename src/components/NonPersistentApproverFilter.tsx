import { useState } from 'preact/hooks'
import type { User } from '../types'

interface Props { users: User[]; selectedApprover: string | null; setSelectedApprover: (v:string|null)=>void; invert: boolean; setInvert: (v:boolean)=>void; disabled:boolean }
export const NonPersistentApproverFilter = ({ users, selectedApprover, setSelectedApprover, invert, setInvert, disabled }: Props) => {
  const [open, setOpen] = useState(false)
  const unique = users.filter(u => !!u?.username)
  const current = unique.find(u => u.username === selectedApprover) || null
  const choose = (usernameChoice: string | null) => { setSelectedApprover(usernameChoice); setOpen(false) }
  return (
    <div className="gb-select" title="Filter by approvers (users who approved)">
      <button type="button" className={`gb-select-trigger ${disabled? 'disabled':''}`} disabled={disabled} onClick={() => !disabled && setOpen(!open)}>
        {current && current.avatar_url ? <img src={current.avatar_url} alt={current.username} className="gb-avatar" /> : <span className="gb-select-placeholder">Approver</span>}
        <span className="gb-select-value">{current ? current.username : ''}{invert && current ? ' (not)' : ''}</span>
      </button>
      {open && !disabled && (
        <div className="gb-select-menu">
          <div className={`gb-select-item ${!current? 'active':''}`} onClick={() => choose(null)}>
            <span className="gb-select-placeholder">All approvers</span>
          </div>
          {unique.map(u => (
            <div key={u.id} className={`gb-select-item ${u.username===selectedApprover? 'active':''}`} onClick={() => choose(u.username)}>
              <img src={u.avatar_url} alt={u.username} className="gb-avatar" />
              <span>{u.username}</span>
            </div>
          ))}
          {!unique.length && <div className="gb-select-empty">No approvers</div>}
          <div className="gb-select-item" onClick={() => setInvert(!invert)}>
            <input type="checkbox" checked={invert} onChange={e => setInvert((e.target as HTMLInputElement).checked)} /> <span>Not approved by selected</span>
          </div>
        </div>
      )}
    </div>
  )
}

