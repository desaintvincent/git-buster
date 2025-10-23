interface Props { hideDrafts: boolean; setHideDrafts: (v: boolean) => void; onlyHotfixes: boolean; setOnlyHotfixes: (v: boolean) => void; groupByTicket: boolean; setGroupByTicket: (v:boolean)=>void; pipelineStatus: 'all'|'success'|'failed'; setPipelineStatus: (v:'all'|'success'|'failed')=>void }
export const PersistentFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, groupByTicket, setGroupByTicket, pipelineStatus, setPipelineStatus }: Props) => (
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
    <label title="Filter by head pipeline status" className="gb-filter-item">
      <span>Pipeline:</span>
      <select value={pipelineStatus} onChange={e => setPipelineStatus((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
        <option value="all">All</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
      </select>
    </label>
  </div>
)
