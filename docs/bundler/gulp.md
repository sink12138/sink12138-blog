# Gulp

## 使用简介

1. 基本命令
  * `gulp`：执行默认任务 `default`
  * `gulp watch`：监听文件变化执行任务
  * `gulp build`：自定义构建任务（根据配置定义）
---

2. 配置文件

* Gulp 的配置文件是 **`gulpfile.js` / `gulpfile.ts`**。
* 核心是**定义任务（task）**：

```js
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');

function cssTask() {
  return src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('dist/css'));
}

function jsTask() {
  return src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

exports.default = series(cssTask, jsTask);
```

* 支持 `series`（串行）、`parallel`（并行）任务组合。

---

3. 资源处理

* **CSS / Sass / Less**：通过插件转换、压缩。
* **JS**：通过插件压缩、合并、ES6 转 ES5（Babel）。
* **图片**：压缩、拷贝到输出目录。
* **静态资源**：`src('path') → pipe(plugin) → dest('dist')` 的流式处理。
* 核心特点是**基于流（stream）处理文件**，减少中间磁盘 I/O，提高效率。

4. 环境变量

* Gulp 本身没有内置 `.env` 支持，需要结合 `dotenv`：

```js
require('dotenv').config();
console.log(process.env.NODE_ENV);
```

* 可以根据环境变量控制任务行为，如生产压缩、开发不压缩。

---

## 原理简述

### 1. 任务运行器
* 核心机制：

  * **文件流（stream）**：`src().pipe(plugin).pipe(dest())`。
  * **任务组合**：`series` 串行，`parallel` 并行。
  * **监听文件**：`watch()`，文件变动触发任务。
* 典型用途：开发阶段自动编译 Sass、JS 压缩、图片优化、刷新浏览器（配合 `browser-sync`）。

### 2. 组合插件完成构建

  * JS 压缩/合并
  * CSS 编译/压缩
  * 图片压缩
  * 资源复制和 hash
* 依赖插件实现各种功能，没有内置打包或模块解析机制（不像 Webpack 或 Vite）。

