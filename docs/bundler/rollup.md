# Rollup

## **使用简介**

**模块打包器 - 类库项目构建 - 输出干净代码 - JS/TS**

- external: 排除所有基于node_modules的依赖 -> 读 package.json 的 Dependencies

- input: 打包入口文件 gulp 先构建 ES 再通过产物构建 CJS 和 UMD (只做格式转换避免重复编译)

- output: preserveModules 保持原有目录结构方便按需导入和 Tree-shaking; 数量多 Http 请求复杂

- plugins:

	1. clear(): 清理目录
	2. json(): 处理 JSON 导入
	3. image(): 处理图片导入
	4. babel(): 转译代码，使用 runtime 提取辅助函数; extensions: ['.ts','.tsx','.js','.jsx']
	5. styles(): 处理样式
	6. commonjs(): transformMixedEsModules 处理混合的 ES 和 CJS 转换成 ES

## **原理简述**

### **构建阶段**

1. 构建模块图: Bundle() -> fetchModule -> ModuleLoader 递归解析依赖 -> 创建 Module 实例 -> 调用 Rust 编写的原生解析器，解析为 AST -> 遍历 AST 节点初始化 -> 收集 import export 信息 -> 依赖解析为 Module 实例 -> 建立依赖关系图

2. Tree Shaking: 调用 ASTNode 的 hasEffects 方法判断副作用 -> 标记使用的语句，移除未使用的代码

3. 执行顺序排序: 根据依赖关系确定执行顺序 -> 分配 execIndex

### **生成阶段**

1. 代码分块: Chunking 静态依赖分析 -> 动态导入处理 -> 手动分块 -> 优化合并减小chunk

2. 代码渲染: 将 AST 转换回 JS -> 格式 Finaliser (ES, CJS, UMD, etc)

3. 资源处理: 调用插件钩子处理各类型资源 image, json, etc

4. 文件生成: 文件名 hash sourcemap 生成