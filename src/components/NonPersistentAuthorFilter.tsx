import { useState, useEffect, useRef } from 'preact/hooks'
import type { User } from '../types'

const NOT_ME = '__NOT_ME__'

interface Props { authors: User[]; selectedAuthor: string | null; setSelectedAuthor: (v:string|null)=>void; disabled:boolean; username?: string; invertAuthor: boolean; setInvertAuthor:(v:boolean)=>void }
export const NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled, username, invertAuthor, setInvertAuthor }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (open && ref.current && !ref.current.contains(e.target as Node)) { setOpen(false) } }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])
  const uniqueAuthors = authors.filter(a => !!a?.username)
  const isNotMe = selectedAuthor === NOT_ME
  const meUser = username ? uniqueAuthors.find(a => a.username === username) || null : null
  const current = isNotMe ? meUser : uniqueAuthors.find(a => a.username === selectedAuthor) || null
  const choose = (usernameChoice: string | null) => { setSelectedAuthor(usernameChoice); if (usernameChoice === null) { setInvertAuthor(false) } setOpen(false) }
  const chooseNotMe = () => { setSelectedAuthor(NOT_ME); setInvertAuthor(false); setOpen(false) }
  const displayName = isNotMe ? '(not) me' : (current ? `${invertAuthor ? '(not) ' : ''}${current.username}` : '')
  return (
    <div className="gb-select" ref={ref}>
      <button type="button" className={`gb-select-trigger ${disabled? 'disabled':''}`} disabled={disabled} onClick={() => !disabled && setOpen(!open)} aria-expanded={open} title={disabled? 'Disabled when author scope is Mine':''}>
        {current && current.avatar_url ? (
          <span className="gb-avatar-wrapper gb-avatar-filter-value">
            <img src={current.avatar_url} alt={current.username} className="gb-avatar" />
            {(isNotMe || invertAuthor) && <span className="gb-avatar-invert-marker">✗</span>}
          </span>
        ) : <span className="gb-select-placeholder">All authors</span>}
        <span className="gb-select-value">{displayName}</span>
      </button>
      {open && !disabled && (
        <div className="gb-select-menu">
          <div className={`gb-select-item ${!current && !isNotMe? 'active':''}`} onClick={() => choose(null)}>
            <span className="gb-select-placeholder">All authors</span>
          </div>
          {username && (
            <div className={`gb-select-item ${isNotMe? 'active':''}`} onClick={chooseNotMe}>
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
          {current && !isNotMe && (
            <div className="gb-select-item" onClick={() => setInvertAuthor(!invertAuthor)}>
              <input type="checkbox" checked={invertAuthor} onChange={e => setInvertAuthor((e.target as HTMLInputElement).checked)} /> <span>Invert (not)</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { NOT_ME }
