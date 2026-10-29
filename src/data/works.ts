/**
 * ============================================================================
 *  作品数据。首页的作品网格、作品详情页都从这里读。
 * ============================================================================
 *
 *  怎么用：
 *  1. 复制一个对象，改 slug（URL 用，英文小写带连字符）、year、category、tools；
 *  2. 中英两份文案都要写，title / summary 会显示在卡片上，body 是详情页正文；
 *  3. cover 有图就填图片路径（放到 public/ 下，例如 '/works/xxx.jpg'），
 *     不填就用 CSS 生成的色块封面（不会显得空）。
 *
 *  方括号里的都是占位符，直接替换成你自己的内容。没有的项目就整段删掉。
 */

import type { Locale } from '../lib/posts';

/** 作品分类。想加分类就在这里加一条，首页筛选条会自动跟着变 */
export const workCategories = [
  { key: 'ai', zh: 'AI 应用', en: 'AI' },
  { key: 'embedded', zh: '硬件 / 嵌入式', en: 'Hardware' },
  { key: 'web', zh: '网站 / 工具', en: 'Web' },
] as const;

export type WorkCategory = (typeof workCategories)[number]['key'];

export interface WorkText {
  /** 项目名 */
  title: string;
  /** 一句话说明：做了什么、给谁用、结果如何。卡片上就显示这一行 */
  summary: string;
  /** 你的角色，例如「独立完成」「嵌入式 + 结构」 */
  role: string;
  /** 详情页正文，一段一个字符串 */
  body: string[];
}

export interface WorkMedia {
  /** image = 图片，video = 视频（视频会带原生播放器） */
  type: 'image' | 'video';
  /** 文件路径，放 public/ 下，例如 '/works/demo/screen.jpg' 或 '/works/demo/clip.mp4' */
  src: string;
  /** 视频封面，只在 type: 'video' 时用 */
  poster?: string;
  /** 图注，可写可不写 */
  label?: string;
}

export interface Work {
  /** URL 用，英文小写 + 连字符，中英两版共用 */
  slug: string;
  /** 年份，显示在卡片和详情页 */
  year: string;
  category: WorkCategory;
  /** 外部链接（GitHub 仓库 / 线上地址 / 视频），没有就删掉这一行 */
  link?: string;
  /** 卡片封面色。不填走默认墨绿 */
  accent?: string;
  /** 封面图，放 public/ 下，例如 '/works/demo.jpg'。不填就用色块封面 */
  cover?: string;
  /**
   * 详情页的素材展示。图片点开可放大，视频带播放器。
   * 例：media: [{ type: 'image', src: '/works/demo/1.jpg', label: '主界面' },
   *            { type: 'video', src: '/works/demo/clip.mp4', poster: '/works/demo/cover.jpg' }]
   */
  media?: WorkMedia[];
  tools: string[];
  text: Record<Locale, WorkText>;
}

export const works: Work[] = [
  {
    slug: 'project-one',
    year: '2026',
    category: 'ai',
    accent: '#4f5d43',
    tools: ['[工具]', '[语言]'],
    text: {
      zh: {
        title: '[项目名称]',
        summary: '[一句话说明：做了什么、给谁用、结果如何]',
        role: '[你的角色]',
        body: [
          '[背景：为什么做这个项目，原来有什么问题]',
          '[做法：你负责哪部分，用了什么技术，关键决策是什么]',
          '[结果：上线情况、数据、或者你从中学到了什么]',
        ],
      },
      en: {
        title: '[Project name]',
        summary: '[One line: what it does, who it is for, what happened]',
        role: '[Your role]',
        body: [
          '[Context: why this project existed, what was broken before]',
          '[Approach: what you built, the stack, the key decisions]',
          '[Outcome: shipped status, numbers, or what you learned]',
        ],
      },
    },
  },
  {
    slug: 'project-two',
    year: '2026',
    category: 'embedded',
    accent: '#a8762a',
    tools: ['[单片机]', '[外设]'],
    text: {
      zh: {
        title: '[项目名称]',
        summary: '[一句话说明：做了什么、给谁用、结果如何]',
        role: '[你的角色]',
        body: [
          '[背景：为什么做这个项目]',
          '[做法：硬件选型、通信协议、遇到的问题和怎么解的]',
          '[结果：能跑起来的功能、指标、复盘]',
        ],
      },
      en: {
        title: '[Project name]',
        summary: '[One line: what it does, who it is for, what happened]',
        role: '[Your role]',
        body: [
          '[Context: why this project existed]',
          '[Approach: hardware choices, protocols, problems and fixes]',
          '[Outcome: what works, metrics, retrospective]',
        ],
      },
    },
  },
  {
    slug: 'project-three',
    year: '2025',
    category: 'web',
    accent: '#92cfff',
    tools: ['[框架]'],
    text: {
      zh: {
        title: '[项目名称]',
        summary: '[一句话说明：做了什么、给谁用、结果如何]',
        role: '[你的角色]',
        body: [
          '[背景：为什么做这个项目]',
          '[做法：技术选型、你写的部分]',
          '[结果：访问量 / 用户反馈 / 学到的东西]',
        ],
      },
      en: {
        title: '[Project name]',
        summary: '[One line: what it does, who it is for, what happened]',
        role: '[Your role]',
        body: [
          '[Context: why this project existed]',
          '[Approach: stack choices, what you wrote]',
          '[Outcome: traffic, feedback, lessons]',
        ],
      },
    },
  },
];

/** 卡片封面：优先用 cover，没填 cover 就取 media 里第一张图片 */
export function coverOf(work: Work): string | undefined {
  return work.cover ?? work.media?.find((m) => m.type === 'image')?.src;
}

export function categoryLabel(key: WorkCategory, locale: Locale): string {
  const found = workCategories.find((c) => c.key === key);
  return found ? found[locale] : key;
}

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
