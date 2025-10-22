import { useState } from 'preact/hooks'
import type { User } from '../types'

interface Props { authors: User[]; selectedAuthor: string | null; setSelectedAuthor: (v:string|null)=>void; disabled:boolean }
export const NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled }: Props) => {
  const [open, setOpen] = useState(false)
  const uniqueAuthors = authors.filter(a => !!a?.username)
  const current = uniqueAuthors.find(a => a.username === selectedAuthor) || null
  const choose = (username: string | null) => { setSelectedAuthor(username); setOpen(false) }
  return (
    <div className="gb-ephemeral-wrapper">
      <div className="gb-ephemeral-inner">
        <div className="gb-ephemeral-row">
          <div className="gb-select">
            <button type="button" className={`gb-select-trigger ${disabled? 'disabled':''}`} disabled={disabled} onClick={() => !disabled && setOpen(!open)} title={disabled? 'Disabled when author scope is Mine':''}>
              {current ? <img src={current.avatar_url} alt={current.username} className="gb-avatar" /> : <span className="gb-select-placeholder">All authors</span>}
              <span className="gb-select-value">{current ? current.username : ''}</span>
            </button>
            {open && !disabled && (
              <div className="gb-select-menu">
                <div className={`gb-select-item ${!current? 'active':''}`} onClick={() => choose(null)}>
                  <span className="gb-select-placeholder">All authors</span>
                </div>
                {uniqueAuthors.map(a => (
                  <div key={a.id} className={`gb-select-item ${a.username===selectedAuthor? 'active':''}`} onClick={() => choose(a.username)}>
                    <img src={a.avatar_url} alt={a.username} className="gb-avatar" />
                    <span>{a.username}</span>
                  </div>
                ))}
                {!uniqueAuthors.length && <div className="gb-select-empty">No authors</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
