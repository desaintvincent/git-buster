import { useState } from 'preact/hooks'

interface Props { projects: string[]; selectedProject: string | null; setSelectedProject: (v:string|null)=>void }
export const NonPersistentProjectFilter = ({ projects, selectedProject, setSelectedProject }: Props) => {
  const [open, setOpen] = useState(false)
  const choose = (p: string | null) => { setSelectedProject(p); setOpen(false) }
  return (
    <div className="gb-project-filter">
      <div className="gb-select">
        <button type="button" className={`gb-select-trigger ${projects.length? '' : 'disabled'}`} disabled={!projects.length} onClick={() => projects.length && setOpen(!open)}>
          {selectedProject ? <span className="gb-select-value">{selectedProject}</span> : <span className="gb-select-placeholder">All projects</span>}
        </button>
        {open && (
          <div className="gb-select-menu">
            <div className={`gb-select-item ${!selectedProject? 'active':''}`} onClick={() => choose(null)}>
              <span className="gb-select-placeholder">All projects</span>
            </div>
            {projects.map(p => (
              <div key={p} className={`gb-select-item ${p===selectedProject? 'active':''}`} onClick={() => choose(p)}>
                <span>{p}</span>
              </div>
            ))}
            {!projects.length && <div className="gb-select-empty">No projects</div>}
          </div>
        )}
      </div>
    </div>
  )
}
