# JavaScript 类型系统

## 概述

JavaScript 是一种动态类型语言，具有灵活的类型系统。

## 数据类型

### 原始类型

```js
// 1. Number - 数字类型
let numVar = 42;
let numVar = 3.14;
let numVar = Infinity;
let numVar = -Infinity;
let numVar = NaN;

// 2. String - 字符串类型
let strVar = "Hello World";
let strVar = 'Single quotes';
let strVar = `Template literal: ${str}`;

// 3. Boolean - 布尔类型
let boolVar = true;
let boolVar = false;

// 4. Undefined - 未定义类型
let undefinedVar;

// 5. Null - 空值类型
let nullVar = null;

// 6. Symbol - 符号类型（ES6引入）
let symbolVar = Symbol('description');

// 7. BigInt - 大整数类型（ES2020引入）
let bigIntVar = 9007199254740991n;
let bigIntVar = BigInt(9007199254740991);
```

### 引用类型

```js
// Object - 对象类型
let obj = { name: 'John', age: 30 };

// Array - 数组类型
let arr = [1, 2, 3, 'hello'];

// Function - 函数类型
function func() {}
let arrow = () => {};

// Date - 日期类型
let date = new Date();

// RegExp - 正则表达式类型
let regex = /pattern/;

// Map - 映射类型
let map = new Map();

// Set - 集合类型
let set = new Set();
```

## 类型检测

### typeof 操作符
```javascript
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (历史遗留问题)
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
console.log(typeof function(){}); // "function"
```
### instanceof 操作符
```javascript
console.log([] instanceof Array);     // true
console.log({} instanceof Object);    // true
console.log(new Date() instanceof Date); // true
```
### Object.prototype
```js
const getType = (value) => Object.prototype.toString.call(value).slice(8,-1);
```
## 类型转换

### 隐式类型转换

```javascript
// 字符串连接
console.log("5" + 3);            // "53" (字符串)
console.log("5" - 3);            // 2 (数字)

// 比较操作
console.log("5" == 5);           // true (宽松相等)
console.log("5" === 5);          // false (严格相等)

// 数学运算
console.log("5" * 2);            // 10 (数字)
console.log("5" / 2);            // 2.5 (数字)
```
### 显式类型转换
```javascript
// 转换为数字
console.log(Number("42"));        // 42
console.log(Number("3.14"));      // 3.14
console.log(Number("hello"));     // NaN
console.log(Number(true));        // 1
console.log(Number(false));       // 0
console.log(Number(null));        // 0
console.log(Number(undefined));   // NaN

// 转换为字符串
console.log(String(42));          // "42"
console.log(String(true));        // "true"
console.log(String(null));        // "null"
console.log(String(undefined));   // "undefined"

// 转换为布尔值
console.log(Boolean(0));          // false
console.log(Boolean(1));          // true
console.log(Boolean(""));         // false
console.log(Boolean("hello"));    // true
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
```
## 类型系统

```markdown
JavaScript代码 → Parser → AST → Bytecode → JIT编译器 → 机器码
                ↓
            JSVal系统
```

### JSVal
```c++
// V8中的JSVal实现（简化版）
class JSVal {
private:
  union {
		int32_t i32;           // 32位整数
		double f64;            // 64位浮点数
		void* ptr;             // 指针
	} value;
	uint64_t type_tag;         // 类型标签
    
public:
	// 类型判断
	bool isNumber() const;
	bool isString() const;
	bool isObject() const;
	bool isUndefined() const;
	// ... 其他类型判断
};
```
### 类型标签
```js
// 内部表示示例
let num = 42;        // JSVal: { value: 42, tag: NUMBER_TAG }
let str = "hello";   // JSVal: { value: "hello", tag: STRING_TAG }
let obj = {};        // JSVal: { value: &object, tag: OBJECT_TAG }
```
### 自动解包
```js
let num = 42;  // JSVal: { value: 42, tag: NUMBER_TAG }

// 当调用方法时，引擎自动执行以下步骤：
num.toString();

// 内部过程：
// 1. 检查JSVal的tag
// 2. 如果是基本类型，创建临时包装对象
// 3. 调用方法
// 4. 返回结果
// 5. 销毁临时对象
```
```js
let numObj = new Number(42);  // JSVal: { value: &NumberObject, tag: OBJECT_TAG }

// 当进行运算时，引擎自动解包：
let result = numObj + 10;

// 内部过程：
// 1. 检查操作数类型
// 2. 如果是包装对象，调用valueOf()或toString()
// 3. 获取基本类型值
// 4. 执行运算
```
### 性能优化
```js
// 1. 推测优化

function processArray(arr) {
	// 引擎推测arr是数组类型
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];  // 推测arr[i]是数字
	}
	return sum;
}

// 2. 类型特化
function add(a, b) {
  return a + b;
}

// 可能生成多个版本：
// - add_number_number:     ~100x
// - add_string_string:     ~50x
// - add_generic:           ~1x
```
### 速度差异
```markdown
add_number_number:     ~100x
add_string_string:     ~50x
add_generic:           ~1x
```
1. 引擎类型转换
```js
// 特化版本：add_number_number
function add_number_number(a, b) {
	// 引擎知道a和b都是数字，可以直接进行CPU加法运算
	return a + b; // 直接汇编指令：ADD指令
}

// 通用版本：add_generic
function add_generic(a, b) {
	// 引擎需要：
	// 1. 检查a的类型
	// 2. 检查b的类型
	// 3. 根据类型选择操作
	// 4. 可能进行类型转换
	// 5. 执行相应操作
	if (typeof a === 'number' && typeof b === 'number') {
		return a + b;
	} else if (typeof a === 'string' && typeof b === 'string') {
		return a + b;
	} else if (typeof a === 'string' && typeof b === 'number') {
		return a + String(b);
	}
	// ... 更多类型组合
}
```
2. 内存访问差异
```js
// 特化版本：直接内存访问
function optimizedAdd(a, b) {
	// 引擎生成优化的机器码：
	// - 直接从寄存器读取值
	// - 执行CPU加法指令
	// - 结果直接写入寄存器
	return a + b;
}

// 通用版本：多次内存访问
function genericAdd(a, b) {
	// 引擎需要：
	// - 读取a的值
	// - 读取a的类型信息
	// - 读取b的值  
	// - 读取b的类型信息
	// - 执行类型检查逻辑
	// - 可能创建临时对象
	// - 执行实际运算
}
```
3. 最终机器码差异
```markdown
特化版本生成的机器码（简化）
MOV eax, [a]        ; 加载第一个数字
ADD eax, [b]        ; 直接加法
RET                 ; 返回

通用版本生成的机器码（简化）
MOV eax, [a]        ; 加载第一个值
MOV ebx, [a_type]   ; 加载类型信息
CMP ebx, NUMBER_TAG ; 比较类型
JNE string_case     ; 如果不是数字，跳转
MOV ecx, [b]        ; 加载第二个值
ADD eax, ecx        ; 执行加法
JMP end
string_case:
... 字符串处理逻辑
end:
RET
```
4. 生产环境差异小
```markdown
1. 数据模式稳定

2. 引擎有足够时间优化
- 第一次执行：解释执行
- 前几次：基本JIT
- 稳定运行：完全优化

3. 分支预测优化
- CPU的分支预测器学习代码模式
- 减少分支预测失败的开销

4. 缓存友好性
- 代码和数据访问模式稳定
- 更好的CPU缓存命中率
```

## 总结

JavaScript 的类型系统虽然灵活，但也容易产生类型相关的错误。理解类型转换规则和检测方法对于编写健壮的 JavaScript 代码至关重要。
