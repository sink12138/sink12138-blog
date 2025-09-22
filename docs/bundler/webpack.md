# Webpack

## Loader

### 概念
Loader是webpack的核心概念之一，用于对模块的源代码进行转换。Loader可以将文件从不同的语言（如TypeScript）转换为JavaScript，或将内联图像转换为data URL。

### 特点
- **单一职责**：每个loader只做一件事
- **链式调用**：从右到左（或从下到上）依次执行
- **同步/异步**：支持同步和异步处理
- **可配置**：通过options传递参数

### 常用Loader

- babel-loader: 现代 JS 语法转换 ES6+ -> ES5

- ts-loader: 编译 typescript

- css-loader: 解析 css 文件的 import url

- style-loader: 将 css 以 style 标签形式注入 dom；dev 模式常用，不和mini-css-extra-plugin同时使用

- sass-loader: 编译 sass/scss 预处理器

- file-loader: 复制文件到输出目录并返回 url

-  url-loader: 小文件 base64 大文件 file-loader

- html-loader: 解析 html 文件的图片等资源

- eslint-loader: 编译前代码检查

## Plugin

### 概念
Plugin是webpack的另一个核心概念，用于扩展webpack的功能。Plugin可以在webpack运行到某个时刻的时候，帮我们做一些事情。

### 特点
- **功能强大**：可以监听webpack生命周期事件
- **可配置**：通过构造函数参数进行配置
- **可复用**：可以在多个项目中重复使用
- **可组合**：可以同时使用多个plugin

### 常用Plugin

- HtmlWebpackPlugin: 自动生成 HTML，自动注入打包后的 JS/CSS

- MiniCssExtractPlugin: 从 js 提取 css 文件，并行加载

- CleanWebpackPlugin: 构建前清理输出目录

- DefinePlugin: 定义全局常量，编译时替换代码中变量

- CopyWebpackPlugin: 复制静态资源文件（图片字体等）

- BundleAnalyzerPlugin: 分析打包后的文件大小和依赖关系

- HotModuleReplacementPlugin: 热更新，只能开发环境用

- TerserPlugin: 压缩与混淆 JS

- CssMinimizerPlugin: 压缩 CSS

### Loader vs Plugin

| 特性 | Loader | Plugin |
|------|--------|--------|
| 作用时机 | 模块构建时 | 整个构建过程 |
| 处理对象 | 单个文件 | 整个构建结果 |
| 功能 | 文件转换 | 功能扩展 |
| 使用方式 | 在module.rules中配置 | 在plugins数组中实例化 |
| 执行顺序 | 链式执行 | 通过hooks控制 |

## 编译过程

1. 初始化
	根据配置文件创建 Compiler 读取 mode entry output plugins 等配置

2. 开始编译
	调用 compiler.run() 触发 hooks.run / hooks.compile 创建 Compilation 实例

3. 解析入口
	根据 entry 找到入口文件路径 (resolve.alias 路径等)

4. 构建模块
	-	source
	-	module.rules 执行对应 loader (从下到上)
	- 解析 AST 进行静态依赖分析: import export...
	- 递归执行构建流程 -> 生成模块图

5. 封装 chunk

6. 优化阶段
	- Tree-shaking: ESM sideEffects
	- Terser / UglifyJs
	- Split Chunks -> vendor common

7. 生成代码

8. 计算 hash && 命名

9.  写入文件 emit