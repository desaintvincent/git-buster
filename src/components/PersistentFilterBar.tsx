interface Props { hideDrafts: boolean; setHideDrafts: (v: boolean) => void; onlyHotfixes: boolean; setOnlyHotfixes: (v: boolean) => void }
export const PersistentFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes }: Props) => (
  <div className="gb-filter-bar">
    <label title="Draft: GitLab draft/WIP flag or title starts with draft:/wip:" className="gb-filter-item">
      <input type="checkbox" checked={hideDrafts} onChange={e => setHideDrafts((e.target as HTMLInputElement).checked)} /> Hide draft MRs
    </label>
    <label title="Hotfix: targets main or master branch OR title contains 🚑" className="gb-filter-item">
      <input type="checkbox" checked={onlyHotfixes} onChange={e => setOnlyHotfixes((e.target as HTMLInputElement).checked)} /> Only hotfix MRs
    </label>
  </div>
)
