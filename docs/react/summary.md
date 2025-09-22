# Summary

## Zero

`0` 在 JS 中是 `falsy`, `&&` 运算符短路解析为`0`

```jsx
<div>
	<!-- 将渲染出 0 ❌ -->
	{items.length && <List items={items} />}
</div>

<div>
	<!-- 需要进行明确的布尔转换 ✅ -->
	{items.length > 0 && <List items={items} />}
</div>
```

| 运算符 |	名称 |	短路行为 |	主要用途 |
| --- | --- | --- | --- |
| && |	逻辑与	| 左操作数为 falsy 时短路 |	条件执行、条件渲染
| \|\| |	逻辑或	| 左操作数为 truthy 时短路 |	默认值设置、回退机制
| ?? |	空值合并	| 左操作数为 null/undefined 时短路 |	精确的默认值设置

### `&&` 逻辑与

```js
// 短路行为：左操作数为 falsy 时，返回左操作数，不执行右操作数
false && console.log('不会执行');     // 返回 false
0 && console.log('不会执行');        // 返回 0
'' && console.log('不会执行');       // 返回 ''
null && console.log('不会执行');     // 返回 null
undefined && console.log('不会执行'); // 返回 undefined

// 左操作数为 truthy 时，返回右操作数
true && 'hello';    // 返回 'hello'
1 && 'world';       // 返回 'world'
'hi' && 42;         // 返回 42
```

### `||` 逻辑或

```js
// 短路行为：左操作数为 truthy 时，返回左操作数，不执行右操作数
true || console.log('不会执行');     // 返回 true
1 || console.log('不会执行');        // 返回 1
'hello' || console.log('不会执行');  // 返回 'hello'

// 左操作数为 falsy 时，返回右操作数
false || 'default';     // 返回 'default'
0 || 'zero';           // 返回 'zero'
'' || 'empty';         // 返回 'empty'
null || 'null';        // 返回 'null'
undefined || 'undefined'; // 返回 'undefined'
```

### `??` 空值合并

```js
// 短路行为：左操作数为 null 或 undefined 时，返回右操作数
null ?? 'default';        // 返回 'default'
undefined ?? 'default';   // 返回 'default'

// 左操作数为其他 falsy 值时，返回左操作数
false ?? 'default';       // 返回 false
0 ?? 'default';          // 返回 0
'' ?? 'default';         // 返回 ''
NaN ?? 'default';        // 返回 NaN
```

## State

React 依靠状态变量的标识来判断状态何时发生变化。

当我们将一个元素 push 到数组中时，并没有改变该数组的标识。

创建新的数组/对象修改引用，告诉 react 状态发生了改变。

| **Type** | **❌修改旧的** | **✅创建新的** |
| --- | --- | --- |
| Array | `item.push(value)` | `next = [...prev, value]` |
| Object | `item.email = email` | `const next = {...prev, email: email}` |

## LifeCycle

React 函数组件

| **位置** | **创建时机** | **适用场景** |
| --- | --- | --- |
| 组件外部 | 模块加载时 | 静态常量、工具函数 |
| 组件内部 | 每次渲染 | 动态计算、状态相关 |
| useMemo/useCallback | 依赖变化时 | 昂贵计算、函数缓存 |
