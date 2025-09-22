# Vite

## 使用简介

1. 基本命令：`dev build preview`
2. 配置文件：`vite.config.ts`
- `server.port`：指定端口
- `server.proxy`：接口代理解决跨域
- `resolve.alias`：路径别名
- `build.outDir`：构建产物目录
- `plugins`：接入 Vue/React/自定义插件
3. 资源处理
- 静态资源（图片、CSS、字体等）可直接 import
- 小文件会自动转为 base64 内联，大文件拷贝到 dist 并生成带 hash 的 URL
- CSS/预处理器（Sass、Less）默认支持，PostCSS 可配置
4. 环境变量
`import.meta.env.XXX`


## 原理简述

1. 开发阶段

- 利用 浏览器原生 ESM，按需加载源码。
- esbuild 用于 预打包依赖 和 源码转译（TS/JSX），速度极快。
- 遇到文件请求时，Vite 才进行转换和返回。
- HMR：通过 WebSocket 通知浏览器更新模块，基于模块依赖图（module graph）做精确更新。

2. 生产构建

- 使用 Rollup 进行完整打包：代码分割、tree-shaking、产物优化。
- 支持 CSS 抽离、静态资源 hash 命名、长效缓存优化。
- 生产环境不使用 esbuild 直接打包，因为 Rollup 插件生态更成熟，产物更可控。

## Vite vs Webpack

| 对比项      | **Vite**                   | **Webpack**             |
| -------- | -------------------------- | ----------------------- |
| **启动速度** | 不打包，基于 ESM 按需编译，冷启动快       | 需要全量打包，启动慢              |
| **HMR**  | 基于模块图，局部替换，秒级更新            | 基于 bundle diff，可能慢、状态丢失 |
| **依赖处理** | esbuild 预打包，CJS 转 ESM，减少请求 | 统一打包到 bundle 中          |
| **构建工具** | 开发用 esbuild，生产用 Rollup     | 开发和生产都用 webpack 自身      |
| **生态**   | 新兴，插件数量逐渐丰富                | 生态成熟，插件/loader 丰富       |
| **适用场景** | 现代前端框架（Vue3、React）、开发体验优先  | 复杂工程、大型项目、老旧兼容性更强       |
