#!/bin/sh
# 一键发布：本地构建 → 推送 dist 到 gh-pages 分支 → GitHub Pages 自动更新
#
# 用法：./deploy.sh
#
# 说明：当前部署走的是「gh-pages 分支」模式，不是 GitHub Actions。
# 原因是授权的 token 没有 workflow 权限，没法推送 .github/workflows/deploy.yml。
# 想切换成 push 即自动构建，见 README「升级成 GitHub Actions 自动构建」。

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
GH_CONFIG_DIR="${GH_CONFIG_DIR:-$HOME/.workbuddy/binaries/gh/config}"
GH_BIN="$HOME/.workbuddy/binaries/gh/gh"
REMOTE_URL="https://github.com/AustinChan168/AustinChan168.github.io.git"
USER="AustinChan168"

cd "$REPO_DIR"

echo "==> 构建"
# 注意：Astro 构建结束后会清理 dist 里的空目录，某些沙箱/回收站环境不允许删除，
# 这时它会报一条 [safe-delete] 警告并返回非 0 退出码，但页面其实已经生成好了。
# 所以这里不直接依赖它的退出码，而是构建后检查产物是否存在。
PATH="/Users/austin/.workbuddy/binaries/node/versions/22.22.2-6/bin:$PATH" npm run build || true

if [ ! -f "$REPO_DIR/dist/index.html" ]; then
  echo "构建失败：没有生成 dist/index.html，往上翻看报错原因" >&2
  exit 1
fi

echo "==> 取 GitHub token"
TOKEN=$(GH_CONFIG_DIR="$GH_CONFIG_DIR" "$GH_BIN" auth token)
if [ -z "$TOKEN" ]; then
  echo "取不到 token，先跑：gh auth login --web --insecure-storage" >&2
  exit 1
fi

SITE_DIR="$(mktemp -d)"
cp -R dist/. "$SITE_DIR/"
touch "$SITE_DIR/.nojekyll"

cd "$SITE_DIR"
git init -q -b gh-pages
git add -A
git commit -q -m "deploy: update site ($(date '+%Y-%m-%d %H:%M'))"
# 推送偶发失败（HTTP2 framing / CONNECT 502 / Empty reply），重试几次
PUSH_OK=0
for attempt in 1 2 3; do
  if git -c http.version=HTTP/1.1 \
      -c credential.helper="!f() { test \"\$1\" = get && echo username=$USER && echo password=$TOKEN; }; f" \
      push --force "$REMOTE_URL" gh-pages; then
    PUSH_OK=1
    break
  fi
  echo "!! 推送失败（第 $attempt 次），5 秒后重试" >&2
  sleep 5
done

cd "$REPO_DIR"
rm -rf "$SITE_DIR"

if [ "$PUSH_OK" != 1 ]; then
  # git 走的 github.com:443 被中间代理拦掉时（502 CONNECT tunnel failed），
  # 换成只走 api.github.com 的 API 通道：四次调用，原子提交。
  echo "!! git 通道不通，改用 API 通道"
  GH_CONFIG_DIR="$GH_CONFIG_DIR" python3 "$REPO_DIR/scripts/deploy-api.py" gh-pages || {
    echo "两条通道都失败了，稍后再跑一次 ./deploy.sh" >&2
    exit 1
  }
fi

echo "==> 完成，约 1 分钟后刷新 https://austinchan168.github.io/"
