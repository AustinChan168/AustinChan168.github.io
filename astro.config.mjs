import { defineConfig } from 'astro/config';
import { execSync } from 'node:child_process';

/**
 * 自动从 git remote 推断 GitHub Pages 的 site 和 base：
 *   - 仓库名为 <用户名>.github.io  → https://<用户名>.github.io        base = '/'
 *   - 其他仓库名                    → https://<用户名>.github.io/<仓库名>  base = '/<仓库名>'
 * 这样就不用每次换仓库名手动改配置了。
 * 需要手动覆盖时，设置环境变量 SITE_URL / BASE_PATH 即可。
 */
function detectPagesTarget() {
  if (process.env.SITE_URL) {
    return { site: process.env.SITE_URL, base: process.env.BASE_PATH || '/' };
  }

  try {
    const remote = execSync('git remote get-url origin', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();

    const matched = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (matched) {
      const owner = matched[1];
      const repo = matched[2];
      const site = `https://${owner.toLowerCase()}.github.io`;
      const base =
        repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${repo}`;
      return { site, base };
    }
  } catch {
    // 本地还没关联远端时会走到这里，用下面的默认值，不影响 npm run dev
  }

  return { site: 'https://example.github.io', base: '/' };
}

const { site, base } = detectPagesTarget();

if (process.env.DEBUG_CONFIG) {
  console.log(`[whoami-site] site=${site} base=${base}`);
}

export default defineConfig({
  site,
  base,
  outDir: 'dist',
  // directory 模式：生成 index.html 和 en/index.html，GitHub Pages 对这两种路径都稳
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
});
