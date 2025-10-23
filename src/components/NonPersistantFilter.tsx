import { NonPersistentProjectFilter } from './NonPersistentProjectFilter'
import { NonPersistentAuthorFilter } from './NonPersistentAuthorFilter'
import { NonPersistentReviewerFilter } from './NonPersistentReviewerFilter'
import { NonPersistentApproverFilter } from './NonPersistentApproverFilter'
import type { User } from '../types'

interface Props {
  projects: string[]
  selectedProject: string | null
  setSelectedProject: (v: string | null) => void
  authors: User[]
  selectedAuthor: string | null
  setSelectedAuthor: (v: string | null) => void
  reviewerUsers: User[]
  selectedReviewer: string | null
  setSelectedReviewer: (v:string|null)=>void
  invertReviewer: boolean
  setInvertReviewer: (v:boolean)=>void
  approverUsers: User[]
  selectedApprover: string | null
  setSelectedApprover: (v:string|null)=>void
  invertApprover: boolean
  setInvertApprover: (v:boolean)=>void
  username?: string
  disabled?: boolean // optional for backward compatibility
  reviewMetaLoading: boolean
}

// Wrapper that groups the non-persistent project, author, reviewer & approver filters
export const NonPersistantFilter = ({ projects, selectedProject, setSelectedProject, authors, selectedAuthor, setSelectedAuthor, reviewerUsers, selectedReviewer, setSelectedReviewer, invertReviewer, setInvertReviewer, approverUsers, selectedApprover, setSelectedApprover, invertApprover, setInvertApprover, username, disabled, reviewMetaLoading }: Props) => (
  <div className="gb-filter-bar">
    <NonPersistentProjectFilter projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
    <NonPersistentAuthorFilter authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} disabled={!!disabled} username={username} />
    <NonPersistentReviewerFilter users={reviewerUsers} selectedReviewer={selectedReviewer} setSelectedReviewer={setSelectedReviewer} invert={invertReviewer} setInvert={setInvertReviewer} disabled={reviewMetaLoading} />
    <NonPersistentApproverFilter users={approverUsers} selectedApprover={selectedApprover} setSelectedApprover={setSelectedApprover} invert={invertApprover} setInvert={setInvertApprover} disabled={reviewMetaLoading} />
  </div>
)
