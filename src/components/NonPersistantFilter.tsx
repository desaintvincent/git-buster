import { NonPersistentProjectFilter } from './NonPersistentProjectFilter'
import { NonPersistentAuthorFilter } from './NonPersistentAuthorFilter'
import type { User } from '../types'

interface Props {
  projects: string[]
  selectedProject: string | null
  setSelectedProject: (v: string | null) => void
  authors: User[]
  selectedAuthor: string | null
  setSelectedAuthor: (v: string | null) => void
  username?: string
  disabled?: boolean // optional for backward compatibility
}

// Wrapper that groups the non-persistent project & author filters with same styling as PersistentFilterBar
export const NonPersistantFilter = ({ projects, selectedProject, setSelectedProject, authors, selectedAuthor, setSelectedAuthor, username, disabled }: Props) => (
  <div className="gb-filter-bar">
    <NonPersistentProjectFilter projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
    <NonPersistentAuthorFilter authors={authors} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} disabled={!!disabled} username={username} />
  </div>
)
