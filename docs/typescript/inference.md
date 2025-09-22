# TypeScript 类型推断

## 类型推断

```ts
// 1. 变量
let name = "Alice"; // 推断为 string
let age = 18;       // 推断为 number

// 2. 函数
function add(a: number, b: number) {
  return a + b; 		// 推断返回值类型为 number
}

// 3. 上下文
window.onmousedown = function(event) {
  console.log(event.button); // event 自动推断为 MouseEvent
}

// 4. 泛型
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity("hello"); // T 推断为 string
let output2 = identity(123);     // T 推断为 number
```

## 原理简述

1. AST构建
- TS 编译时静态分析代码
- TS 解析源码生成 AST 记录各变量、表达式、函数节点
- 收集上下文信息：变量赋值、函数参数、返回值、对象/数组字面量
2. 控制流分析
- 遍历函数与代码块的执行路径
- if/else、循环、try/catch
3. 类型传播
- 编译器将已知类型沿变量、表达式、函数返回值传播
- 如果变量在声明时有初始值，就优先根据初始值推断类型
- 如果是联合类型或条件分支，会对每个分支分别推断再合并