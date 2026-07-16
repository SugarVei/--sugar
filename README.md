# Sugar Project Hub

独立的个人项目可视化管理平台。默认使用 `localStorage`，无需后端即可创建、编辑、归档、恢复和删除项目。

## 启动

```powershell
npm install
npm run dev
```

## 使用 Supabase

1. 在 Supabase 新项目的 SQL Editor 执行 `supabase/migrations/202607150001_init_project_hub.sql`。
2. 在 Storage 创建私有 bucket：`project-assets`，按迁移文件的注释添加按用户隔离的策略。
3. 将 `.env.example` 复制为 `.env.local`，填写匿名公钥：

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

配置两个变量后，应用会自动切换到 Supabase 仓库。Supabase 模式需要有已登录的 Auth 会话；前端不使用、也不应使用 Service Role Key。

## 检查

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```
