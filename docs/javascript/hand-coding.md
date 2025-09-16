# JavaScript 手撕代码

## 概述

常见的 JavaScript 手撕代码题目和实现方案。

## Promise

```js
function all(promises) {
	return new Promise((resolve, reject) => {
		const results = [];
		let count = 0;
		promises.forEach((promise, index)=>{
			Promise.resolve(promise)
				.then(result => {
					results[index] = result;
					count++;
					if (count === promises.length) resolve(results);
				})
				.catch(reject)
		})
	})
}
 
function serise(promises) {
	return new Promise((resolve, reject) => {
		const results = [];
		let current = 0;

		function next() {
			if (current >= promises.length) {
				resolve(results);
				return;
			}
			const promise = promises[current];
			Promise.resolve(promise)
				.then(result => {
					results.push(result);
					current++;
					next();
				})
				.catch(reject);
		}

		next();
	})
}
```

## 防抖

```js
function debounce(func, wait) {
	let timeout;
	return function(...args) {
		clearTimeout(timeout);
		timeout = setTimeout(()=>func.apply(this,args),wait);
	}
}
```

## 节流

```js
function throttle(func, wait) {
	let previous = 0;
	return function(...args) {
		const now = performance.now();
		if (now - previous > wait) {
			func.apply(this,args);
			previous = now;
		}
	}
}
```

## 深拷贝

```js
function deepClone(target, hash = new WeakMap()) {
	if (target === null || typeof target !== object) return target;
	if (hash.has(target)) return hash.get(target);
	const clone = Array.isArray(target) ? [] : {};
	hash.set(target, clone);
	for (const key in target) {
		if (target.hasOwnPropetry(key)) clone[key] = deepClone(target[key], hash);
	}
	return clone;
}
```

## call/apply/bind

```js
Function.prototype.myCall = function(context, ...args) {
	context = context || global;
	const fn = Symbol('fn');
	context[fn] = this;
	const result = context[fn](...args);
	delete context[fn];
	return result;
}

Function.prototype.myApply = function(context, argArr) {
	context = context || global;
	const fn = Symbol('fn');
	context[fn] = this;
	const result = context[fn](...args);
	delete context[fn];
	return result;
}

Function.prototype.myBind = function(context, ...args1) {
	const origin = this;
	return function(...args2) {
		return origin.apply(context, [...args1,...args2])
	}
}
```

## new

```js
function myNew(constructor, ...args) {
	const obj = Object.create(constructor.prototype);
	const result = constructor.apply(obj, args);
	return result instanceof Object ? result : obj;
}
```

## instanceof

```js
function myInstanceOf(left, right) {
	let leftProto = Object.getPrototype(left);
	const rightPrototype = right.prototype;
	
	while (leftProto !== null) {
		if (leftProto === rightPrototype) return true;
		leftProto = Object.getPrototype(leftProto);
	}
	return false;
}
```

## 数组扁平化

```js
function flatten(arr) {
	const result = [];
	for (const item of arr) {
		if (Array.isArray(item)) {
			result.push(...flatten(item));
		} else {
			result.push(item);
		}
	}
	return result;
}
```

## 数组去重

```js
function deduplicateBySet(arr) {
	return [...new Set(arr)];
}

function deduplicateByIndex(arr) {
	let slow = 0;
	arr.forEach((item, index) => {
		if (arr.indexOf(item) === index) {
			arr[slow++] = item;
		}
	})
	arr.length = slow;
	return slow;
}
```

## 发布订阅

```js
class EventEmitter() {
	constructor() {
		this.events = {};
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = [];
		this.events[eventName].push(callback);
	}
	emit(eventName, ...args) {
		if (!this.events[eventName]) return;
		this.events[eventName].forEach((callback)=>{
			callback.apply(this,args);
		})
	}
	off(eventName, callback) {
		if (!this.events[eventName]) return;
		const index = this.events[eventName].indexOf(callback);
		if (index === -1) return;
		this.events[eventName].splice(index,1);
	}
	once(eventName, callback) {
		const onceCallback = function(...args) {
			callback.apply(this, args);
			this.off(eventName, onceCallback);
		}
		this.on(eventName, onceCallback);
	}
}
```

## 任务调度

```js
class TaskScheduler {
	constructor(concurrency = 2) {
		this.concurrency = concurrency;
		this.running = 0;
		this.tasks = [];
	}
	add(task) {
		this.tasks.push(task);
		process();
	}
	process() {
		if (this.running >= this.concurrency || this.tasks.length === 0) return;
		const task = this.tasks.shift();
		this.running++;
		try {
			await task();
		} catch (err) {
			console.error(err)
		} finally {
			this.running--;
			this.process();
		}
	}
}
```

## 柯里化

```js
function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) return fn.apply(this, args);
		return function(...more) {
			return curried.apply(this, args.concat(more));
		};
	}
}
```

## sleep
```js
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}
await sleep(1000);
```

## 总结

通过实现这些常用的方法和工具函数，可以深入理解 JavaScript 的内部机制。
