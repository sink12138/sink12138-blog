# JavaScript this 详解

## 概述

`this` 是 JavaScript 中一个特殊的关键字，它的值在函数被调用时确定，而不是在函数定义时确定。`this` 的值取决于函数的调用方式。

## this 的绑定规则

### 1. 默认绑定 (Default Binding)

当函数独立调用时，`this` 指向全局对象（浏览器中是 `window`，Node.js 中是 `global`）。

```javascript
function foo() {
  console.log(this); // 在浏览器中指向 window
}

foo(); // 默认绑定

// 严格模式下，this 为 undefined
function bar() {
  'use strict';
  console.log(this); // undefined
}

bar();
```

### 2. 隐式绑定 (Implicit Binding)

当函数作为对象的方法调用时，`this` 指向调用该方法的对象。

```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(this.name); // this 指向 obj
  }
};

obj.greet(); // "Alice"

// 隐式丢失
const greet = obj.greet;
greet(); // undefined (默认绑定)

// 回调函数中的隐式丢失
setTimeout(obj.greet, 1000); // undefined
```

### 3. 显式绑定 (Explicit Binding)

使用 `call`、`apply`、`bind` 方法显式指定 `this` 的值。

```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

// call 方法
greet.call(person1); // "Hello, Alice"
greet.call(person2); // "Hello, Bob"

// apply 方法（参数以数组形式传递）
function greetWithMessage(message) {
  console.log(`${message}, ${this.name}`);
}

greetWithMessage.apply(person1, ['Hi']); // "Hi, Alice"

// bind 方法（返回新函数）
const boundGreet = greet.bind(person1);
boundGreet(); // "Hello, Alice"
```

### 4. new 绑定 (New Binding)

使用 `new` 操作符调用构造函数时，`this` 指向新创建的对象。

```javascript
function Person(name) {
  this.name = name;
  this.greet = function() {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const person = new Person('Alice');
person.greet(); // "Hello, I'm Alice"
```

## this 绑定优先级

1. **new 绑定** > **显式绑定** > **隐式绑定** > **默认绑定**

```javascript
function foo() {
  console.log(this.name);
}

const obj1 = { name: 'obj1' };
const obj2 = { name: 'obj2' };

// 显式绑定优先级高于隐式绑定
obj1.foo = foo;
obj1.foo.call(obj2); // "obj2"

// new 绑定优先级最高
const boundFoo = foo.bind(obj1);
const newObj = new boundFoo(); // 新对象，不是 obj1
```

## 箭头函数中的 this

箭头函数没有自己的 `this`，它会继承外层作用域的 `this`。

```javascript
const obj = {
  name: 'Alice',
  regularFunction: function() {
    console.log('regular:', this.name); // "Alice"
    
    // 箭头函数继承外层 this
    const arrowFunction = () => {
      console.log('arrow:', this.name); // "Alice"
    };
    arrowFunction();
  },
  
  arrowMethod: () => {
    console.log(this.name); // undefined（继承全局作用域）
  }
};

obj.regularFunction();
obj.arrowMethod();
```

## 面试常见问题

### 1. 基础 this 指向问题

```javascript
// 题目 1
var name = 'global';
const obj = {
  name: 'obj',
  fn: function() {
    console.log(this.name);
  }
};

obj.fn(); // "obj"
const fn = obj.fn;
fn(); // "global"

// 题目 2
const obj2 = {
  name: 'obj2',
  fn: function() {
    return function() {
      console.log(this.name);
    };
  }
};

obj2.fn()(); // "global"（闭包中的 this 指向全局）
```

### 2. 箭头函数 this 问题

```javascript
// 题目 3
const obj = {
  name: 'obj',
  fn: function() {
    const arrow = () => {
      console.log(this.name);
    };
    arrow();
  }
};

obj.fn(); // "obj"

// 题目 4
const obj2 = {
  name: 'obj2',
  fn: () => {
    console.log(this.name);
  }
};

obj2.fn(); // undefined（箭头函数没有自己的 this）
```

