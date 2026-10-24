/**
 * ============================================================================
 *  这是全站唯一的内容文件。改文案只需要动这里，不用碰任何样式代码。
 * ============================================================================
 *
 *  现在里面全是空模板，方括号 [ ] 的地方都由你自己填。
 *  规则很简单：
 *    - zh = 中文版，en = 英文版，两份一一对应。
 *    - 看到 [ ] 就替换成你自己的内容，同时把方括号删掉。
 *    - 某个板块不想要？在 profile.ts 里删掉对应数组中的元素即可；
 *      整个板块都想删，就把 src/components/PageBody.astro 里对应的 <section> 删掉。
 *    - 数组项可以随便加、随便删、随便调顺序。
 *    - 改完保存，`npm run dev` 会热更新。`npm run build` 生成正式站点。
 *
 *  状态标记（status）有四种：
 *    done    已完成
 *    doing   进行中
 *    todo    待开始
 *    blocked 受阻
 *
 *  以后想加博客？
 *    在 src/pages/ 下新建 writing/index.astro 即可，Astro 原生支持 Markdown，
 *    这个数据文件仍然只负责「自我介绍」部分。
 *
 *  联系方式里 href 留空字符串的链接会自动显示为「待补充」，不会失效。
 */

export type Locale = 'zh' | 'en';

/** 任务状态：已完成 / 进行中 / 待开始 / 受阻 */
export type Status = 'done' | 'doing' | 'todo' | 'blocked';

