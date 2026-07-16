import type { Project } from '../types/project'

function initials(name: string) { const chinese = name.match(/[\u4e00-\u9fff]/g); if (chinese?.length) return chinese.slice(0, 2).join(''); return name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase() }
export function ProjectLogo({ project, size = 'regular' }: { project: Pick<Project, 'name' | 'logoUrl' | 'accentColor'>; size?: 'regular' | 'large' }) { return project.logoUrl ? <img className={`project-logo ${size}`} src={project.logoUrl} alt={`${project.name} Logo`} /> : <span className={`project-logo ${size} generated`} style={{ '--logo-color': project.accentColor } as React.CSSProperties}>{initials(project.name)}</span> }
