import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
  teams: string[]
  selectedApprovalTeam: string | null
  setSelectedApprovalTeam: (t:string|null)=>void
  approvalTeamMode: 'all'|'missing'|'ready'
  setApprovalTeamMode: (m:'all'|'missing'|'ready')=>void
  selectedReviewerTeam: string | null
  setSelectedReviewerTeam: (t:string|null)=>void
  reviewerTeamMode: 'all'|'missing'|'ready'
  setReviewerTeamMode: (m:'all'|'missing'|'ready')=>void
  approvalsMissingMode: 'all'|'missing'|'none_missing'
  setApprovalsMissingMode: (m:'all'|'missing'|'none_missing')=>void
  reviewersMissingMode: 'all'|'missing'|'none_missing'
  setReviewersMissingMode: (m:'all'|'missing'|'none_missing')=>void
  disabled?: boolean
}

// Ephemeral filter group for team requirements: per-team mode + overall missing presence filters
export const NonPersistentTeamReqFilter = ({ teams, selectedApprovalTeam, setSelectedApprovalTeam, approvalTeamMode, setApprovalTeamMode, selectedReviewerTeam, setSelectedReviewerTeam, reviewerTeamMode, setReviewerTeamMode, approvalsMissingMode, setApprovalsMissingMode, reviewersMissingMode, setReviewersMissingMode, disabled }: Props) => {
  const [openA, setOpenA] = useState(false)
  const [openR, setOpenR] = useState(false)
  const chooseA = (team:string|null) => { setSelectedApprovalTeam(team); setOpenA(false) }
  const chooseR = (team:string|null) => { setSelectedReviewerTeam(team); setOpenR(false) }
  return (
    <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
      <div className="gb-ephemeral-inner">
        <div className="gb-ephemeral-row">
          <span className="gb-label" title="Filter by presence of ANY missing team approvals">Approvals missing</span>
          <select disabled={disabled} value={approvalsMissingMode} onChange={e=>setApprovalsMissingMode((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
            <option value="all">All</option>
            <option value="missing">Has missing</option>
            <option value="none_missing">None missing</option>
          </select>
        </div>
        <div className="gb-ephemeral-row" title="Filter counts for a specific team approvals requirement">
          <span className="gb-label">Team approvals</span>
          <select disabled={disabled} value={approvalTeamMode} onChange={e=>setApprovalTeamMode((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
            <option value="all">All</option>
            <option value="missing">Missing</option>
            <option value="ready">Ready</option>
          </select>
          <div className="gb-select">
            <div className={`gb-select-trigger ${disabled?'disabled':''}`} onClick={()=>!disabled&&setOpenA(o=>!o)}>{selectedApprovalTeam || 'Select team'}</div>
            {openA && <div className="gb-select-menu">
              <div className="gb-select-item" onClick={()=>chooseA(null)}>(All teams)</div>
              {teams.map(t => <div key={t} className={`gb-select-item ${selectedApprovalTeam===t?'active':''}`} onClick={()=>chooseA(t)}>{t}</div>)}
            </div>}
          </div>
        </div>
      </div>
      <div className="gb-ephemeral-inner">
        <div className="gb-ephemeral-row">
          <span className="gb-label" title="Filter by presence of ANY missing team reviewers">Reviewers missing</span>
          <select disabled={disabled} value={reviewersMissingMode} onChange={e=>setReviewersMissingMode((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
            <option value="all">All</option>
            <option value="missing">Has missing</option>
            <option value="none_missing">None missing</option>
          </select>
        </div>
        <div className="gb-ephemeral-row" title="Filter counts for a specific team reviewer requirement">
          <span className="gb-label">Team reviewers</span>
          <select disabled={disabled} value={reviewerTeamMode} onChange={e=>setReviewerTeamMode((e.target as HTMLSelectElement).value as any)} className="gb-pipeline-select">
            <option value="all">All</option>
            <option value="missing">Missing</option>
            <option value="ready">Ready</option>
          </select>
          <div className="gb-select">
            <div className={`gb-select-trigger ${disabled?'disabled':''}`} onClick={()=>!disabled&&setOpenR(o=>!o)}>{selectedReviewerTeam || 'Select team'}</div>
            {openR && <div className="gb-select-menu">
              <div className="gb-select-item" onClick={()=>chooseR(null)}>(All teams)</div>
              {teams.map(t => <div key={t} className={`gb-select-item ${selectedReviewerTeam===t?'active':''}`} onClick={()=>chooseR(t)}>{t}</div>)}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