export interface SourceLink {
  label: string;
  href: string;
  note?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface RoadmapStep {
  title: string;
  detail: string;
  status: Status;
}

export interface Value {
  title: string;
  body: string;
}

export interface Horizon {
  tag: string;
  title: string;
  body: string;
  note?: string;
}

export interface Profile {
  htmlLang: string;
  title: string;
  description: string;
  hero: {
    label: string;
    name: string;
    latin: string;
    lead: string;
    meta: string[];
    status: string;
  };
  nav: { labels: Record<string, string>; top: string };
  sections: {
    now: { id: string; title: string; lead: string; facts: Fact[] };
    origin: { id: string; title: string; paragraphs: string[] };
    direction: { id: string; title: string; lead: string; horizons: Horizon[] };
    roadmap: { id: string; title: string; lead: string; steps: RoadmapStep[]; rule: string };
    values: { id: string; title: string; lead: string; items: Value[] };
    off: { id: string; title: string; lead: string; items: Value[] };
    current: { id: string; title: string; lead: string; steps: RoadmapStep[] };
    contact: { id: string; title: string; lead: string; links: SourceLink[] };
  };
  ui: {
    langLabel: string;
    langSwitchTo: string;
    langSwitchHref: string;
    lastUpdated: string;
    footerNote: string;
    statusLabels: Record<Status, string>;
    pending: string;
  };
}

const statusZh: Record<Status, string> = {
  done: '已完成',
  doing: '进行中',
  todo: '待开始',
  blocked: '受阻',
};

const statusEn: Record<Status, string> = {
  done: 'Done',
  doing: 'In progress',
  todo: 'Not started',
  blocked: 'Blocked',
};

/* ========================================================================== */
/*                                  中文版                                    */
/* ========================================================================== */

const zh: Profile = {
  htmlLang: 'zh-CN',
  // 浏览器标签页标题
  title: '[你的名字] · Who am I',
  // 一句话简介。会显示在 Google 搜索结果、微信 / Slack 分享卡片里，别空着上线
  description: '[一句话简介：你是谁，在做什么。]',
  hero: {
    label: 'Who am I / 自我介绍',
    name: '[你的名字]',
    latin: '[英文名，不需要就把这行内容清空]',
    // 全站最显眼的一句话。建议写「你是谁 + 在做什么 + 想去哪」三件事
    lead: '[一句话自我介绍：你是谁，现在在做什么，想走到哪里。这句话是整个页面最重要的一句，值得反复改。]',
    meta: ['[城市 · 省份]', '[学校 / 公司]', '[年级 / 职位]'],
    status: '[现在的状态]',
  },
  nav: {
    labels: {
      now: '现在',
      origin: '起点',
      direction: '方向',
      roadmap: '主线',
      values: '相信什么',
      off: '另一面',
      current: '在做什么',
      contact: '联系',
    },
    top: '回到顶部',
  },
  sections: {
    now: {
      id: 'now',
      title: '现在的身份',
      lead: '[这一段的导语：一句话说明下面这块是什么。]',
      // 一行一条事实。想加行就照着格式往下抄，想删就直接删掉那一整行
      facts: [
        { label: '姓名', value: '[你的名字]' },
        { label: '所在地', value: '[城市 · 省份]' },
        { label: '所属单位', value: '[学校 / 公司 / 组织]' },
        { label: '当前方向', value: '[你正在投入的主线]' },
        { label: '当前目标', value: '[最近一个具体的目标]' },
      ],
    },
    origin: {
      id: 'origin',
      title: '起点',
      // 数组里每一项会渲染成一个段落，数量随意
      paragraphs: [
        '[第一段：你从哪里来。可以是履历，也可以是一件决定性的事。写事实，别写形容词。]',
        '[第二段：为什么走到了现在这个位置。]',
        '[第三段（可选）：这段经历让你决定了什么。不需要就直接删掉这一行。]',
      ],
    },
    direction: {
      id: 'direction',
      title: '我要去哪',
      lead: '[这一段的导语。]',
      // 三张卡片：当下 / 中期 / 长期。tag 是左上角的小标签，note 是卡片底部的补充
      horizons: [
        {
          tag: 'P0 · 当下',
          title: '[最近一步的目标]',
          body: '[具体要做什么、为什么要先做它。写清楚硬门槛是什么。]',
          note: '[限制条件或风险，可选。不需要就删掉这一行。]',
        },
        {
          tag: '中期 · 2~3 年',
          title: '[中期目标]',
          body: '[这一段要走到哪里。]',
          note: '',
        },
        {
          tag: '长期 · 5 年以上',
          title: '[长期想去的位置]',
          body: '[最终想做成什么。]',
          note: '',
        },
      ],
    },
    roadmap: {
      id: 'roadmap',
      title: '主线',
      lead: '[这一段的导语：说明这条路怎么走。]',
      // 按顺序排列的步骤。status 决定左侧圆点颜色和右侧标签：done / doing / todo / blocked
      steps: [
        {
          title: '[阶段一]',
          detail: '[这一步具体学什么、做什么。]',
          status: 'doing',
        },
        {
          title: '[阶段二]',
          detail: '[这一步具体学什么、做什么。]',
          status: 'todo',
        },
        {
          title: '[阶段三]',
          detail: '[这一步具体学什么、做什么。]',
          status: 'todo',
        },
      ],
      rule: '[给自己定的规则。比如：不跳步、不同时开四条线。]',
    },
    values: {
      id: 'values',
      title: '我相信什么',
      lead: '[这一段的导语。]',
      // 数组随意增删。每条 = 一个标题 + 一段话
      items: [
        {
          title: '[信条一]',
          body: '[这条到底是什么意思，举一个你真的会这么做的例子。]',
        },
        {
          title: '[信条二]',
          body: '[解释它。]',
        },
        {
          title: '[信条三]',
          body: '[解释它。]',
        },
      ],
    },
    off: {
      id: 'off',
      title: '另一面',
      lead: '[这一段的导语。]',
      // 技术 / 工作之外的你
      items: [
        { title: '[标签，比如「听觉」]', body: '[具体内容。]' },
        { title: '[标签]', body: '[具体内容。]' },
        { title: '[标签]', body: '[具体内容。]' },
      ],
    },
    current: {
      id: 'current',
      title: '在做什么',
      lead: '[这一段的导语。]',
      // 当前状态清单，status 同样支持四种
      steps: [
        { title: '[正在做的事]', detail: '[现在进行到哪一步。]', status: 'doing' },
        { title: '[准备开始的事]', detail: '[打算怎么做。]', status: 'todo' },
        { title: '[卡住的事]', detail: '[卡在哪，缺什么条件。]', status: 'blocked' },
      ],
    },
    contact: {
      id: 'contact',
      title: '联系',
      lead: '[欢迎别人因为什么事来找你。]',
      // href 留空则显示「待补充」。想加更多联系方式，照格式往数组里加
      links: [
        { label: 'GitHub', href: '', note: '[填你的 GitHub 主页地址]' },
        { label: 'Email', href: '', note: '[填你的邮箱]' },
      ],
    },
  },
  ui: {
    langLabel: 'English',
    langSwitchTo: 'English version',
    langSwitchHref: '/en',
    lastUpdated: '最后更新 · [年月日]',
    footerNote: '[页脚的一句话，比如：这个页面会持续更新。]',
    statusLabels: statusZh,
    pending: '待补充',
  },
};

/* ========================================================================== */
/*                                  English                                   */
/* ========================================================================== */

const en: Profile = {
  htmlLang: 'en',
  title: '[Your Name] · Who am I',
  description: '[One-line intro: who you are and what you are working on.]',
  hero: {
    label: 'Who am I',
    name: '[Your Name]',
    latin: '[Chinese name, or leave empty]',
    lead: '[One-sentence intro: who you are, what you are doing now, where you are trying to go. This is the most prominent sentence on the page — worth rewriting a few times.]',
    meta: ['[City · Country]', '[School / Company]', '[Year / Role]'],
    status: '[Current status]',
  },
  nav: {
    labels: {
      now: 'Now',
      origin: 'Origin',
      direction: 'Direction',
      roadmap: 'The path',
      values: 'Values',
      off: 'Off-keyboard',
      current: 'Currently',
      contact: 'Contact',
    },
    top: 'Back to top',
  },
  sections: {
    now: {
      id: 'now',
      title: 'Who I am, in one block',
      lead: '[Lead-in for this section.]',
      facts: [
        { label: 'Name', value: '[Your name]' },
        { label: 'Based in', value: '[City · Country]' },
        { label: 'Affiliation', value: '[School / Company / Org]' },
        { label: 'Current track', value: '[What you are investing in]' },
        { label: 'Current goal', value: '[Your nearest concrete goal]' },
      ],
    },
    origin: {
      id: 'origin',
      title: 'Origin',
      paragraphs: [
        '[Where you come from. A résumé line, or the one event that decided it. Facts, not adjectives.]',
        '[Why you ended up where you are.]',
        '[Optional: what that made you decide. Delete this line if you don’t need it.]',
      ],
    },
    direction: {
      id: 'direction',
      title: 'Where I am going',
      lead: '[Lead-in for this section.]',
      horizons: [
        {
          tag: 'P0 · Now',
          title: '[The next step]',
          body: '[What exactly you will do, and why it comes first. Name the hard gate.]',
          note: '[Constraint or risk, optional. Delete this line if unused.]',
        },
        {
          tag: 'Mid · 2–3 years',
          title: '[Mid-term goal]',
          body: '[Where this stretch ends.]',
          note: '',
        },
        {
          tag: 'Long · 5+ years',
          title: '[Where you want to end up]',
          body: '[What you ultimately want to build.]',
          note: '',
        },
      ],
    },
    roadmap: {
      id: 'roadmap',
      title: 'The path',
      lead: '[Lead-in: how you intend to walk this path.]',
      steps: [
        { title: '[Stage one]', detail: '[What this stage covers.]', status: 'doing' },
        { title: '[Stage two]', detail: '[What this stage covers.]', status: 'todo' },
        { title: '[Stage three]', detail: '[What this stage covers.]', status: 'todo' },
      ],
      rule: '[A rule you set for yourself, e.g. no skipping steps.]',
    },
    values: {
      id: 'values',
      title: 'What I believe',
      lead: '[Lead-in for this section.]',
      items: [
        { title: '[Principle one]', body: '[What it actually means, with a real example.]' },
        { title: '[Principle two]', body: '[Explain it.]' },
        { title: '[Principle three]', body: '[Explain it.]' },
      ],
    },
    off: {
      id: 'off',
      title: 'Off-keyboard',
      lead: '[Lead-in for this section.]',
      items: [
        { title: '[Label, e.g. Sound]', body: '[Details.]' },
        { title: '[Label]', body: '[Details.]' },
        { title: '[Label]', body: '[Details.]' },
      ],
    },
    current: {
      id: 'current',
      title: 'Currently',
      lead: '[Lead-in for this section.]',
      steps: [
        { title: '[In progress]', detail: '[How far along.]', status: 'doing' },
        { title: '[About to start]', detail: '[How you plan to do it.]', status: 'todo' },
        { title: '[Blocked]', detail: '[What is missing.]', status: 'blocked' },
      ],
    },
    contact: {
      id: 'contact',
      title: 'Contact',
      lead: '[What people should reach out about.]',
      links: [
        { label: 'GitHub', href: '', note: '[your GitHub profile URL]' },
        { label: 'Email', href: '', note: '[your email]' },
      ],
    },
  },
  ui: {
    langLabel: '中文',
    langSwitchTo: 'Chinese version',
    langSwitchHref: '/',
    lastUpdated: 'Last updated · [date]',
    footerNote: '[One closing line, e.g. This page keeps updating.]',
    statusLabels: statusEn,
    pending: 'pending',
  },
};

export const profile: Record<Locale, Profile> = { zh, en };

export function getProfile(locale: Locale): Profile {
  return profile[locale];
}
