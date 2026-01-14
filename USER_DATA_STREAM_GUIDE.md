# 用户数据流使用指南 / User Data Stream Guide

## 📌 概述 / Overview

本文档说明如何在各个 WebSocket 示例中使用**自动创建 listenKey** 的用户数据流功能。

This guide explains how to use the **automatic listenKey creation** feature in WebSocket examples.

---

## 🎯 支持的 WebSocket 示例 / Supported WebSocket Examples

以下 WebSocket 示例已支持自动创建 listenKey：

| 目录 | 文件 | 认证方式 |
|------|------|----------|
| **spot-ws** | `12_userData.js` | API Key (Spot) |
| **futures-ws** | `15_userData.js` | API Key (Futures) |
| **futures-v3-ws** | `15_userData.js` | EIP-712 (Futures V3) |

---

## ⚙️ 配置要求 / Configuration Requirements

### 1. Spot WebSocket (`spot-ws/12_userData.js`)

**依赖**：需要 `spot-demo/config.js` 配置

```javascript
// spot-demo/config.js
module.exports = {
    BASE_URL: 'https://api.asterdex.com',
    API_KEY: 'your_api_key',
    SECRET_KEY: 'your_secret_key',
    // ...
};
```

### 2. Futures WebSocket (`futures-ws/15_userData.js`)

**依赖**：需要 `futures-demo/config.js` 配置

```javascript
// futures-demo/config.js
module.exports = {
    BASE_URL: 'https://fapi.asterdex.com',
    API_KEY: 'your_api_key',
    SECRET_KEY: 'your_secret_key',
    // ...
};
```

### 3. Futures V3 WebSocket (`futures-v3-ws/15_userData.js`)

**依赖**：需要 `futures-v3-demo/config.js` 配置

```javascript
// futures-v3-demo/config.js
module.exports = {
    BASE_URL: 'https://fapi.asterdex.com',
    USER_ADDRESS: '0x...',
    SIGNER_ADDRESS: '0x...',
    PRIVATE_KEY: '0x...',
    EIP712_DOMAIN: { /* ... */ },
    // ...
};
```

---

## 🚀 使用步骤 / Usage Steps

### 步骤 1：安装依赖 / Step 1: Install Dependencies

在对应的 WebSocket 目录中安装依赖：

```bash
# For spot-ws
cd spot-ws
npm install

# For futures-ws
cd futures-ws
npm install

# For futures-v3-ws
cd futures-v3-ws
npm install
```

### 步骤 2：配置 API / Step 2: Configure API

确保对应的 demo 目录已正确配置：
- `spot-demo/config.js`
- `futures-demo/config.js`
- `futures-v3-demo/config.js`

### 步骤 3：运行脚本 / Step 3: Run Script

```bash
# Spot
cd spot-ws
node 12_userData.js

# Futures
cd futures-ws
node 15_userData.js

# Futures V3
cd futures-v3-ws
node 15_userData.js
```

---

## ✨ 自动功能 / Automatic Features

### ✅ 自动创建 ListenKey

脚本启动时会自动：
1. 读取对应的 API 配置
2. 调用 REST API 创建 listenKey
3. 连接到 WebSocket 用户数据流

The script automatically:
1. Loads API configuration
2. Creates listenKey via REST API
3. Connects to WebSocket user data stream

### ✅ 自动保持连接

每 30 分钟自动延长 listenKey 有效期，保持连接活跃。

Automatically extends listenKey validity every 30 minutes to keep the connection alive.

### ✅ 优雅关闭

按 `Ctrl+C` 时会优雅地关闭 WebSocket 连接并清理资源。

Press `Ctrl+C` to gracefully close the WebSocket connection and clean up resources.

---

## 📊 输出示例 / Output Example

```bash
$ node 15_userData.js

Creating listenKey automatically... / 自动创建listenKey中...

✓ ListenKey created successfully / ListenKey创建成功
ListenKey: pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1

Connecting to Futures V3 User Data Stream... / 连接期货V3用户数据流中...

URL: wss://fstream.asterdex.com/ws/pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1

✓ Connected to Futures V3 User Data Stream! / 已连接到期货V3用户数据流！

Listening for account and order updates... / 监听账户和订单更新中...

─────────────────────────────────────────
Raw Data / 原始数据:
{"e":"ORDER_TRADE_UPDATE","E":1599693087644,"T":1599693087640,"o":{...}}

Parsed Data / 解析数据:
{
  "e": "ORDER_TRADE_UPDATE",
  "E": 1599693087644,
  ...
}
─────────────────────────────────────────

✓ ListenKey kept alive / ListenKey保持活跃
```

---

## ❓ 常见问题 / FAQ

### Q1: 为什么需要对应的 demo 配置？

**A:** 用户数据流需要认证，WebSocket 脚本会读取对应 demo 目录的配置来创建 listenKey。

### Q2: listenKey 有效期多久？

**A:** 默认 60 分钟。脚本会每 30 分钟自动延长有效期。

### Q3: 如果 API 配置错误会怎样？

**A:** 脚本会显示错误信息并退出，例如：
```
Error creating listenKey / 创建listenKey错误: Invalid API-key
```

### Q4: 可以同时运行多个用户数据流吗？

**A:** 可以，但每个脚本会创建独立的 listenKey。

### Q5: 如何手动创建 listenKey？

**A:** 可以使用对应 demo 目录中的 REST API 脚本：
- `spot-demo/27_createListenKey.js`
- `futures-demo/45_createListenKey.js`
- `futures-v3-demo/44_listenKey.js`

---

## 🔧 故障排除 / Troubleshooting

### 问题 1：无法创建 listenKey

**可能原因**：
- API 配置文件不存在或路径错误
- API_KEY 无效或已过期
- 网络连接问题

**解决方法**：
1. 检查配置文件路径
2. 验证 API_KEY 是否正确
3. 测试网络连接

### 问题 2：WebSocket 连接断开

**可能原因**：
- listenKey 过期
- 网络不稳定

**解决方法**：
- 脚本会自动保持 listenKey 活跃
- 如果连接断开，需要重新运行脚本

### 问题 3：未收到用户数据

**可能原因**：
- 账户没有交易活动
- 订阅未成功

**解决方法**：
- 进行一些交易操作（下单、撤单等）
- 检查 WebSocket 连接状态

---

## 🔗 相关链接 / Related Links

- [AsterDEX 官网](https://www.asterdex.com)
- [API 管理](https://www.asterdex.com/en/api-management)


