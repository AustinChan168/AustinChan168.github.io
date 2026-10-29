/**
 * ============================================================================
 *  这是全站唯一的内容文件。改文案只需要动这里，不用碰任何样式代码。
 * ============================================================================
 *
 *  当前形态：Hero 主导 —— motto 是页面上最大的一行字，名字放在顶栏里。
 *  以后想加回「起点 / 方向 / 主线 / 联系 / 项目网格」等板块，看 git 历史里
 *  commit 41ac065 之前的 profile.ts 和 PageBody.astro，整套结构都在。
 *
 *  - zh = 中文版，en = 英文版，两份一一对应。
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
    // 顶栏左上角 + 分享卡片里显示的名字
    name: string;
    // 页面上最大的一行字。写你信的那句话，不是写名字
    motto: string;
    // motto 下面的一行补充
    lead: string;
    // Hero 下面的行动按钮。external: true 的会新窗口打开
    actions: { label: string; href: string; external?: boolean }[];
  };
  nav: {
    // 顶栏指向独立页面的链接（如博客）
    pages: { id: string; label: string; href: string }[];
    top: string;
  };
  // 作品展示区的界面词。作品本身的数据在 src/data/works.ts
  works: {
    label: string;
    title: string;
    lead: string;
    filterAll: string;
    viewLabel: string;
    empty: string;
    roleLabel: string;
    yearLabel: string;
    toolsLabel: string;
    linkLabel: string;
    back: string;
  };
  // 个人介绍区（内容就在下面 ui 同级的 paragraphs / tags / now / contact）
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    tags: string[];
    nowTitle: string;
    now: { when: string; text: string }[];
    contactTitle: string;
    contact: { label: string; value: string; href?: string }[];
  };
  home: {
    writingTitle: string;
    writingAll: string;
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
    motto: '😶 An observer of the surging technological wave.',
    lead: '🌸 An undergraduate student studying at a university.',
    actions: [
      { label: '作品 →', href: '/#works' },
      { label: '文字', href: '/writing' },
      { label: 'GitHub ↗', href: 'https://github.com/AustinChan168', external: true },
    ],
  },
  nav: {
    pages: [
      { id: 'works', label: '作品', href: '/#works' },
      { id: 'writing', label: '文字', href: '/writing' },
    ],
    top: '回到顶部',
  },
  works: {
    label: 'Selected work',
    title: '作品',
    lead: '做过的项目，按类型分。点开看每一件具体做了什么。',
    filterAll: '全部',
    viewLabel: '查看项目 →',
    empty: '还没有作品。先做一个能跑起来的最小版本，再放上来。',
    roleLabel: '角色',
    yearLabel: '年份',
    toolsLabel: '工具',
    linkLabel: '外部链接',
    back: '← 全部作品',
  },
  about: {
    label: 'About',
    title: '关于',
    paragraphs: [
      '[一段自我介绍：你是谁、在做什么、想往哪走，三句以内。别写形容词，写事实。]',
      '[再补一句：你为什么做这些事，或者你最在意什么。]',
    ],
    tags: ['[标签]', '[标签]', '[标签]', '[标签]'],
    nowTitle: '现在',
    now: [
      { when: '[2026 · 秋]', text: '[现在在学什么 / 在做什么项目]' },
      { when: '[下个阶段]', text: '[接下来要做的事]' },
    ],
    contactTitle: '联系',
    contact: [
      { label: 'Email', value: '[you@example.com]' },
      { label: 'GitHub', value: 'AustinChan168', href: 'https://github.com/AustinChan168' },
    ],
  },
  home: {
    writingTitle: '最近写的',
    writingAll: '全部文字 →',
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
    motto: '😶 An observer of the surging technological wave.',
    lead: '🌸 An undergraduate student studying at a university.',
    actions: [
      { label: 'Work →', href: '/en/#works' },
      { label: 'Writing', href: '/en/writing' },
      { label: 'GitHub ↗', href: 'https://github.com/AustinChan168', external: true },
    ],
  },
  nav: {
    pages: [
      { id: 'works', label: 'Work', href: '/en/#works' },
      { id: 'writing', label: 'Writing', href: '/en/writing' },
    ],
    top: 'Back to top',
  },
  works: {
    label: 'Selected work',
    title: 'Work',
    lead: 'Projects I have built, grouped by type. Open one to see what I actually did.',
    filterAll: 'All',
    viewLabel: 'View project →',
    empty: 'Nothing here yet. Ship the smallest working version first, then put it up.',
    roleLabel: 'Role',
    yearLabel: 'Year',
    toolsLabel: 'Tools',
    linkLabel: 'Link',
    back: '← All work',
  },
  about: {
    label: 'About',
    title: 'About',
    paragraphs: [
      '[One short paragraph: who you are, what you do, where you are heading. Facts, not adjectives.]',
      '[One more line: why you do this, or what you care about most.]',
    ],
    tags: ['[tag]', '[tag]', '[tag]', '[tag]'],
    nowTitle: 'Now',
    now: [
      { when: '[Autumn 2026]', text: '[What you are learning / building right now]' },
      { when: '[Next]', text: '[What comes after that]' },
    ],
    contactTitle: 'Contact',
    contact: [
      { label: 'Email', value: '[you@example.com]' },
      { label: 'GitHub', value: 'AustinChan168', href: 'https://github.com/AustinChan168' },
    ],
  },
  home: {
    writingTitle: 'Recent writing',
    writingAll: 'All writing →',
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
