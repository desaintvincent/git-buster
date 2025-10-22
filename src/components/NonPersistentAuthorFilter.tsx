interface Props { authors: Array<{username:string; name:string}>; selectedAuthor: string | null; setSelectedAuthor: (v:string|null)=>void; disabled:boolean }
export const NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled }: Props) => (
  <div className="gb-ephemeral-wrapper">
    <div className="gb-ephemeral-inner">
      <label className="gb-label-bold">Ephemeral author filter</label>
      <div className="gb-ephemeral-row">
        <input
          list="gb-authors-list"
          disabled={disabled}
          value={selectedAuthor ?? ''}
          onInput={e => { const v=(e.target as HTMLInputElement).value.trim(); setSelectedAuthor(v? v : null) }}
          placeholder={disabled ? 'Disabled (Mine)' : 'Type to filter by author...'}
          className="gb-ephemeral-input"
        />
        <button type="button" disabled={disabled || !selectedAuthor} onClick={() => setSelectedAuthor(null)} className="gb-btn" title="Clear author filter">Clear</button>
      </div>
      <datalist id="gb-authors-list">
        {authors.map(a => <option value={a.username} label={a.name} />)}
      </datalist>
      <div className="gb-helper">Not persisted. Filters after persistent author scope. Matches username or full name.</div>
    </div>
  </div>
)
