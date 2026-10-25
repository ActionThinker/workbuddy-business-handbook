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
  '/book/': {
    title: '正文总纲：怎么用这本书赚到钱 | WorkBuddy 生意手册',
    desc: '三卷 13 章正文入口：读者自测（你现在是 L 几）、按阶梯选章、全书地图。卷一·超级个体 8 章已上线，逐章可照做。',
  },
  '/book/ch1': {
    title: '第1章 认知：WorkBuddy 能力地图 | WorkBuddy 生意手册',
    desc: '七件套能力积木（Skill/Expert/连接器/Buddy 应用/模板工作流/Explore/硬件）+ 买方四层 + 机会画布模板——赚钱的第一步是认清能力。',
  },
  '/book/ch2': {
    title: '第2章 L0 自用觉醒：先让自己提效 | WorkBuddy 生意手册',
    desc: '自己先用好是赚钱的地基：三类高频痛点场景、第一步清单、个人提效清单模板，零成本零资质起步。',
  },
  '/book/ch3': {
    title: '第3章 L1 资产沉淀：把岗位经验变原料 | WorkBuddy 生意手册',
    desc: '什么经验值得沉淀（高频/有方法/可复用三标准）、四种资产形态、知识资产提取清单模板。',
  },
  '/book/ch4': {
    title: '第4章 L2 资产变现：开放平台上架 | WorkBuddy 生意手册',
    desc: '官方「收入变现」已上线：个人可上架付费技能/专家。六步上架流程、开源引流+付费分层策略、定价参考、资产包结构模板。',
  },
  '/book/ch5': {
    title: '第5章 专家孵化：把自己变成可被召唤的专家 | WorkBuddy 生意手册',
    desc: 'Expert 专家智能体=超级个体最高杠杆：三步封装（边界/知识结构/对话口径）、三重收入叠加、专家人设卡模板。',
  },
  '/book/ch6': {
    title: '第6章 L3 内容+陪跑：带人赚钱 | WorkBuddy 生意手册',
    desc: '零成本路径：实战记录型账号定位、周更选题法、官方邀请计划（Credits 积分）、免费带3人→收费小班闭环、内容日历模板。',
  },
  '/book/ch7': {
    title: '第7章 L4 培训+咨询：考证背书后放大 | WorkBuddy 生意手册',
    desc: '腾讯官方认证四部曲（OPC/CEA/CCB/FDE）、AI 办公课五模块骨架、企业内训 SOP、报价三要素、培训报价单模板。',
  },
  '/book/ch8': {
    title: '第8章 合规安心：个人视角的三条底线 | WorkBuddy 生意手册',
    desc: '身份边界（非官方声明）、数据与保密、合同先行——三条底线 + 标准服务合同/保密条款/报价单要点模板。',
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
const authorLd = {
  '@type': 'Person',
  '@id': `${SITE}/#author`,
  name: '陈露',
  alternateName: 'Action Thinker',
  url: 'https://www.actionthinker.com/',
  description: '《WorkBuddy 生意手册》作者与开源计划发起人。',
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
    const key = !route || route === 'index'
      ? '/'
      : route.endsWith('/index')
        ? `/${route.slice(0, -6)}/`
        : `/${route}`
    const meta = PAGES[key]
    if (!meta) return []
    const url = SITE + key
    const graph: Record<string, unknown>[] = []
    if (key === '/') graph.push(websiteLd, orgLd, authorLd)
    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.desc,
        isPartOf: { '@id': `${SITE}/#website` },
        author: { '@id': `${SITE}/#author` },
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
      { text: '手册正文', link: '/book/' },
      { text: '章节模块', link: '/modules' },
      { text: '社区', link: '/community' },
      { text: '社区共建', link: '/contribute' },
      { text: '关于', link: '/about' },
    ],
    sidebar: {
      '/book/': [
        { text: '正文总纲（必读）', link: '/book/' },
        {
          text: '卷一 · 超级个体（L0–L4）',
          collapsed: false,
          items: [
            { text: '第1章 认知：能力地图 ★', link: '/book/ch1' },
            { text: '第2章 L0 自用觉醒 ★', link: '/book/ch2' },
            { text: '第3章 L1 资产沉淀 ★', link: '/book/ch3' },
            { text: '第4章 L2 资产变现 ★', link: '/book/ch4' },
            { text: '第5章 专家孵化 ★', link: '/book/ch5' },
            { text: '第6章 L3 内容+陪跑 ★', link: '/book/ch6' },
            { text: '第7章 L4 培训+咨询 ★', link: '/book/ch7' },
            { text: '第8章 合规安心 ★', link: '/book/ch8' },
          ],
        },
        {
          text: '卷二 · 超级团队（L4–L5）',
          collapsed: true,
          items: [
            { text: '第9章 从个体到团队（即将发布）' },
            { text: '第10章 渠道伙伴（即将发布）' },
            { text: '第11章 区域服务商（即将发布）' },
          ],
        },
        {
          text: '卷三 · 超级组织（L5–L6）',
          collapsed: true,
          items: [
            { text: '第12章 生态价值供应链（即将发布）' },
            { text: '第13章 组织落地（即将发布）' },
          ],
        },
      ],
    },
    footer: {
      message: '本站内容受版权保护，未经授权禁止抓取、复制或用于模型训练',
      copyright:
        '社区共创版 · 非 WorkBuddy 官方文档 · 运营方：WorkBuddyLink · 作者/发起人：<a href="https://www.actionthinker.com/" target="_blank" rel="noopener">陈露 @ ActionThinker</a>',
    },
    outline: { level: [2, 3], label: '本页目录' },
    lastUpdated: { text: '最近更新' },
  },
})
