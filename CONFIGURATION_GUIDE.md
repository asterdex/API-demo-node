# 配置指南 / Configuration Guide

## 🎯 快速配置 / Quick Setup

有两种配置方式可选：  
Two configuration methods available:

### 方法 1: 统一配置（推荐）/ Method 1: Unified Config (Recommended)

**一次配置，所有接口可用！/ Configure once, use everywhere!**

#### 步骤 / Steps:

1. **编辑根目录的 `shared-config.js`**  
   Edit `shared-config.js` in root directory

```bash
cd "/Users/user/Desktop/api demo"
nano shared-config.js  # 或使用任何编辑器 / or use any editor
```

2. **填写您的凭证**  
   Fill in your credentials

```javascript
module.exports = {
    // API凭证 / API Credentials
    API_KEY: '您的API密钥',
    SECRET_KEY: '您的密钥',
    
    // 钱包凭证（钱包签名接口需要）/ Wallet (for signature endpoints)
    PRIVATE_KEY: '0x您的私钥...',
    WALLET_ADDRESS: '0x您的地址...',
    
    // 其他配置已预设，无需修改 / Other configs are preset
};
```

3. **运行同步脚本**  
   Run sync script 

```bash
node sync-config.js
```

这会自动将配置同步到所有目录！  
This will automatically sync config to all directories!

### 方法 2: 分别配置 / Method 2: Separate Config

**分别为每个目录配置（更灵活但需要多次配置）**  
Configure each directory separately (more flexible but requires multiple setups)

#### 需要配置的文件 / Files to Configure:

```bash
# 1. Spot API / 现货API
cd spot-demo
cp config.example.js config.js
nano config.js

# 2. Futures API / 期货API
cd ../futures-demo
nano config.js

# 3. Futures V3 API / 期货V3 API
cd ../futures-v3-demo
nano config.js
```

## 📊 配置对比 / Configuration Comparison

| 配置项 / Config Item | spot-demo | futures-demo | futures-v3-demo |
|---------------------|-----------|--------------|-----------------|
| BASE_URL | https://sapi.asterdex.com | https://fapi.asterdex.com | https://fapi.asterdex.com |
| API_KEY | ✅ 需要 / Required | ✅ 需要 / Required | ✅ 需要 / Required |
| SECRET_KEY | ✅ 需要 / Required | ✅ 需要 / Required | ✅ 需要 / Required |
| PRIVATE_KEY | ⚠️ 钱包签名需要 / For signatures | ❌ 不需要 / Not needed | ❌ 不需要 / Not needed |
| WALLET_ADDRESS | ⚠️ 钱包签名需要 / For signatures | ❌ 不需要 / Not needed | ❌ 不需要 / Not needed |

## 🔍 哪些接口需要什么配置？ / Which Endpoints Need What?

### 所有接口都需要 / All Endpoints Need:
- ✅ **API_KEY** - API密钥
- ✅ **SECRET_KEY** - 密钥

### 只有以下Spot接口需要钱包配置 / Only These Spot Endpoints Need Wallet:
- `22_sendToAddress.js` - 发送到地址 / Send to address
- `26_createApiKey.js` - 创建API密钥 / Create API key

如果您不使用这两个接口，可以不配置钱包相关内容。  
If you don't use these two endpoints, you can skip wallet configuration.

## 🚀 使用哪个配置方法？ / Which Method to Use?

### 推荐使用方法1（统一配置）如果：/ Use Method 1 (Unified) if:
- ✅ 您想要简单快速的配置 / You want simple and fast setup
- ✅ 所有API使用相同的凭证 / All APIs use same credentials
- ✅ 您会使用多个API类型 / You'll use multiple API types

### 使用方法2（分别配置）如果：/ Use Method 2 (Separate) if:
- ✅ 不同API需要不同的凭证 / Different APIs need different credentials
- ✅ 您只使用一个API类型 / You only use one API type
- ✅ 您需要更灵活的配置 / You need more flexible configuration

## 📝 配置示例 / Configuration Examples

### 示例 1: 最小配置（只用REST API，不用钱包功能）
Minimal Config (REST API only, no wallet features)

```javascript
// shared-config.js
module.exports = {
    API_KEY: 'abc123...',
    SECRET_KEY: 'xyz789...',
    // 以下可以保持默认 / Following can keep defaults
    PRIVATE_KEY: '0x0000...',  
    WALLET_ADDRESS: '0x0000...',
};
```

