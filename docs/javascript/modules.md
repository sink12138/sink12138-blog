# JavaScript 模块系统

## 概述

JavaScript 的模块系统。

|	| ES Modules | Common JS
| --- | --- | --- | 
加载时  |	静态加载，编译时确定依赖 |	动态加载，运行时确定依赖
同步/异步 |	异步加载 |	同步加载
特性	| Tree Shaking，代码分割 |	需要工具支持
动态导入 |	import() |	require()
导出机制 |	引用绑定，状态同步 |	值拷贝（快照），不同步

## CommonJS

### 导入导出
```js
// ⚠️ 导入 CommonJS 是值的拷贝
const module = require('./module');
module.exports = { foo: 'foo' };
```
### 模块解析
`Node.js` 会自动尝试这些后缀
`require('./module')` 会依次尝试：
1. 内置模块 `require('http')`
2. "./" 或 "../" 开头:
- 父模块确定绝对路径
- 尝试后缀: `module.js` -> `module.json` -> `module.node`
- 当成目录: `X/package.json` -> `X/index.js` -> `X/index.json` -> `X/index.node`
3. 不带路径依次查找安装目录:
- `/home/user/p/node_modules`
- `/home/user/node_modules`
- `/home/node_modules`
- `node_modules`
4. 抛出 `not found`

### 主要环境
`Node.js` `Webpack` `Rollup` `Parcel`
1. 动态require
2. 同步加载
3. 循环依赖处理
4. 运行时加载

## ES Modules

### 导入导出
```js
// ⚠️ 导入 ESModule 是值的引用
import module from './module';
export const foo = 'foo';
```
### 模块解析

ESM 需要明确的后缀

```js
import './module.js'     // ✅ 明确
import './module'        // ❌ 不明确，可能报错，需要构建工具处理
```

1. 浏览器原生ESM无法猜测类型 Node.js为了兼容也需要
2. ESM编译静态分析需要确定
3. 防止恶意重定向

### 主要环境
`Node 12+` `现代浏览器`
1. 静态分析
2. 异步加载
3. Tree-shaking
4. 编译优化

## UMD

### 导入导出
```js
// 导入 UMD - 通常通过全局变量访问
// Browser: window.ModuleName
// 导出 UMD - 运行时环境检测
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ModuleName = factory());
}(this, function () {
  return { foo: 'bar' };
}));
```

### 模块解析

```js
(function (global, factory) {
  // 第一步：检测 CommonJS 环境
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // Node.js 环境
    module.exports = factory();
  }
  // 第二步：检测 AMD 环境
  else if (typeof define === 'function' && define.amd) {
    // RequireJS 环境
    define(factory);
  }
  // 第三步：默认浏览器全局环境
  else {
    // 浏览器环境，挂载到全局对象
    (global = global || self, global.ModuleName = factory());
  }
}(this, function () {
  // 实际的模块代码
  return { /* 模块内容 */ };
}));
```

### 主要环境
`CDN分发` `兼容旧环境`
1. 通用兼容
2. 运行时检测
3. 文件较大

## Package.json

```json
{
  "main": "dist/index.cjs.js",        // CommonJS 入口
  "module": "dist/index.js",          // ES Module 入口
  "unpkg": "dist/index.umd.js",       // UMD 入口 (CDN)
  "types": "dist/index.d.ts",         // TypeScript 类型
}
```

## 总结

现代 JavaScript 开发中，ES6 模块已经成为标准，配合各种打包工具可以实现高效的模块化开发。选择合适的模块化方案和工具对于项目的可维护性和性能至关重要。
