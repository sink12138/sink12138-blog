# React 常见问题

## 组件设计

| 问题 | 说明 | 最佳实践 |
|--|--|--|
| 组件职责过多 | 单个组件承担太多逻辑，难以维护 | 遵循“单一职责”，拆分为多个可复用组件 |
| Props 传递层级太深 | 多层传递使代码臃肿且不易维护 | 使用 [React Context](https://react.dev/reference/react/Context) 或 [Redux](https://redux.js.org/) 管理全局状态 |
| key 使用不当 | key 不唯一或使用 index 作为 key 可能导致渲染异常 | 使用稳定且唯一的标识作为 key（如数据库 id） |

- React 使用虚拟 DOM 计算出最小改动，再一次性更新，避免大量重排重绘
- 组件状态改变 (state/props/父组件rerender) 将生成新的虚拟 DOM 树
- Diff 更新：1.不同类型节点直接销毁重建 2.同层比较 3.使用唯一key识别节点

## 性能渲染

| 问题 | 说明 | 最佳实践 |
|--|--|--|
| 不必要的重复渲染 | 父组件状态改变导致子组件频繁重渲染 | 使用 `React.memo`、`useMemo`、`useCallback` 缓存计算结果和函数 |
| 频繁 setState | 多次连续调用导致多次渲染 | 合并状态更新，或在 `setState(prev => …)` 中更新 |
| 长列表卡顿 | 列表元素过多导致 DOM 渲染性能差 | 使用 [react-window](https://github.com/bvaughn/react-window) 或 [react-virtualized](https://github.com/bvaughn/react-virtualized) 实现虚拟滚动 |


## Hooks

| 问题 | 说明 | 最佳实践 |
|--|--|--|
| useEffect 忘记清理 | 会造成内存泄漏或重复订阅 | 在 `useEffect` 中 return 清理函数 |
| 依赖数组缺失或错误 | 造成闭包陷阱或无限循环 | 使用 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 自动检测 |
| 在条件或循环中调用 Hooks | 违反规则，导致执行顺序错乱 | 只在组件顶层调用 Hooks |

- React 组件卸载会销毁 DOM，但不会自动清理副作用；副作用函数因为持有作用域内的闭包，阻止了垃圾回收
- Effect 内部捕获闭包，没有依赖数组的话，并不会更新值
- 渲染 -> 触发 effect -> state 改变 -> 渲染 : 无限循环
- Hooks 使用闭包记住状态更新函数等
- React 会为每个函数组件维护`Hook state`数组，每次渲染按照调用顺序匹配之前状态

## 构建部署

| 问题 | 说明 | 最佳实践 |
|--|--|--|
| 打包体积过大 | 导致首屏加载慢 | 使用 `React.lazy` 和 `React.Suspense` 进行代码分割，使用 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 分析体积 |
| 环境变量泄露 | 生产密钥暴露在前端代码中 | 使用 `.env` 管理环境变量，避免将敏感信息打包进前端 |
| 构建产物不稳定 | 不同环境结果不一致 | 锁定依赖版本（`package-lock.json` 或 `yarn.lock`）并使用 CI/CD 流程 |
