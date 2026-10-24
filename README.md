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
  data/profile.ts         ← 全部文案，改这里
  styles/global.css       ← 全部外观，改这里
  components/PageBody.astro
  pages/
    index.astro           ← 中文版  /
    en/index.astro        ← 英文版  /en
.github/workflows/deploy.yml
```

## 以后想加博客

在 `src/pages/` 下建 `writing/index.astro`，用 Markdown 写文章即可，Astro 原生支持。届时再引入 Content Collections + 一个列表页，不用动现有代码。

## 待办

- [ ] 补 GitHub 与邮箱链接（`profile.ts` 里的 TODO）
- [ ] 更新联系方式、换一张头像或 favicon
- [ ] 加博客板块 / 项目板块
- [ ] 接一个自定义域名
