interface Props { hideDrafts: boolean; setHideDrafts: (v: boolean) => void; onlyHotfixes: boolean; setOnlyHotfixes: (v: boolean) => void; groupByTicket: boolean; setGroupByTicket: (v:boolean)=>void }
export const PersistentFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, groupByTicket, setGroupByTicket }: Props) => (
  <div className="gb-filter-bar">
    <label title="Draft: GitLab draft/WIP flag or title starts with draft:/wip:" className="gb-filter-item">
      <input type="checkbox" checked={hideDrafts} onChange={e => setHideDrafts((e.target as HTMLInputElement).checked)} /> Hide draft MRs
    </label>
    <label title="Hotfix: targets main or master branch OR title contains 🚑" className="gb-filter-item">
      <input type="checkbox" checked={onlyHotfixes} onChange={e => setOnlyHotfixes((e.target as HTMLInputElement).checked)} /> Only hotfix MRs
    </label>
    <label title="Group rows by first JIRA-like ticket (ABC-123) in title" className="gb-filter-item">
      <input type="checkbox" checked={groupByTicket} onChange={e => setGroupByTicket((e.target as HTMLInputElement).checked)} /> Group by ticket
    </label>
  </div>
)
