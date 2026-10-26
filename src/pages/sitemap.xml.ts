/**
 * 手写 sitemap.xml，不引 @astrojs/sitemap。
 *
 * 收录页面：两个语言的首页、文章列表页，以及所有已发布（非 draft）的文章，
 * 每个条目都带 hreflang 互指，告诉搜索引擎中英两版是同一内容的不同语言。
 */
import { getPosts, absoluteUrl, counterpartPath, type Locale } from '../lib/posts';

export const prerender = true;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface UrlEntry {
  path: string;
  lastmod: string;
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const today = isoDay(new Date());

  const entries: UrlEntry[] = [
    { path: '/', lastmod: today },
    { path: '/en/', lastmod: today },
    { path: '/writing/', lastmod: today },
    { path: '/en/writing/', lastmod: today },
  ];

  for (const locale of ['zh', 'en'] as Locale[]) {
    // sitemap 里只放正式发布的文章：includeDrafts: false
    const posts = await getPosts(locale, { includeDrafts: false });
    const prefix = locale === 'zh' ? '/writing/' : '/en/writing/';
    for (const { slug, entry } of posts) {
      entries.push({
        path: `${prefix}${encodeURIComponent(slug)}/`,
        lastmod: isoDay(entry.data.date),
      });
    }
  }

  const urls = entries
    .map(({ path, lastmod }) => {
      const loc = absoluteUrl(path);
      const alt = absoluteUrl(counterpartPath(path));
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${path.startsWith('/en') ? alt : loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${path.startsWith('/en') ? loc : alt}" />
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
