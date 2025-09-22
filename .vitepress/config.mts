import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  
  title: "Sink12138-NOTES",
  titleTemplate: "Sink12138-NOTES",
  description: "Notes for JavaScript, TypeScript, React, etc.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'React', link: '/react/problem'}
    ],

    outline: {
      label: '目录',
    },

    sidebar: [
      {
        text: 'React',
        collapsed: true,
        items: [
          { text: 'Articles', link: '/react/articles' },
          { text: 'Problem', link: '/react/problem' },
          { text: 'Summary', link: '/react/summary' }
        ]
      },
      {
        text: 'Bundler',
        collapsed: true,
        items: [
          { text: 'Rollup', link: '/bundler/rollup' },
          { text: 'Webpack', link: '/bundler/webpack' },
          { text: 'Vite', link: '/bundler/vite' },
          { text: 'Gulp', link: '/bundler/gulp' },
        ]
      },
      {
        text: 'JavaScript',
        collapsed: true,
        items: [
          { text: '类型系统', link: '/javascript/types' },
          { text: '模块系统', link: '/javascript/modules' },
          { text: '异步编程', link: '/javascript/async' },
          { text: '上下文', link: '/javascript/this' },
          { text: '手撕代码', link: '/javascript/hand-coding' }
        ]
      },
      {
        text: 'TypeScript',
        collapsed: true,
        items: [
          { text: '类型系统', link: '/typescript/types' },
          { text: '类型推断', link: '/typescript/inference'}
        ]
      },
      {
        text: 'Engineering',
        collapsed: true,
        items: [
          { text: 'CI/CD', link: '/engineering/cicd' },
          { text: 'Monorepo', link: '/engineering/monorepo' },
          { text: 'Git', link: '/engineering/git-cheatsheet' },
          { text: 'Cross', link: '/engineering/cross-platform' },
        ]
      },
      {
        text: 'Network',
        collapsed: true,
        items: [
          { text: '浏览器', link: '/network/browser' },
          { text: '网络模型', link: '/network/osi' },
          { text: '网络协议', link: '/network/protocol' },
          { text: '网络安全', link: '/network/security' },
        ]
      },
      {
        text: 'AI',
        collapsed: true,
        items: [
          { text: 'ML', link: '/ai/ml' },
          { text: 'DL', link: '/ai/dl' },
          { text: 'LLM', link: '/ai/llm' },
          { text: 'RAG', link: '/ai/rag' },
          { text: 'Agent', link: '/ai/agent' },
        ]
      },
      {
        text: 'Roadmap',
        link: '/roadmap/index'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sink12138/sink12138-blog' }
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2025-present Sink12138'
    },
  }
})
