# JavaScript 异步编程

## 概述

JavaScript 是单线程语言，但通过异步编程模式可以处理非阻塞操作。本文将介绍各种异步编程方案。

## 回调函数 (Callback)

### 基本用法

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Data received');
  }, 1000);
}

fetchData((data) => {
  console.log(data); // Data received
});
```

### 回调地狱问题

```javascript
// 回调地狱示例
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getFinalData(c, function(finalData) {
        console.log(finalData);
      });
    });
  });
});
```

## Promise

### 基本用法

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Promise 链式调用

```javascript
fetchData()
  .then(data => processData(data))
  .then(processedData => saveData(processedData))
  .then(() => console.log('All done!'))
  .catch(error => console.error('Error:', error));
```

### Promise 静态方法

```javascript
// Promise.all - 等待所有 Promise 完成
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error));

// Promise.race - 返回第一个完成的 Promise
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled - 等待所有 Promise 完成（无论成功失败）
Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));
```

## async/await

### 基本用法

```javascript
async function fetchData() {
  try {
    const data = await getData();
    const processedData = await processData(data);
    const savedData = await saveData(processedData);
    return savedData;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 并行处理

```javascript
async function fetchMultipleData() {
  try {
    // 并行执行
    const [data1, data2, data3] = await Promise.all([
      fetchData1(),
      fetchData2(),
      fetchData3()
    ]);
    
    return { data1, data2, data3 };
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 生成器 (Generator)

### 基本用法

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = numberGenerator();
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
```

### 异步生成器

```javascript
async function* asyncGenerator() {
  yield await fetchData1();
  yield await fetchData2();
  yield await fetchData3();
}

for await (const data of asyncGenerator()) {
  console.log(data);
}
```

## 事件循环 (Event Loop)

### 执行顺序

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 输出顺序: 1, 4, 3, 2
```

### 宏任务和微任务

```javascript
// 宏任务: setTimeout, setInterval, I/O 操作
// 微任务: Promise.then, queueMicrotask

console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

queueMicrotask(() => console.log('microtask'));

console.log('end');

// 输出: start, end, promise, microtask, timeout
```

## 实际应用示例

### 文件上传

```javascript
async function uploadFile(file) {
  try {
    // 1. 验证文件
    await validateFile(file);
    
    // 2. 压缩文件
    const compressedFile = await compressFile(file);
    
    // 3. 上传文件
    const uploadResult = await uploadToServer(compressedFile);
    
    // 4. 保存记录
    await saveUploadRecord(uploadResult);
    
    return uploadResult;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
```

### 数据获取和处理

```javascript
async function fetchUserData(userId) {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(userId),
      fetchUserPosts(userId),
      fetchUserComments(userId)
    ]);
    
    return {
      user,
      posts: posts.map(post => ({
        ...post,
        comments: comments.filter(comment => comment.postId === post.id)
      }))
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
```

## 错误处理

### Promise 错误处理

```javascript
fetchData()
  .then(data => {
    if (!data) {
      throw new Error('No data received');
    }
    return processData(data);
  })
  .catch(error => {
    console.error('Error:', error.message);
    return getDefaultData();
  })
  .finally(() => {
    console.log('Operation completed');
  });
```

### async/await 错误处理

```javascript
async function handleData() {
  try {
    const data = await fetchData();
    const result = await processData(data);
    return result;
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation failed:', error.message);
    } else if (error.name === 'NetworkError') {
      console.error('Network error:', error.message);
    } else {
      console.error('Unknown error:', error.message);
    }
    throw error;
  }
}
```

## 总结

异步编程是 JavaScript 开发的核心技能。从回调函数到 Promise，再到 async/await，每种方案都有其适用场景。选择合适的异步编程模式可以提高代码的可读性和可维护性。
