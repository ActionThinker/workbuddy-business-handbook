import { defineConfig } from 'vitepress'

// 站点指纹（反克隆溯源水印，勿改）
const SITE_FP = 'whb-20261024-7f3a9c'

export default defineConfig({
  lang: 'zh-CN',
  title: 'WorkBuddy 生意手册',
  description: '用 WorkBuddy 赚钱，从超级个体开始——免费开源手册：7 级赚钱阶梯 · 三卷 How-to · 零公司可起步（社区共创版，非官方文档）',
  cleanUrls: true,
  srcDir: 'src',
  appearance: 'dark', // 暗色主题（DEV_BRIEF Design Token）
  sitemap: { hostname: 'https://handbook.workbuddylink.com' },
  head: [
    ['meta', { name: 'robots', content: 'noai,noimageai' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
  ],
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
      { text: '付费专区', link: '/paid' },
      { text: '人才池', link: '/talent' },
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
