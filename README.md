# Who am I — 个人介绍页

一个静态自我介绍站，中英双语，部署在 GitHub Pages。技术栈：**Astro 5 + GitHub Pages**（无后端、零费用）。

- 仓库：https://github.com/AustinChan168/AustinChan168.github.io
- 线上：https://austinchan168.github.io （英文版 https://austinchan168.github.io/en）

## 日常改内容

**你只需要改一个文件：`src/data/profile.ts`**

里面 `zh` 是中文版、`en` 是英文版，两份一一对应。改完保存即可，`npm run dev` 会自动热更新。

文件里标了 `TODO` 的地方是需要你补的信息：

- GitHub 主页地址
- 常用邮箱

`href` 留空的链接会自动显示为「待补充」，不会失效。

## 本地开发

```bash
npm install        # 首次
npm run dev        # 打开 http://localhost:4321
npm run build      # 构建到 dist/
npm run preview    # 预览构建结果
```

需要 Node 18+，本项目用 Node 22 验证过。

## 首次上线

GitHub CLI 已经装好了，位置：

```
/Users/austin/.workbuddy/binaries/gh/gh      # 实际二进制
~/.local/bin/gh                              # 已软链到 PATH（新开终端窗口生效）
```

如果在新终端里敲 `gh` 提示找不到命令，执行一次：

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
```

（不要跑 `brew install gh` 去重装，已经有了。）

如果 `gh auth status` 显示未登录，重新登录一次：

```bash
gh auth login --web
```

## 发布到线上

当前是 **gh-pages 分支模式**：本地构建，把 `dist/` 推到 `gh-pages` 分支，GitHub Pages 负责托管。

一条命令搞定：

```bash
cd /Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site
./deploy.sh
```

推送后约 1 分钟生效。源码本身单独维护在 `main` 分支，互不影响。

## 升级成 GitHub Actions 自动构建

现在这套需要本地跑 `deploy.sh`。想要「push 到 main 就自动构建部署」，需要给 token 补一个 `workflow` 权限：

```bash
export GH_CONFIG_DIR="$HOME/.workbuddy/binaries/gh/config"
gh auth login --web --insecure-storage --scopes repo,workflow
```

授权完成后三步：

```bash
# 1) 启用工作流文件（注意：必须放到 .github/workflows/ 这个精确路径下）
mkdir -p .github/workflows && mv deploy.yml.example .github/workflows/deploy.yml

# 2) 提交并推送
git add -A && git commit -m "ci: enable GitHub Actions deploy" && git push

# 3) 网页端：Settings → Pages → Source 改成 GitHub Actions
```

之后什么都不用做，改完 `profile.ts` 直接 `git push` 就行。

> 为什么不一开始就配好？因为 GitHub 规定：OAuth token 没有 `workflow` 权限时，**不允许**创建或修改 `.github/workflows/` 下的文件，push 会直接 403。补权限需要再授权一次，所以先把站点上线，这个作为可选升级。

## 部署地址

站点会自动根据仓库名算出正确的路径（逻辑写在 `astro.config.mjs` 的 `detectPagesTarget()` 里），不需要手动改配置：

| 仓库名 | 访问地址 |
| --- | --- |
| `<用户名>.github.io` | `https://<用户名>.github.io` |
| 其他名字（如 `whoami`） | `https://<用户名>.github.io/whoami` |

如果你改了仓库名，在本地重新关联远端即可：

```bash
git remote set-url origin https://github.com/<用户名>/<新仓库名>.git
npm run build   # 重新构建，新的路径会生效
```

想验证推断结果对不对：

```bash
DEBUG_CONFIG=1 npm run build
```

## 日常操作流程

改完 `src/data/profile.ts` 之后：

```bash
cd /Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site
./deploy.sh        # 构建 + 发布到线上（约 1 分钟生效）
git add . && git commit -m "update" && git push   # 顺便把源码也存到 GitHub
```

本地预览草稿只要 `npm run dev`，不用每次都发布。

## 文件结构

```
src/
  data/profile.ts         ← 自我介绍的全部文案 + 界面词，改这里
  styles/global.css       ← 全部外观，改这里
  content/
    config.ts             ← 文章的字段定义（title / summary / date / tags / draft）
    posts/zh/*.md         ← 中文文章
    posts/en/*.md         ← 英文文章
  layouts/BaseLayout.astro    ← html 外壳：顶栏 + 页脚 + 语言切换
  components/PageBody.astro   ← 首页正文（8 个板块）
  components/WritingList.astro   ← 文章列表页
  components/PostContent.astro   ← 文章详情页
  lib/posts.ts            ← 按语言读文章、算阅读时长、草稿过滤
  lib/feed.ts             ← RSS 生成
  pages/
    index.astro           ← 中文首页  /
    en/index.astro        ← 英文首页  /en
    writing/index.astro   ← 中文文章列表  /writing
    writing/[...slug].astro      ← 中文文章详情  /writing/<slug>
    writing/feed.xml.js          ← 中文 RSS
    en/writing/...        ← 上面三个的英文版
```

## 写博客

文章是 Markdown 文件，放在 `src/content/posts/` 下，按语言分目录：

```
src/content/posts/zh/xxx.md     ← 中文文章  →  /writing/xxx
src/content/posts/en/xxx.md     ← 英文文章  →  /en/writing/xxx
```

**同一篇文章的中英两版用同一个文件名**，语言切换时会自动互跳。只写一个语言也没问题，另一个语言的列表里不显示而已。

### 新建一篇文章

复制目录下任意一篇 `.md`，改个文件名，改这段开头（frontmatter）：

```yaml
---
title: '文章标题'
summary: '一句话摘要，会显示在文章列表和 RSS 里'
date: 2026-10-26
tags: ['标签一', '标签二']
draft: true
---
```

正文直接写 Markdown。标题、列表、引用、代码块、表格都排版好了，不用操心样式。

### draft 的控制逻辑

| `draft` | 本地 `npm run dev` | 线上 `npm run build` |
| --- | --- | --- |
| `true` | 显示（带 Draft 标记） | 不发布 |
| `false` | 显示 | 发布 |

现在仓库里带一篇示例文章 `[示例] 第一篇文章怎么写`（已发布，为了让你看到效果）。写完自己的第一篇就把它删掉。

### RSS

两个语言各有一份：`/writing/feed.xml` 和 `/en/writing/feed.xml`。文章列表页顶部有链接。

## 待办

- [ ] 补 GitHub 与邮箱链接（`profile.ts` 里 contact 段的 href）
- [ ] 替换或删除示例文章 `src/content/posts/{zh,en}/first-post.md`
- [ ] 加项目展示板块
- [ ] 接一个自定义域名
