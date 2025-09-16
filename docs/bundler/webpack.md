# Webpack

## Loader

## Plugin

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