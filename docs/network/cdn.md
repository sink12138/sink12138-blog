# CDN

## 源站同步

#### 1. 被动同步：回源

	配合 TTL ETag Last-Modified 缓存同步
#### 2. 主动同步：推送

	主动推送 刷新Purge 分发（需要CDN推送工具）
#### 3. 版本号更新

	hash version 无需清理缓存 需要改引用