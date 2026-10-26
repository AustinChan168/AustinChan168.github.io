/**
 * 博客相关的公共逻辑。
 *
 * 文章放在 src/content/posts/<语言>/*.md，collection 的 id 形如 'zh/first-post'。
 * 这里负责：按语言取文章、去掉语言前缀得到 slug、算阅读时长、草稿过滤。
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Locale = 'zh' | 'en';

export interface LocalizedPost {
  entry: CollectionEntry<'posts'>;
  /** 去掉语言前缀的短 slug，中英两版同名文件互相对应 */
  slug: string;
  locale: Locale;
  minutes: number;
}

/** 'zh/first-post' → 'first-post' */
export function plainSlug(id: string): string {
  return id.includes('/') ? id.slice(id.indexOf('/') + 1) : id;
}

/** 估算阅读时长：中文按 400 字/分钟，英文按 220 词/分钟 */
export function readingMinutes(body: string): number {
  const cjk = (body.match(/[\u3400-\u9fff\u3040-\u30ff]/g) ?? []).length;
  const words = (
    body
      .replace(/[\u3400-\u9fff\u3040-\u30ff]/g, ' ')
      .match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? []
  ).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}

/**
 * 取某个语言的全部文章，按日期倒序。
 * draft 规则：本地开发（npm run dev）草稿也显示，正式构建时隐藏。
 */
export async function getPosts(
  locale: Locale,
  { includeDrafts = !import.meta.env.PROD }: { includeDrafts?: boolean } = {},
): Promise<LocalizedPost[]> {
  const all = await getCollection('posts', ({ data }) => includeDrafts || !data.draft);

  return all
    .filter((entry) => entry.id.startsWith(`${locale}/`))
    .map((entry) => ({
      entry,
      slug: plainSlug(entry.id),
      locale,
      minutes: readingMinutes(entry.body ?? ''),
    }))
    .sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}

/** 取单篇文章。找不到返回 undefined（退化情况由页面决定怎么处理） */
export async function getPost(
  locale: Locale,
  slug: string,
  opts?: { includeDrafts?: boolean },
): Promise<LocalizedPost | undefined> {
  const posts = await getPosts(locale, opts);
  return posts.find((p) => p.slug === slug);
}

/** 把站点内的路径（如 '/writing/first-post/'）转成带域名的绝对地址 */
export function absoluteUrl(path: string): string {
  const site = (import.meta.env.SITE ?? '').replace(/\/+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${site}${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** 中文路径 ↔ 英文路径互转（'/writing/x/' ↔ '/en/writing/x/'） */
export function counterpartPath(path: string): string {
  return path.startsWith('/en/') || path === '/en/'
    ? path.replace(/^\/en/, '') || '/'
    : `/en${path === '/' ? '/' : path}`;
}

/** 日期格式化，按语言给不同写法 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: locale === 'zh' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