**可用接口 / Available Endpoints:**
- ✅ 所有Spot REST API（除了22, 26）
- ✅ 所有Futures REST API
- ✅ 所有Futures V3 REST API
- ✅ 所有WebSocket流

**不可用接口 / Unavailable Endpoints:**
- ❌ `spot-demo/22_sendToAddress.js`
- ❌ `spot-demo/26_createApiKey.js`

### 示例 2: 完整配置（包含钱包功能）
Full Config (with wallet features)

```javascript
// shared-config.js
module.exports = {
    API_KEY: 'abc123...',
    SECRET_KEY: 'xyz789...',
    PRIVATE_KEY: '0x1234567890abcdef...',  // 真实私钥 / Real private key
    WALLET_ADDRESS: '0xAbCdEf...',          // 真实地址 / Real address
};
```

**可用接口 / Available Endpoints:**
- ✅ 所有接口！/ All endpoints!

## ⚙️ 自动同步配置

```bash
# 使用方法 / Usage:
node sync-config.js

# 输出示例 / Output example:
✓ Synced to spot-demo/config.js
✓ Synced to futures-demo/config.js
✓ Synced to futures-v3-demo/config.js
✓ All configurations synced! / 所有配置已同步！
```

## 🔐 安全提示 / Security Notes

不论使用哪种方法，请确保：  
Regardless of which method, please ensure:

1. ✅ 将 `shared-config.js` 和所有 `config.js` 添加到 `.gitignore`
2. ✅ 永远不要提交包含真实凭证的文件
3. ✅ 使用测试凭证进行测试
4. ✅ 定期更换API密钥

## 📋 快速检查清单 / Quick Checklist

配置前检查 / Before Configuration:
- [ ] 已获取API密钥和密钥 / Obtained API key and secret
- [ ] 已准备好钱包私钥（如需要）/ Wallet private key ready (if needed)
- [ ] 已阅读安全须知 / Read security notice

配置后检查 / After Configuration:
- [ ] API_KEY 不是默认值 / API_KEY is not default
- [ ] SECRET_KEY 不是默认值 / SECRET_KEY is not default
- [ ] 已添加到 .gitignore / Added to .gitignore
- [ ] 测试一个简单接口（如 ping）/ Test a simple endpoint (like ping)

## 🧪 测试配置 / Test Configuration

配置完成后，测试是否正常：  
After configuration, test if it works:

```bash
# 测试 Spot API / Test Spot API
cd spot-demo
node 01_ping.js

# 测试 Futures API / Test Futures API
cd ../futures-demo
node 01_ping.js

# 测试 Futures V3 API / Test Futures V3 API
cd ../futures-v3-demo
node 01_ping.js
```

如果看到 "✓ Connection successful!"，说明配置正确！  
If you see "✓ Connection successful!", configuration is correct!

## ❓ 常见问题 / FAQ

### Q1: 我必须配置钱包私钥吗？
**A:** 不是。只有使用 `22_sendToAddress.js` 和 `26_createApiKey.js` 时才需要。其他接口只需要API密钥。

### Q2: 三个config.js可以使用相同的API密钥吗？
**A:** 可以！同一个API密钥可以用于Spot、Futures和Futures V3 API。

### Q3: 我可以只配置一个目录吗？
**A:** 可以！如果您只使用Spot API，只需配置 `spot-demo/config.js`。

### Q4: sync-config.js脚本安全吗？
**A:** 是的。它只是复制配置，不会发送到网络。而且 `shared-config.js` 已在 `.gitignore` 中。

### Q5: 如何验证配置是否正确？
**A:** 运行 `node 01_ping.js` 测试连接。如果成功，配置就正确了。

## 🔄 更新配置 / Update Configuration

### 使用统一配置时 / When using unified config:
```bash
# 1. 编辑 shared-config.js
nano shared-config.js

# 2. 重新同步
node sync-config.js
```

### 使用分别配置时 / When using separate config:
```bash
# 分别编辑每个 config.js
nano spot-demo/config.js
nano futures-demo/config.js
nano futures-v3-demo/config.js
```

## 📞 需要帮助？ / Need Help?

如果配置遇到问题：  
If you encounter configuration issues:

1. 检查 `.gitignore` 是否包含 `config.js`
2. 确认API密钥格式正确
3. 运行 `ping` 接口测试连接
4. 查看错误消息获取详细信息

---

**配置完成后，所有接口示例都可以使用了！**  
**After configuration, all endpoint examples are ready to use!**



