# TypeScript 类型系统

## 基本类型

TypeScript 的基础类型和 JavaScript 很类似，但可以通过类型注解保证类型安全。

| 类型                   | 描述                    | 示例                                                     |
| -------------------- | --------------------- | ------------------------------------------------------ |
| `string`             | 字符串                   | `let name: string = "Alice";`                          |
| `number`             | 数值                    | `let age: number = 18;`                                |
| `boolean`            | 布尔值                   | `let flag: boolean = true;`                            |
| `null` / `undefined` | 空值                    | `let n: null = null; let u: undefined;`                |
| `any`                | 任意类型，绕过类型检查           | `let x: any = 123; x = "str";`                         |
| `unknown`            | 类型安全的任意类型，需要类型判断后才能使用 | `let x: unknown; if(typeof x==="string") { x.length }` |
| `void`               | 无返回值函数                | `function log(): void { console.log("Hi"); }`          |
| `never`              | 不会返回的类型（抛错或无限循环）      | `function error(): never { throw new Error(); }`       |

- any vs unknown：any 不安全，unknown 安全且需类型检查。
- void vs undefined：void 表示函数无返回值，undefined 是值类型。
- never：表示永远不会返回的类型，用于抛错、无限循环或不可能的类型分支。

---

## 复杂类型

1. 数组和元组

```ts
let arr1: number[] = [1,2,3];
let arr2: Array<string> = ["a","b"];
let tuple: [string, number] = ["Alice", 18];
```

* **数组**：同类型元素集合。
* **元组**：固定长度、每个元素类型固定。

---

2. 枚举（Enum）

```ts
enum Direction { Up, Down, Left, Right }
let dir: Direction = Direction.Up;
```

* 默认从 0 开始，可以手动赋值或字符串枚举。
* 用于表示固定的状态或选项。

---

3. 联合类型（Union）

```ts
let value: string | number;
value = "text";
value = 100;
```

* 变量可以是多种类型之一。
* 配合类型保护 (`typeof`) 使用。

---

4. 交叉类型（Intersection）

```ts
interface A { name: string; }
interface B { age: number; }
type C = A & B;
let c: C = { name: "Alice", age: 18 };
```

* 合并多个类型的属性，必须同时满足所有约束。

---

5. 字面量类型（Literal Type）

```ts
let direction: "up" | "down" | "left" | "right";
direction = "up"; // ok
```

* 限制变量只能取特定值。
* 常用于函数参数约束。

---

6. 类型别名 vs 接口

```ts
type ID = string | number;
interface User { name: string; age: number; }
```

* **类型别名 (`type`)**：可以表示基本类型、联合类型、交叉类型、映射类型。
* **接口 (`interface`)**：只能描述对象类型，可以继承、扩展。

- `type` 用于类型组合（联合/交叉/元组等）
- `interface` 用于对象形状，可以声明合并扩展接口

---

## 高级类型

1. 索引类型（Index Types）

```ts
interface User { name: string; age: number; }
type UserKeys = keyof User; // "name" | "age"
let key: UserKeys = "name";
```

* `keyof` 获取对象属性名的联合类型。
* `typeof` 获取变量的类型。

---

2. 映射类型（Mapped Types）

```ts
type ReadonlyUser = { readonly [K in keyof User]: User[K] };
```

* 可以动态生成对象类型，常配合 `keyof` 使用。
* 内置映射类型：`Partial<T>`、`Required<T>`、`Readonly<T>`。

---

3. 条件类型（Conditional Types）

```ts
type TypeName<T> = T extends string ? "string" : "other";
type A = TypeName<"test">; // "string"
type B = TypeName<number>; // "other"
```

* 根据类型条件返回不同类型。
* 常用于高级类型工具的设计。

---

4. 泛型（Generics）

```ts
function identity<T>(arg: T): T { return arg; }
let output = identity<string>("hello");
```

* 可以定义函数、接口、类的类型参数。
* **约束泛型**：

```ts
function logLength<T extends { length: number }>(arg: T) { console.log(arg.length); }
```

---

5. 内置高级类型

* `Partial<T>`：所有属性变为可选
* `Required<T>`：所有属性变为必选
* `Pick<T, K>`：挑选属性
* `Omit<T, K>`：排除属性
* `Record<K,T>`：生成键值类型对象
* `Exclude<T,U>` / `Extract<T,U>`：联合类型工具

---

## 类型保护

确保在运行时安全地使用联合类型或 unknown 类型。

1. `typeof`

```ts
function print(x: string | number) {
  if (typeof x === "string") {
    console.log(x.length);
  }
}
```

2. `instanceof`

```ts
class Dog { bark(){} }
class Cat { meow(){} }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) animal.bark();
}
```

3. 自定义类型保护

```ts
function isDog(animal: any): animal is Dog {
  return animal && typeof animal.bark === "function";
}
```
