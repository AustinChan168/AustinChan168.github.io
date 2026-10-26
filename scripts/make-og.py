#!/usr/bin/env python3
"""
生成默认分享封面 public/og-default.png（1200x630）。

为什么不用设计工具：这张图只需要「安静、不抢戏」，而社交平台的抓图只认
PNG/JPG。用纯 Python 画（不依赖 Pillow）可以随时改配色重新生成：

    python3 scripts/make-og.py

配色取自 global.css 里的 --bg / --line / --accent，改主题时同步改下面三个常量。
"""

import struct
import zlib

W, H = 1200, 630
BG = (0xFC, 0xFC, 0xFA)  # --bg
LINE = (0xE5, 0xE3, 0xDB)  # --line
ACCENT = (0x4F, 0x5D, 0x43)  # --accent

# 点阵：每一行比上一行多亮一颗，收尾停在右上角，读起来像一条上升的路线
COLS, ROWS = 9, 5
DOT, GAP = 16, 96
BW = COLS * DOT + (COLS - 1) * GAP
BH = ROWS * DOT + (ROWS - 1) * GAP
OX, OY = (W - BW) // 2, (H - BH) // 2


def accent_dots():
    """从左上往右下逐行递增，最后一行的最后一颗是终点。"""
    return {(r, c) for r in range(ROWS) for c in range(COLS) if c <= r * 2}


def build_pixels():
    px = [[BG] * W for _ in range(H)]
    accent = accent_dots()

    for r in range(ROWS):
        for c in range(COLS):
            x0 = OX + c * (DOT + GAP)
            y0 = OY + r * (DOT + GAP)
            color = ACCENT if (r, c) in accent else LINE
            for y in range(y0, y0 + DOT):
                row = px[y]
                for x in range(x0, x0 + DOT):
                    row[x] = color

    # 上下两条极细的分隔线，和站内的 hairline 呼应
    for y in (OY - 56, OY + BH + 56):
        if 0 <= y < H:
            for x in range(OX, OX + BW):
                px[y][x] = LINE

    return px


def chunk(tag, data):
    return struct.pack(">I", len(data)) + tag + data + struct.pack(
        ">I", zlib.crc32(tag + data) & 0xFFFFFFFF
    )


def main():
    px = build_pixels()
    raw = b"".join(
        b"\x00" + b"".join(struct.pack("3B", *px[y][x]) for x in range(W)) for y in range(H)
    )
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", W, H, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )
    out = "public/og-default.png"
    with open(out, "wb") as fh:
        fh.write(png)
    print(f"{out}  {len(png)} bytes  {W}x{H}")


if __name__ == "__main__":
    main()
