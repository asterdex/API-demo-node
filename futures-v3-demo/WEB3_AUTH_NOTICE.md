# Futures V3 API 认证说明 / Futures V3 API Authentication Notice

## ⚠️ 重要提示 / Important Notice

**Futures V3 API 使用 Web3 签名认证，与 Spot 和 Futures API 的认证方式完全不同！**

**Futures V3 API uses Web3 signature authentication, which is completely different from Spot and Futures API!**

---

## 🔐 认证方式对比 / Authentication Comparison

### Spot & Futures API (HMAC SHA256)
```
Parameters: timestamp, recvWindow, signature
Signature: HMAC-SHA256(queryString, secretKey)
```

### Futures V3 API (Web3 ECDSA)
```
Parameters: user, signer, nonce, timestamp, recvWindow, signature
Signature: Web3 ECDSA signature using private key
```

---

## 📋 Futures V3 所需参数 / Required Parameters

| 参数 / Parameter | 说明 / Description |
|-----------------|-------------------|
| `user` | 主账户钱包地址 / Main account wallet address |
| `signer` | API钱包地址 / API wallet address |
| `nonce` | 微秒时间戳 / Microsecond timestamp |
| `timestamp` | 毫秒时间戳 / Millisecond timestamp |
| `recvWindow` | 接收窗口 / Receive window (default: 5000ms) |
| `signature` | Web3 ECDSA 签名 / Web3 ECDSA signature |

---

## 🔧 签名生成流程 / Signature Generation Process

### Step 1: 参数排序 / Sort Parameters
将所有API参数按ASCII顺序排序并转换为字符串
Sort all API parameters by ASCII order and convert to string

### Step 2: ABI 编码 / ABI Encoding
使用 Web3 ABI 编码参数和认证信息：
Use Web3 ABI to encode parameters and authentication info:

```javascript
const { encode } = require('eth-abi');
encoded = encode(
    ['string', 'address', 'address', 'uint256'],
    [jsonString, user, signer, nonce]
);
```

### Step 3: Keccak 哈希 / Keccak Hash
对编码结果使用 Keccak-256 生成哈希
Generate hash using Keccak-256 on the encoded result

### Step 4: ECDSA 签名 / ECDSA Signature
使用 API 钱包私钥对哈希进行 ECDSA 签名
Sign the hash using API wallet private key with ECDSA

---

## 🚫 当前状态 / Current Status

**当前示例文件使用的是 HMAC SHA256 认证方式，不适用于 Futures V3 API！**

**Current example files use HMAC SHA256 authentication, which does NOT work for Futures V3 API!**

### 问题 / Issues:
- ❌ 缺少 `user` 参数（主账户地址）
- ❌ 缺少 `signer` 参数（API钱包地址）
- ❌ 签名方式错误（应该用 Web3 ECDSA，而不是 HMAC SHA256）

---

## ✅ 解决方案 / Solutions

### 方案 1: 使用 Futures API (推荐)

如果您不需要 V3 的特定功能，建议使用 `futures-demo/` 中的示例：

```bash
cd futures-demo
node 17_positionSideDual.js  # 相当于 futures-v3 的 positionMode
```

Futures API 使用标准的 HMAC SHA256 认证，更简单易用。

### 方案 2: 实现 Web3 签名

要使用 Futures V3 API，需要：

1. **安装依赖**
```bash
npm install ethers eth-abi
```

2. **配置钱包地址**
在 `config.js` 中添加：
```javascript
USER_ADDRESS: '0x...',      // 主账户钱包地址
SIGNER_ADDRESS: '0x...',    // API钱包地址
PRIVATE_KEY: '0x...'        // API钱包私钥
```

3. **重写 utils.js**
实现 Web3 签名逻辑（需要 ABI 编码 + Keccak 哈希 + ECDSA 签名）

---

## 📖 参考文档 / Reference

详细的签名实现示例请参考：
For detailed signature implementation examples, see:

- `https://github.com/asterdex/api-docs/blob/master/aster-finance-futures-api-v3.md` 
- Python 示例代码在文档中有完整实现

---


## 🔗 相关链接 / Related Links

- Spot API: 使用 HMAC SHA256 ✅ (可用)
- Futures API: 使用 HMAC SHA256 ✅ (可用)
- Futures V3 API: 使用 Web3 ECDSA ⚠️ (需要额外配置)

---