### 3. 严格模式下的 this

```javascript
// 题目 5
'use strict';
function foo() {
  console.log(this);
}

foo(); // undefined（严格模式下默认绑定为 undefined）

// 题目 6
const obj = {
  fn: function() {
    'use strict';
    return function() {
      console.log(this);
    };
  }
};

obj.fn()(); // undefined
```

### 4. 复杂场景 this 问题

```javascript
// 题目 7
var name = 'global';
const obj = {
  name: 'obj',
  fn: function() {
    console.log(this.name);
    return function() {
      console.log(this.name);
    };
  }
};

obj.fn()(); // "obj" 然后 "global"

// 题目 8
const obj2 = {
  name: 'obj2',
  fn: function() {
    const self = this;
    return function() {
      console.log(self.name);
    };
  }
};

obj2.fn()(); // "obj2"（使用闭包保存 this）
```

### 5. 类中的 this

```javascript
// 题目 9
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(this.name);
  }
  
  greetArrow = () => {
    console.log(this.name);
  }
}

const person = new Person('Alice');
const greet = person.greet;
const greetArrow = person.greetArrow;

greet(); // 报错（严格模式下 this 为 undefined）
greetArrow(); // "Alice"（箭头函数绑定到实例）
```

## 实际应用场景

### 1. 事件处理中的 this

```javascript
// DOM 事件处理
const button = document.getElementById('myButton');

// 传统方式
button.addEventListener('click', function() {
  console.log(this); // 指向 button 元素
});

// 箭头函数
button.addEventListener('click', () => {
  console.log(this); // 指向外层作用域的 this
});
```

### 2. 回调函数中的 this

```javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }
  
  start() {
    // 错误方式：this 指向全局
    setInterval(function() {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
    
    // 正确方式 1：使用箭头函数
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
    
    // 正确方式 2：使用 bind
    setInterval(function() {
      this.seconds++;
      console.log(this.seconds);
    }.bind(this), 1000);
  }
}
```

### 3. 方法借用

```javascript
const obj1 = {
  name: 'Alice',
  greet: function(message) {
    console.log(`${message}, ${this.name}`);
  }
};

const obj2 = {
  name: 'Bob'
};

// 借用 obj1 的 greet 方法
obj1.greet.call(obj2, 'Hello'); // "Hello, Bob"
obj1.greet.apply(obj2, ['Hi']); // "Hi, Bob"

const boundGreet = obj1.greet.bind(obj2, 'Hey');
boundGreet(); // "Hey, Bob"
```

## 常见错误和解决方案

### 1. 隐式丢失

```javascript
// 错误
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(this.name);
  }
};

const fn = obj.greet;
fn(); // undefined

// 解决方案
const boundFn = obj.greet.bind(obj);
boundFn(); // "Alice"
```

### 2. 回调函数中的 this 丢失

```javascript
// 错误
class Component {
  constructor() {
    this.name = 'Component';
  }
  
  render() {
    // this 指向全局
    setTimeout(function() {
      console.log(this.name);
    }, 1000);
  }
}

// 解决方案
class Component {
  constructor() {
    this.name = 'Component';
  }
  
  render() {
    // 使用箭头函数
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
    
    // 或使用 bind
    setTimeout(function() {
      console.log(this.name);
    }.bind(this), 1000);
  }
}
```

## 总结

1. **this 的值在函数调用时确定**，不是定义时
2. **绑定优先级**：new > 显式 > 隐式 > 默认
3. **箭头函数没有自己的 this**，继承外层作用域
4. **严格模式下默认绑定为 undefined**
5. **注意隐式丢失**，特别是在回调函数中
6. **使用 bind/call/apply 可以显式控制 this**

理解 `this` 的关键是分析函数的调用方式，而不是函数定义的位置。
