#!/usr/bin/env python3
"""
gh-pages 发布的 API 兜底通道。

为什么需要：某些网络环境下 git 走的 github.com:443 会被中间代理拦掉（502
CONNECT tunnel failed），但 api.github.com 是通的。这条通道完全不碰
github.com，只用四次 API 调用：取当前 gh-pages 的 tip → 建一棵含全部文件的
tree → 建一次提交 → 把分支指过去。产销是原子的，不会像逐文件 PUT 那样
产生一堆提交。

用法：
    python3 scripts/deploy-api.py            # 把 dist/ 发到 gh-pages
    python3 scripts/deploy-api.py main       # 也可指定别的分支
"""

import base64
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

REPO = "AustinChan168/AustinChan168.github.io"
GH_CONFIG_DIR = os.path.expanduser("~/.workbuddy/binaries/gh/config")
GH_BIN = os.path.expanduser("~/.workbuddy/binaries/gh/gh")
DIST = Path("dist")


def dist_files():
    """返回 [(相对路径, 字节)]，空目录跳过（git 里本来就存不了）。"""
    out = []
    for p in sorted(DIST.rglob("*")):
        if p.is_file():
            out.append((p.relative_to(DIST).as_posix(), p.read_bytes()))
    # Jekyll 默认会跳过下划线开头的目录（_astro），加这个文件告诉它别处理；
    # 少了它，/_astro/*.css 会直接 404。
    out.append((".nojekyll", b""))
    return out


def api(method, endpoint, payload=None):
    cmd = [GH_BIN, "api", "-X", method, f"repos/{REPO}/{endpoint}"]
    if payload is not None:
        tmp = "/tmp/_deploy_api_payload.json"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(payload, fh)
        cmd += ["--input", tmp]
    env = dict(os.environ, GH_CONFIG_DIR=GH_CONFIG_DIR)
    res = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if res.returncode != 0:
        raise RuntimeError(f"{method} {endpoint} 失败: {res.stderr.strip()[:400]}")
    return json.loads(res.stdout) if res.stdout.strip() else {}


def main():
    branch = sys.argv[1] if len(sys.argv) > 1 else "gh-pages"
    files = dist_files()
    if not files:
        sys.exit("dist/ 是空的，先构建。")

    print(f"==> API 通道：{len(files)} 个文件 → {branch}")

    # 1) 当前分支 tip
    tip = api("GET", f"git/ref/heads/{branch}")["object"]["sha"]

    # 2) 一棵树装下所有文件。
    #    注意：create-tree 的 tree[] 不认 encoding 字段 —— content 一律按 UTF-8
    #    字面量存。所以文本文件直接塞原文，二进制文件必须先单独建 blob 拿 sha。
    tree_items = []
    for path, data in files:
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            blob = api("POST", "git/blobs", {"content": base64.b64encode(data).decode(), "encoding": "base64"})
            tree_items.append({"path": path, "mode": "100644", "type": "blob", "sha": blob["sha"]})
            continue
        tree_items.append({"path": path, "mode": "100644", "type": "blob", "content": text})

    tree = api("POST", "git/trees", {"tree": tree_items})

    # 3) 一次提交
    commit = api(
        "POST",
        "git/commits",
        {"tree": tree["sha"], "message": f"deploy: update site via API ({len(files)} files)", "parents": [tip]},
    )

    # 4) 把分支指过去
    api("PATCH", f"git/refs/heads/{branch}", {"sha": commit["sha"], "force": True})

    print(f"==> 提交 {commit['sha'][:7]} 已写入 {branch}")


if __name__ == "__main__":
    main()
