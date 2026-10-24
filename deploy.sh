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
PATH="/Users/austin/.workbuddy/binaries/node/versions/22.22.2-6/bin:$PATH" npm run build

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
git -c http.version=HTTP/1.1 \
    -c credential.helper="!f() { test \"\$1\" = get && echo username=$USER && echo password=$TOKEN; }; f" \
    push --force "$REMOTE_URL" gh-pages

rm -rf "$SITE_DIR"
echo "==> 完成，约 1 分钟后刷新 https://austinchan168.github.io/"
