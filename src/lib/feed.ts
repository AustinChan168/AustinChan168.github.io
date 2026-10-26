/**
 * 手写 RSS 2.0，不引第三方依赖。
 * 端点文件在 src/pages/writing/feed.xml.js 和 src/pages/en/writing/feed.xml.js。
 */
import { getPosts, type Locale } from './posts';
import { getProfile } from '../data/profile';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteUrl(origin: string, path: string): string {
  return new URL(path, origin).href;
}

export async function buildFeed(locale: Locale): Promise<string> {
  const t = getProfile(locale);
  const BASE = import.meta.env.BASE_URL;
  const site = (import.meta.env.SITE ?? 'https://example.com').replace(/\/$/, '');
  const writingPrefix = locale === 'zh' ? 'writing' : 'en/writing';

  const posts = await getPosts(locale, { includeDrafts: false });
  const selfUrl = absoluteUrl(site, `${BASE}${writingPrefix}/feed.xml`);
  const indexUrl = absoluteUrl(site, `${BASE}${writingPrefix}/`);

  const items = posts
    .map(({ entry, slug }) => {
      const url = absoluteUrl(site, `${BASE}${writingPrefix}/${slug}/`);
      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${entry.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(entry.data.summary)}</description>
${entry.data.tags.map((tag: string) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const updated =
    posts.length > 0 ? posts[0].entry.data.date.toUTCString() : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${t.ui.writing.indexTitle} · ${t.hero.name}`)}</title>
    <link>${indexUrl}</link>
    <description>${escapeXml(t.description)}</description>
    <language>${locale === 'zh' ? 'zh-CN' : 'en-US'}</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
