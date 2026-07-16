import { createClient } from '@supabase/supabase-js'
import { seedProjects } from '../data/seed'
import type { Project, ProjectInput, ProjectScreenshot } from '../types/project'

export interface ProjectRepository { getAll(): Promise<Project[]>; create(input: ProjectInput): Promise<Project>; update(id: string, input: ProjectInput): Promise<Project>; archive(id: string, archived: boolean): Promise<Project>; remove(id: string): Promise<void> }
const KEY = 'sugar-project-hub.projects'
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T
const id = () => crypto.randomUUID()

class LocalProjectRepository implements ProjectRepository {
  private read(): Project[] { const saved = localStorage.getItem(KEY); if (saved) return JSON.parse(saved) as Project[]; localStorage.setItem(KEY, JSON.stringify(seedProjects)); return clone(seedProjects) }
  private write(projects: Project[]) { localStorage.setItem(KEY, JSON.stringify(projects)) }
  async getAll() { return clone(this.read()) }
  async create(input: ProjectInput) { const time = new Date().toISOString(); const project: Project = { ...input, id: id(), userId: 'local-user', createdAt: time, updatedAt: time, screenshots: input.screenshots.map((shot, index) => ({ ...shot, id: id(), projectId: '', sortOrder: index })) }; project.screenshots.forEach((shot) => { shot.projectId = project.id }); this.write([project, ...this.read()]); return clone(project) }
  async update(projectId: string, input: ProjectInput) { const projects = this.read(); const index = projects.findIndex((project) => project.id === projectId); if (index < 0) throw new Error('项目不存在'); const old = projects[index]; const project: Project = { ...old, ...input, updatedAt: new Date().toISOString(), screenshots: input.screenshots.map((shot, i) => ({ ...shot, id: old.screenshots[i]?.id ?? id(), projectId, sortOrder: i })) }; projects[index] = project; this.write(projects); return clone(project) }
  async archive(projectId: string, archived: boolean) { const projects = this.read(); const project = projects.find((item) => item.id === projectId); if (!project) throw new Error('项目不存在'); project.archived = archived; project.updatedAt = new Date().toISOString(); this.write(projects); return clone(project) }
  async remove(projectId: string) { this.write(this.read().filter((project) => project.id !== projectId)) }
}

class SupabaseProjectRepository implements ProjectRepository {
  private client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  private async userId() { const { data } = await this.client.auth.getUser(); if (!data.user) throw new Error('请先登录 Supabase 后再管理项目'); return data.user.id }
  private map(row: Record<string, unknown>, screenshots: ProjectScreenshot[] = []): Project { return { ...(row as Omit<Project, 'screenshots'>), screenshots } }
  async getAll() { const { data, error } = await this.client.from('projects').select('*, project_screenshots(*)').order('updated_at', { ascending: false }); if (error) throw error; return (data ?? []).map((row) => this.map({ ...row, createdAt: row.created_at, updatedAt: row.updated_at }, (row.project_screenshots as ProjectScreenshot[] | undefined) ?? [])) }
  async create(input: ProjectInput) { const userId = await this.userId(); const { data, error } = await this.client.from('projects').insert({ ...input, user_id: userId, created_at: undefined, updated_at: undefined, screenshots: undefined }).select().single(); if (error) throw error; return this.map(data) }
  async update(id: string, input: ProjectInput) { const { data, error } = await this.client.from('projects').update({ ...input, screenshots: undefined }).eq('id', id).select().single(); if (error) throw error; return this.map(data) }
  async archive(id: string, archived: boolean) { const { data, error } = await this.client.from('projects').update({ archived }).eq('id', id).select().single(); if (error) throw error; return this.map(data) }
  async remove(id: string) { const { error } = await this.client.from('projects').delete().eq('id', id); if (error) throw error }
}

export const dataMode = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Supabase' : 'localStorage'
export const repository: ProjectRepository = dataMode === 'Supabase' ? new SupabaseProjectRepository() : new LocalProjectRepository()
