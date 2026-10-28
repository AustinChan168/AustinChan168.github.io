#!/usr/bin/env python3
"""
把本地源码推到 main 分支的 API 通道。

和 scripts/deploy-api.py 是同一套机制，区别是推的是源码（git ls-files 里
被跟踪的文件），而不是 dist/ 构建产物。用于 git 的 github.com:443 通道被
中间代理拦掉（502 CONNECT tunnel failed）时的兜底。

用法：
    python3 scripts/push-source-api.py "提交信息"
"""

import base64
import json
import os
import subprocess
import sys
from pathlib import Path

REPO = "AustinChan168/AustinChan168.github.io"
GH_BIN = os.path.expanduser("~/.workbuddy/binaries/gh/gh")
GH_CONFIG_DIR = os.path.expanduser("~/.workbuddy/binaries/gh/config")


def api(method, endpoint, payload=None):
    cmd = [GH_BIN, "api", "-X", method, f"repos/{REPO}/{endpoint}"]
    if payload is not None:
        with open("/tmp/_push_main_payload.json", "w", encoding="utf-8") as fh:
            json.dump(payload, fh)
        cmd += ["--input", "/tmp/_push_main_payload.json"]
    res = subprocess.run(cmd, capture_output=True, text=True, env=dict(os.environ, GH_CONFIG_DIR=GH_CONFIG_DIR))
    if res.returncode != 0:
        raise RuntimeError(f"{method} {endpoint} 失败: {res.stderr.strip()[:400]}")
    return json.loads(res.stdout) if res.stdout.strip() else {}


def tracked_files():
    out = subprocess.run(["git", "ls-files"], capture_output=True, text=True).stdout.split()
    return [f for f in out if Path(f).is_file()]


def main():
    message = sys.argv[1] if len(sys.argv) > 1 else "update: source"
    files = tracked_files()
    if not files:
        sys.exit("git ls-files 是空的，这里不是 git 仓库？")

    tip = api("GET", "git/ref/heads/main")["object"]["sha"]

    tree_items = []
    for path in files:
        data = Path(path).read_bytes()
        try:
            tree_items.append({"path": path, "mode": "100644", "type": "blob", "content": data.decode("utf-8")})
        except UnicodeDecodeError:
            blob = api("POST", "git/blobs", {"content": base64.b64encode(data).decode(), "encoding": "base64"})
            tree_items.append({"path": path, "mode": "100644", "type": "blob", "sha": blob["sha"]})

    tree = api("POST", "git/trees", {"tree": tree_items})
    commit = api("POST", "git/commits", {"tree": tree["sha"], "message": message, "parents": [tip]})
    api("PATCH", "git/refs/heads/main", {"sha": commit["sha"], "force": True})
    print(f"==> main {commit['sha'][:7]}  {len(files)} 个文件")


if __name__ == "__main__":
    main()
