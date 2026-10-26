---
title: '[示例] 第一篇文章怎么写'
summary: '这是一篇演示 Markdown 排版效果的示例文章。看完删掉它就行。'
date: 2026-10-26
tags: ['示例']
draft: false
---

这是一篇**示例文章**，用来展示 Markdown 在站点里的渲染效果。你写完自己的第一篇文章后，把这个文件删掉。

## frontmatter 怎么填

每篇文章开头必须用 `---` 包起来这段：

```yaml
---
title: '文章标题'
summary: '一句话摘要，会显示在文章列表和 RSS 里'
date: 2026-10-26
tags: ['标签一', '标签二']
draft: true
---
```

`draft: true` 的文章**只在本地能看到**，线上不会发布。想正式上线就改成 `false`。

## 正文排版

Markdown 的常见语法都支持。二级标题、三级标题：

### 列表

- 无序列表项
- 再写一项

1. 有序列表第一项
2. 有序列表第二项

### 引用

> 引用块长这样。写读书笔记和摘录时用得上。

### 代码

行内代码用反引号，比如 `printf("hello\n");`。代码块：

```c
#include <stdio.h>

int main(void) {
    printf("Hello, world\n");
    return 0;
}
```

### 链接

[Google](https://google.com) 这种写法就行。

## 中英两版怎么对应

同一篇文章的中英两个版本，**文件名保持一致**：

```
src/content/posts/zh/first-post.md
src/content/posts/en/first-post.md
```

这样切换语言时会在两个版本之间跳。暂时只写一个语言也没问题，另一个语言列表里不显示而已。
