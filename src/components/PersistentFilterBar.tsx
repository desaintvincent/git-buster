interface Props { hideDrafts: boolean; setHideDrafts: (v: boolean) => void; onlyHotfixes: boolean; setOnlyHotfixes: (v: boolean) => void; authorFilter: 'all'|'mine'|'others'; setAuthorFilter: (v:'all'|'mine'|'others')=>void; username?: string }
export const PersistentFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, authorFilter, setAuthorFilter, username }: Props) => (
  <div className="gb-filter-bar">
    <label title="Draft: GitLab draft/WIP flag or title starts with draft:/wip:" className="gb-filter-item">
      <input type="checkbox" checked={hideDrafts} onChange={e => setHideDrafts((e.target as HTMLInputElement).checked)} /> Hide draft MRs
    </label>
    <label title="Hotfix: targets main or master branch OR title contains 🚑" className="gb-filter-item">
      <input type="checkbox" checked={onlyHotfixes} onChange={e => setOnlyHotfixes((e.target as HTMLInputElement).checked)} /> Only hotfix MRs
    </label>
    <label title="Filter by author relative to configured username" className="gb-filter-item">
      <span>Author:</span>
      <select value={authorFilter} onChange={e => setAuthorFilter((e.target as HTMLSelectElement).value as 'all'|'mine'|'others')}>
        <option value="all">All</option>
        <option value="mine" disabled={!username}>Mine</option>
        <option value="others" disabled={!username}>Others</option>
      </select>
    </label>
  </div>
)
