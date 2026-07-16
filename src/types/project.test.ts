import { describe, expect, it } from 'vitest'
import { CATEGORIES, STATUSES } from './project'
describe('project taxonomy', () => { it('keeps required categories and statuses', () => { expect(CATEGORIES).toContain('AI 工具'); expect(CATEGORIES).toContain('网页应用'); expect(STATUSES).toContain('已上线'); expect(STATUSES).toContain('开发中') }) })
