/**
 * ============================================================================
 *  这是全站唯一的内容文件。改文案只需要动这里，不用碰任何样式代码。
 * ============================================================================
 *
 *  当前形态：极简版 —— 首页只有 Hero（名字 + 两行简介），博客入口在顶栏。
 *  以后想加回「起点 / 方向 / 主线 / 联系」等板块，看 git 历史里
 *  commit 41ac065 之前的 profile.ts 和 PageBody.astro，整套结构都在。
 *
 *  - zh = 中文版，en = 英文版，两份一一对应。
 *  - lead 里用 \n 分行，每行渲染成一段。
 *  - 改完保存，`npm run dev` 会热更新；`./deploy.sh` 发布上线。
 *  - 博客文章不在这里，写在 src/content/posts/<语言>/*.md。
 */

export type Locale = 'zh' | 'en';

export interface Profile {
  htmlLang: string;
  // 浏览器标签页标题
  title: string;
  // 一句话简介。显示在搜索结果和分享卡片里
  description: string;
  hero: {
    label: string;
    name: string;
    // 首页最显眼的自我介绍，\n 分行
    lead: string;
  };
  nav: {
    // 顶栏指向独立页面的链接（如博客）
    pages: { id: string; label: string; href: string }[];
    top: string;
  };
  ui: {
    langLabel: string;
    lastUpdated: string;
    footerNote: string;
    writing: {
      indexTitle: string;
      indexLead: string;
      empty: string;
      backHome: string;
      publishedOn: string;
      draftLabel: string;
      readingTime: string;
      rssLabel: string;
      prevLabel: string;
      nextLabel: string;
    };
  };
}

/* ========================================================================== */
/*                                  中文版                                    */
/* ========================================================================== */

const zh: Profile = {
  htmlLang: 'zh-CN',
  title: 'Austin Chan · Who am I',
  description: 'An observer of the surging technological wave. An undergraduate student studying at a university.',
  hero: {
    label: 'Who am I',
    name: 'Austin Chan',
    lead: '😶 An observer of the surging technological wave.\n🌸 An undergraduate student studying at a university.',
  },
  nav: {
    pages: [{ id: 'writing', label: '文字', href: '/writing' }],
    top: '回到顶部',
  },
  ui: {
    langLabel: 'English',
    lastUpdated: '最后更新 · 2026-10-27',
    footerNote: '',
    writing: {
      indexTitle: '文字',
      indexLead: '',
      empty: '还没有文章。第一篇写点什么都行，别等「想好了」才动笔。',
      backHome: '← 回到首页',
      publishedOn: '发布于',
      draftLabel: '草稿',
      readingTime: '约 {n} 分钟',
      rssLabel: 'RSS 订阅',
      prevLabel: '上一篇',
      nextLabel: '下一篇',
    },
  },
};

/* ========================================================================== */
/*                                  English                                   */
/* ========================================================================== */

const en: Profile = {
  htmlLang: 'en',
  title: 'Austin Chan · Who am I',
  description: 'An observer of the surging technological wave. An undergraduate student studying at a university.',
  hero: {
    label: 'Who am I',
    name: 'Austin Chan',
    lead: '😶 An observer of the surging technological wave.\n🌸 An undergraduate student studying at a university.',
  },
  nav: {
    pages: [{ id: 'writing', label: 'Writing', href: '/en/writing' }],
    top: 'Back to top',
  },
  ui: {
    langLabel: '中文',
    lastUpdated: 'Last updated · Oct 27, 2026',
    footerNote: '',
    writing: {
      indexTitle: 'Writing',
      indexLead: '',
      empty: 'No posts yet. Write the first one badly — waiting until it feels ready is the trap.',
      backHome: '← Home',
      publishedOn: 'Published',
      draftLabel: 'Draft',
      readingTime: '{n} min read',
      rssLabel: 'RSS feed',
      prevLabel: 'Previous',
      nextLabel: 'Next',
    },
  },
};

export const profile: Record<Locale, Profile> = { zh, en };

export function getProfile(locale: Locale): Profile {
  return profile[locale];
}
