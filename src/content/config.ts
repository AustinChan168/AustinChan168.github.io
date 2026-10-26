/**
 * 博客内容集合配置。
 *
 * 文章放在 src/content/posts/ 下：
 *   src/content/posts/zh/xxx.md   ← 中文文章
 *   src/content/posts/en/xxx.md   ← 英文文章
 *
 * id 会自动带上语言前缀，比如 'zh/first-post'。
 * 同一篇文章的中英两版用相同的文件名，链接对得上。
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // 一句话摘要，显示在文章列表里
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // draft: true 的文章只在本地 dev 可见，构建时会被跳过
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
