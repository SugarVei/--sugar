export const CATEGORIES = ['网页应用', '移动应用', '桌面软件', 'AI 工具', '数据分析', '学术研究', 'UI 原型', '练习项目', '其他'] as const
export const STATUSES = ['构思中', '开发中', '测试中', '已上线', '维护中', '已暂停'] as const

export type ProjectCategory = (typeof CATEGORIES)[number]
export type ProjectStatus = (typeof STATUSES)[number]
export type ViewMode = 'grid' | 'list'
export type SortMode = 'updated' | 'created' | 'launched' | 'name'

export interface ProjectScreenshot { id: string; projectId: string; imageUrl: string; label: string; sortOrder: number }
export interface Project {
  id: string; userId: string; name: string; brief: string; logoUrl: string | null; accentColor: string
  category: ProjectCategory; status: ProjectStatus; launchDate: string | null; websiteUrl: string | null
  githubUrl: string | null; vercelUrl: string | null; supabaseUrl: string | null; localPath: string | null
  screenshots: ProjectScreenshot[]; archived: boolean; createdAt: string; updatedAt: string
}

export type ProjectInput = Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'screenshots'> & { screenshots: Array<Omit<ProjectScreenshot, 'id' | 'projectId' | 'sortOrder'>> }
