import { useState } from 'preact/hooks'
import type { User } from '../types'

const NOT_ME = '__NOT_ME__'

interface Props { authors: User[]; selectedAuthor: string | null; setSelectedAuthor: (v:string|null)=>void; disabled:boolean; username?: string }
export const NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled, username }: Props) => {
  const [open, setOpen] = useState(false)
  const uniqueAuthors = authors.filter(a => !!a?.username)
  const current = selectedAuthor === NOT_ME
    ? (username ? { username: NOT_ME, avatar_url: '', id: -1 } as any : null)
    : uniqueAuthors.find(a => a.username === selectedAuthor) || null
  const choose = (usernameChoice: string | null) => { setSelectedAuthor(usernameChoice); setOpen(false) }
  return (
    <div className="gb-select">
      <button type="button" className={`gb-select-trigger ${disabled? 'disabled':''}`} disabled={disabled} onClick={() => !disabled && setOpen(!open)} title={disabled? 'Disabled when author scope is Mine':''}>
        {current && current.username !== NOT_ME && current.avatar_url ? <img src={current.avatar_url} alt={current.username} className="gb-avatar" /> : <span className="gb-select-placeholder">{current?.username === NOT_ME ? 'Not me' : 'All authors'}</span>}
        <span className="gb-select-value">{current ? (current.username === NOT_ME ? 'Not me' : current.username) : ''}</span>
      </button>
      {open && !disabled && (
        <div className="gb-select-menu">
          <div className={`gb-select-item ${!current? 'active':''}`} onClick={() => choose(null)}>
            <span className="gb-select-placeholder">All authors</span>
          </div>
          {username && (
            <div className={`gb-select-item ${selectedAuthor===NOT_ME? 'active':''}`} onClick={() => choose(NOT_ME)}>
              <span>Not me</span>
            </div>
          )}
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
  )
}

export { NOT_ME }
