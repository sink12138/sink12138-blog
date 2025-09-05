# 网络协议

# HTTP

## 状态码

- 1xx 信息

- 2xx 请求成功

- 3xx 重定向

- 4xx 客户端错误

- 5xx 服务端错误

| 101 | Switching Protocols | 切换协议 |
| --- | --- | --- |
| 200 | OK | 成功 |
| 204 | No Content | 预见请求：成功且不需要离开页面 |
| 206 | Partial Content | 范围请求：Range，If Range |
| 301 | Moved Permanently | 永久重定向 |
| 302 | Found | 临时重定向 |
| 304 | Not Modified | 存在协商缓存 |
| 400 | Bad Request | 客户端错误 |
| 401 | Unauthorized | 认证失败 |
| 403 | Forbidden | 拒绝访问 |
| 404 | Not Found | 文件不存在 |
| 405 | Method Not Allowed | 请求方式错误 |
| 415 | Unsupported Media Type | 未知媒体类型 |
| 500 | Internal Server Error | 服务器异常 |
| 502 | Bad Gateway | 网关错误 |
| 503 | Service Unavailable | 服务器停机/繁忙 |
| 504 | GateWay Timeout | 网关服务器超时 |

## 数据格式

| application/x-www-form-urlencoded |  key-value |
| --- | --- |
| application/json | JSON |
| mutipart/form-data | 多部分多媒体 |
| text/xml | XML |

## 请求方式

| GET | 安全 幂等 可缓存 ASCII | 信息获取/请求指定资源 |
| --- | --- | --- |
| POST | 数据包含在请求体，可能新建资源/修改 | 提交数据/处理请求 |
| OPTIONS | CORS预检 | 获取资源支持的通信 |
| PUT | 通常指定资源存放位置 | 创建/替换目标资源 |
| HEAD | 下载资源前先获取大小 | 请求头部信息 |
| DELETE | 没有 请求正文/返回主体 | 删除指定资源 |
| PATCH | 指定位置 非幂等 | 资源进行部分修改 |

## 队头阻塞

在 HTTP/1.1 中，如果客户端向服务器发送多个请求而不等待响应，服务器会按顺序处理这些请求。如果第一个请求的响应被延迟，后续请求的响应也会被延迟。HTTP/2 通过请求多路复用解决了应用层的队头阻塞，但在传输层 TCP 仍然存在。

## HTTP2

基于https，加密可选

- 多路复用
- 二进制传输
- 头部压缩
- SSE

## HTTP3

基于udp封装一层quic协议，彻底解决tcp阻塞

## HTTPS