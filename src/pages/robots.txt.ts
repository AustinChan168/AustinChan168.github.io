/**
 * robots.txt：允许所有搜索引擎抓取，并指向 sitemap。
 * 站点地址和 base 从 astro.config 推断，不用手改。
 */
import { absoluteUrl } from '../lib/posts';

export const prerender = true;

export function GET() {
  const body = `User-agent: *
Allow: /

# sitemap 交给搜索引擎自己发现页面
Sitemap: ${absoluteUrl('/sitemap.xml')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
