---
title: '[Sample] How to write your first post'
summary: 'A placeholder post showing how Markdown renders here. Delete it once you start writing.'
date: 2026-10-26
tags: ['sample']
draft: false
---

This is a **sample post** demonstrating how Markdown renders on this site. Delete this file once you write your own first post.

## How to fill the frontmatter

Every post must start with a `---` fenced block:

```yaml
---
title: 'Post title'
summary: 'One-line summary shown in the list and the RSS feed'
date: 2026-10-26
tags: ['tag-one', 'tag-two']
draft: true
---
```

Posts with `draft: true` are **only visible locally** — they are skipped during the build. Set it to `false` to publish.

## Body formatting

All the usual Markdown works. Second-level and third-level headings:

### Lists

- Unordered item
- Another one

1. First ordered item
2. Second ordered item

### Quotes

> Blockquotes look like this. Handy for reading notes.

### Code

Inline code uses backticks, like `printf("hello\n");`. Fenced blocks:

```c
#include <stdio.h>

int main(void) {
    printf("Hello, world\n");
    return 0;
}
```

### Links

Plain Markdown links work: [Google](https://google.com).

## Keeping the two languages in sync

Use the **same filename** for both versions of a post:

```
src/content/posts/zh/first-post.md
src/content/posts/en/first-post.md
```

That way the language toggle jumps between translations. Writing only one language is fine too — the other language simply won't list it.
