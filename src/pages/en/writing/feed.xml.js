import { buildFeed } from '../../../lib/feed';

export const prerender = true;

export async function GET() {
  return new Response(await buildFeed('en'), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
