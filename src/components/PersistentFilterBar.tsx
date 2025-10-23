interface Props { hideDrafts: boolean; setHideDrafts: (v: boolean) => void; onlyHotfixes: boolean; setOnlyHotfixes: (v: boolean) => void; groupByTicket: boolean; setGroupByTicket: (v:boolean)=>void; pipelineStatus: 'all'|'success'|'failed'; setPipelineStatus: (v:'all'|'success'|'failed')=>void; approvalReadyFilter: 'all'|'ready'|'not_ready'; setApprovalReadyFilter:(v:'all'|'ready'|'not_ready')=>void; reviewerReadyFilter: 'all'|'ready'|'not_ready'; setReviewerReadyFilter:(v:'all'|'ready'|'not_ready')=>void }
export const PersistentFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, groupByTicket, setGroupByTicket, pipelineStatus, setPipelineStatus, approvalReadyFilter, setApprovalReadyFilter, reviewerReadyFilter, setReviewerReadyFilter }: Props) => (
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
    <label className="gb-filter-item" title="Filter by readiness of team approval requirements">
      <span>Approvers:</span>
      <select value={approvalReadyFilter} onChange={e => setApprovalReadyFilter((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
        <option value="all">All</option>
        <option value="ready">Ready</option>
        <option value="not_ready">Not ready</option>
      </select>
    </label>
    <label className="gb-filter-item" title="Filter by readiness of team reviewer requirements">
      <span>Reviewers:</span>
      <select value={reviewerReadyFilter} onChange={e => setReviewerReadyFilter((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
        <option value="all">All</option>
        <option value="ready">Ready</option>
        <option value="not_ready">Not ready</option>
      </select>
    </label>
  </div>
)
