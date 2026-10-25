import { defineConfig, type HeadConfig } from 'vitepress'

// 站点指纹（反克隆溯源水印，勿改）
const SITE_FP = 'whb-20261024-7f3a9c'
const SITE = 'https://handbook.workbuddylink.com'

// 每页标题/描述（OG + JSON-LD + canonical 共用）
const PAGES: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'WorkBuddy 生意手册：用 WorkBuddy 赚钱，从超级个体开始',
    desc: '免费开源实战手册与入口站：7 级赚钱阶梯 L0–L6、5 条路径指南与 7 天启动包、三卷 How-to——没公司、没资质，也能借 WorkBuddy 生态起步。社区共创版，非官方文档。',
  },
  '/ladder': {
    title: '赚钱阶梯：L0–L6 七级体系 | WorkBuddy 生意手册',
    desc: '9 种赚钱模式 + 11 种可卖落脚点 + 七级成长阶梯：L0–L3 零公司零资质今天就能动手，L4 考证增加个人背书，L5 渠道伙伴，L6 生态供应链。',
  },
  '/guide': {
    title: '路径指南：没公司也能开始的 5 条路 | WorkBuddy 生意手册',
    desc: '资产上架 / 内容推荐 / 考证培训 / 渠道接单 / 专家陪跑，5 条路径全部映射 WorkBuddy 真实生态机制，附 7 天启动包与常见问题。',
  },
  '/modules': {
    title: '章节模块：三卷 How-to | WorkBuddy 生意手册',
    desc: '超级个体 → 超级团队 → 超级组织，三卷 How-to 与官方成长定义对齐，按阶段取用。',
  },
  '/community': {
    title: '社区：再小的个体，都能参与 AI 这门生意 | WorkBuddy 生意手册',
    desc: '免费加入：认知刷新、路径资源参考、经验沉淀、交朋友、创建 AI 资产、获客变现、影响力。社区五原则：实用、利他、共享、协同、共建。',
  },
  '/contribute': {
    title: '社区共建：提交线索、推荐资源、百人共创 | WorkBuddy 生意手册',
    desc: '提交赚钱线索与案例（被采纳标注署名）、推荐资源站与学习站、参与「百人共创」——与 100 个超级个体联合创作进阶版生意手册。',
  },
  '/about': {
    title: '关于：缘起、定位与开源许可 | WorkBuddy 生意手册',
    desc: '为什么做这份手册（黄金圈）：一个朴素问题到群体需求的缘起、站点定位声明、非官方声明、CC BY-NC 4.0 开源与许可。',
  },
  '/assets': {
    title: '资产模板库 | WorkBuddy 生意手册',
    desc: '报价单、合同、话术、检查表——做 WorkBuddy 小生意用得上的模板清单。',
  },
}

// 结构数据基础节点
const orgLd = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: 'WorkBuddyLink',
  url: 'https://workbuddylink.com/',
  sameAs: ['https://workbuddylink.com', 'https://nexfde.com'],
  description: 'WorkBuddy 生态服务伙伴，依托官方产品能力提供落地服务；本手册为其运营的社区共创项目。',
}
const websiteLd = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'WorkBuddy 生意手册',
  url: `${SITE}/`,
  inLanguage: 'zh-CN',
  publisher: { '@id': `${SITE}/#org` },
}
// 路径指南页 FAQ 结构数据
const faqLd = {
  '@type': 'FAQPage',
  '@id': `${SITE}/guide#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: '多久能赚到第一笔？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '接单/内容最快 1–2 周（小单）；资产上架/培训 2–4 周；渠道伙伴需先跑通 1 个试点。',
      },
    },
    {
      '@type': 'Question',
      name: '会被封号或违规吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不碰「官方代理/认证」的虚假承诺、不刷量、遵守平台协议即可。定位清晰：陪跑/咨询/资产，不做未授权的官方背书。',
      },
    },
    {
      '@type': 'Question',
      name: '和官方是什么关系？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本手册是社区共创版，非 WorkBuddy 官方文档。想做正规伙伴走 WorkBuddyLink 渠道伙伴；想上架资产走开放平台。两者都不要求先有公司。',
      },
    },
  ],
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'WorkBuddy 生意手册',
  description: '用 WorkBuddy 赚钱，从超级个体开始——免费开源手册：7 级赚钱阶梯 · 三卷 How-to · 零公司可起步（社区共创版，非官方文档）',
  cleanUrls: true,
  srcDir: 'src',
  appearance: 'dark', // 暗色主题（DEV_BRIEF Design Token）
  sitemap: {
    hostname: SITE,
    transformItems(items: { url: string; lastmod?: string }[]) {
      // 两张静态可视化大图不在 md 路由图内，手动补进 sitemap
      items.push({ url: '/ladder-map.html' }, { url: '/path-map.html' })
      return items
    },
  },
  head: [
    ['meta', { name: 'robots', content: 'noai,noimageai' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
  ],
  transformHead(ctx: { page: string }): HeadConfig[] {
    // 每页注入 canonical + OG/Twitter + JSON-LD（WebPage/Breadcrumb，首页加 WebSite+Org，路径指南加 FAQPage）
    const route = (ctx.page || '').replace(/\\/g, '/').replace(/\.md$/, '')
    const key = !route || route === 'index' ? '/' : `/${route}`
    const meta = PAGES[key]
    if (!meta) return []
    const url = SITE + key
    const graph: Record<string, unknown>[] = []
    if (key === '/') graph.push(websiteLd, orgLd)
    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.desc,
        isPartOf: { '@id': `${SITE}/#website` },
        inLanguage: 'zh-CN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE}/` },
          ...(key === '/'
            ? []
            : [{ '@type': 'ListItem', position: 2, name: meta.title.split('|')[0].trim(), item: url }]),
        ],
      },
    )
    if (key === '/guide') graph.push(faqLd)
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: meta.title }],
      ['meta', { property: 'og:description', content: meta.desc }],
      ['meta', { property: 'og:type', content: key === '/' ? 'website' : 'article' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:site_name', content: 'WorkBuddy 生意手册' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:image', content: `${SITE}/og.png` }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: meta.title }],
      ['meta', { name: 'twitter:description', content: meta.desc }],
      ['meta', { name: 'twitter:image', content: `${SITE}/og.png` }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })],
    ]
  },
  transformHtml(code) {
    // 全页指纹水印
    return code.replace('<html', `<html data-fp="${SITE_FP}"`)
  },
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '赚钱阶梯', link: '/ladder' },
      { text: '路径指南', link: '/guide' },
      { text: '章节模块', link: '/modules' },
      { text: '社区', link: '/community' },
      { text: '社区共建', link: '/contribute' },
      { text: '关于', link: '/about' },
    ],
    footer: {
      message: '本站内容受版权保护，未经授权禁止抓取、复制或用于模型训练',
      copyright: '社区共创版 · 非 WorkBuddy 官方文档 · 运营方：WorkBuddyLink',
    },
    outline: { level: [2, 3], label: '本页目录' },
    lastUpdated: { text: '最近更新' },
  },
})
