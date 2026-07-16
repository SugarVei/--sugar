import type { Project } from '../types/project'

const now = new Date().toISOString()
export const seedProjects: Project[] = [
  { id: 'sugar-hub', userId: 'local-user', name: 'Sugar Project Hub', brief: '安静而清晰的个人项目可视化管理中枢，集中保存作品、链接与项目状态。', logoUrl: null, accentColor: '#9c88d7', category: '网页应用', status: '开发中', launchDate: null, websiteUrl: null, githubUrl: 'https://github.com/', vercelUrl: null, supabaseUrl: null, localPath: 'D:\\Projects\\sugar-project-hub', screenshots: [], archived: false, createdAt: now, updatedAt: now },
  { id: 'paper-reader', userId: 'local-user', name: '文献阅读软件', brief: '面向学术阅读、段落翻译与智能问答的桌面研究工具。', logoUrl: null, accentColor: '#e59384', category: 'AI 工具', status: '维护中', launchDate: '2026-06-20', websiteUrl: 'https://example.com', githubUrl: 'https://github.com/', vercelUrl: null, supabaseUrl: null, localPath: 'D:\\Apps\\paper-reader', screenshots: [], archived: false, createdAt: '2026-06-01T08:00:00.000Z', updatedAt: '2026-07-11T10:00:00.000Z' },
  { id: 'thesis-visual', userId: 'local-user', name: '课题可视化原型', brief: '用于呈现复杂系统工作流与论文成果的高保真交互原型。', logoUrl: null, accentColor: '#77aebe', category: 'UI 原型', status: '已上线', launchDate: '2026-05-18', websiteUrl: 'https://example.com', githubUrl: null, vercelUrl: 'https://vercel.com', supabaseUrl: null, localPath: null, screenshots: [], archived: false, createdAt: '2026-05-01T08:00:00.000Z', updatedAt: '2026-07-03T12:30:00.000Z' },
]
