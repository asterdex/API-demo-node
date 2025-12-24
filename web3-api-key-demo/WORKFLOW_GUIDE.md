# Workflow Guide / 工作流程指南

## 🎯 Quick Start / 快速开始

**To create an API key, just run:** / **要创建API密钥，只需运行：**

```bash
npm run create-api-key
```

That's it! This will automatically:
就这样！这将自动：
1. Get a fresh nonce / 获取新的随机数
2. Sign the message / 签名消息
3. Create your API key / 创建您的API密钥

**No login required!** / **无需登录！**

---

## 📋 Understanding the Workflows / 理解工作流程

There are TWO different workflows in this API system:
此API系统中有两种不同的工作流程：

### Workflow A: Create API Key / 工作流程A：创建API密钥
**Purpose:** Create API keys for programmatic access
**目的：** 为编程访问创建API密钥

**Steps:** 1 → 2 → 4
- ✅ Get Nonce / 获取随机数
- ✅ Sign Message / 签名消息
- ❌ **SKIP** Login / **跳过**登录
- ✅ Create API Key / 创建API密钥

**Command:** `npm run create-api-key`

---

### Workflow B: Web Application Login / 工作流程B：Web应用登录  
**Purpose:** Login to web application and get session token
**目的：** 登录Web应用并获取会话令牌

**Steps:** 1 → 2 → 3
- ✅ Get Nonce / 获取随机数
- ✅ Sign Message / 签名消息
- ✅ Login / 登录
- ❌ **SKIP** Create API Key / **跳过**创建API密钥

**Command:** `npm run login`

---

## ⚠️ Common Issues / 常见问题

### Issue 1: "The account does not exist, please open a futures account" / "账户不存在，请开通期货账户"


**Symptom:** / **症状：**
```json
{
  "code": "40000005",
  "message": "The account does not exist, please open a futures account.",
  "success": false
}
```

**Cause:** / **原因：**
- Using `SOURCE_CODE: 'broker'` instead of `'ae'`
- 使用 `SOURCE_CODE: 'broker'` 而不是 `'ae'`

**Solution:** / **解决方案：**
- **Change `SOURCE_CODE` to `'ae'` in `config.js`!** / **在 `config.js` 中将 `SOURCE_CODE` 改为 `'ae'`！**

```javascript
// In config.js / 在 config.js 中
SOURCE_CODE: 'ae'  // ✅ For regular users / 普通用户
// NOT 'broker'    // ❌ Only for broker accounts / 仅用于经纪商账户
```

---

### Issue 2: "nonce expired" error / "nonce过期"错误

**Symptom:** / **症状：**
```json
{
  "code": "099008",
  "message": "nonce expired",
  "success": false
}
```

**Cause:** / **原因：**
- Each nonce is single-use and time-limited
- 每个nonce都是单次使用且有时间限制
- You cannot reuse a nonce for different operations
- 不能将一个nonce重复用于不同操作

**Solution:** / **解决方案：**
- Always get a fresh nonce for each operation
- 每次操作都获取新的nonce
- Don't manually chain operations - use the complete flow functions
- 不要手动连接操作 - 使用完整的流程函数

**Correct:** ✅
```bash
npm run create-api-key  # Gets fresh nonce automatically
```

**Incorrect:** ❌
```bash
# Don't do this:
node 01_getNonce.js      # Gets nonce for CREATE_API_KEY
node 02_signMessage.js   # Signs with that nonce
node 03_login.js         # Tries to login with same signature - FAILS!
```

---

### Issue 3: Mixing workflows / 混淆工作流程

**Problem:** / **问题：**
Trying to login AND create API key in the same flow.
尝试在同一流程中既登录又创建API密钥。

**Solution:** / **解决方案：**
Choose one workflow based on your needs:
根据需求选择一个工作流程：

- **Need API keys?** → Use Workflow A (no login)
- **需要API密钥？** → 使用工作流程A（无需登录）
- **Need web session?** → Use Workflow B (no API key creation)
- **需要Web会话？** → 使用工作流程B（不创建API密钥）

---

## 📝 Step-by-Step Examples / 分步示例

### Example 1: Create API Key (Most Common) / 示例1：创建API密钥（最常见）

```bash
# One command does everything
# 一条命令完成所有操作
npm run create-api-key
```

Output:
```
STEP 1-2: Getting fresh nonce and signing message
步骤1-2：获取新随机数并签名消息

✓ Nonce obtained / 随机数已获取: 124187
✓ Message signed successfully / 消息签名成功

STEP 4: Creating API key with the signature
步骤4：使用签名创建API密钥

✓ API Key created successfully / API密钥创建成功
API Key: 4a2e11b243b2ad75981edf359ae02e873bf88b699196170d998d8266f5eb9f32
API Secret: 72911505267b24a8efe8f246d06c324b787d2f3f7cb8b5b80ef1698ee1486e25
```

---

### Example 2: Web Login (For Web Apps) / 示例2：Web登录（用于Web应用）

```bash
# Login to get session token
# 登录获取会话令牌
npm run login
```

**Note:** This is separate from API key creation!
**注意：** 这与API密钥创建是分开的！

---

## 🔐 Security Notes / 安全说明

1. **Each nonce is unique** / **每个nonce都是唯一的**
   - Generated fresh for each operation
   - 为每个操作新生成
   - Cannot be reused
   - 不能重复使用

2. **Signatures are operation-specific** / **签名是特定于操作的**
   - A signature for "CREATE_API_KEY" cannot be used for "LOGIN"
   - 用于"CREATE_API_KEY"的签名不能用于"LOGIN"
   - Always get a fresh nonce and signature for each operation
   - 每次操作都要获取新的nonce和签名

3. **Nonces expire quickly** / **Nonce快速过期**
   - Complete the operation within a few minutes
   - 在几分钟内完成操作
   - Don't save nonces for later use
   - 不要保存nonce供以后使用

---

## 🚀 Best Practices / 最佳实践

### ✅ DO / 推荐做法

- Use the complete flow functions (`npm run create-api-key`)
- 使用完整的流程函数
- Let the scripts handle nonce freshness automatically
- 让脚本自动处理nonce的新鲜度
- Save the returned API key and secret immediately
- 立即保存返回的API密钥和密码

### ❌ DON'T / 不推荐做法

- Don't manually run steps 1, 2, 3, 4 separately
- 不要手动分别运行步骤1、2、3、4
- Don't reuse nonces or signatures
- 不要重复使用nonce或签名
- Don't mix login and API key creation workflows
- 不要混合登录和API密钥创建工作流程

---


## 💡 Quick Reference / 快速参考

| Task / 任务 | Command / 命令 | Workflow / 工作流程 |
|------------|----------------|-------------------|
| Create API Key / 创建API密钥 | `npm run create-api-key` | A: 1→2→4 |
| Web Login / Web登录 | `npm run login` | B: 1→2→3 |
| Just get nonce / 仅获取随机数 | `npm run get-nonce` | Testing / 测试 |
| Just sign / 仅签名 | `npm run sign` | Testing / 测试 |



