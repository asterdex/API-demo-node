# Web3 API Key Creation Demo / Web3 API密钥创建示例

This demo shows how to create API keys using Web3 wallet signatures.

本示例展示如何使用Web3钱包签名创建API密钥。

## Features / 功能特点

- ✅ Get nonce / 获取随机数
- ✅ Sign message with wallet / 使用钱包签名消息
- ✅ Login with Web3 / 使用Web3登录
- ✅ Create API key / 创建API密钥
- ✅ Bilingual comments (English/Chinese) / 双语注释（英文/中文）

## Prerequisites / 前置要求

- Node.js v14 or higher / Node.js v14或更高版本
- A wallet with private key / 一个有私钥的钱包
- Basic understanding of Web3 / Web3基础知识

## Installation / 安装

```bash
# Install dependencies / 安装依赖
npm install
```

## Configuration / 配置

Edit `config.js` and fill in your wallet information:

编辑 `config.js` 并填入您的钱包信息：

```javascript
module.exports = {
    PRIVATE_KEY: '0xYOUR_PRIVATE_KEY_HERE',  // ⚠️ Never share this! / 永远不要分享！
    WALLET_ADDRESS: '0xYOUR_WALLET_ADDRESS_HERE',
    CHAIN_ID: 56,  // 56 for BSC / 56代表BSC
    // ... other configs
};
```

## Important Configuration / 重要配置

Make sure your `config.js` has:
确保您的 `config.js` 包含：

```javascript
SOURCE_CODE: 'ae'  // ✅ For regular users / 普通用户
// NOT 'broker'     // ❌ Only for broker accounts / 仅用于经纪商账户
```

### Quick Start / 快速开始

**To create an API key (recommended):**

**创建API密钥（推荐）：**

```bash
npm run create-api-key
```

This automatically runs the complete workflow: get nonce → sign → create API key

这会自动运行完整的工作流程：获取随机数 → 签名 → 创建API密钥

---

## Usage / 使用方法

### Method 1: Run individual steps (for testing only) / 方法1：运行单独的步骤（仅用于测试）

⚠️ **Warning:** Running steps individually may cause "nonce expired" errors. Use Method 2 for production.

⚠️ **警告：** 单独运行步骤可能导致"nonce过期"错误。生产环境请使用方法2。

```bash
# Step 1: Get nonce / 步骤1：获取随机数
npm run get-nonce
# or / 或者
node 01_getNonce.js

# Step 2: Sign message / 步骤2：签名消息
npm run sign
# or / 或者
node 02_signMessage.js

# Step 3: Login / 步骤3：登录
npm run login
# or / 或者
node 03_login.js

# Step 4: Create API key / 步骤4：创建API密钥
npm run create-api-key
# or / 或者
node 04_createApiKey.js
```

### Method 2: Complete flow (Recommended) / 方法2：完整流程（推荐）⭐

The easiest way - create API key directly:

最简单的方法 - 直接创建API密钥：

```bash
npm run create-api-key
```

This will automatically:
这将自动：
1. Get a fresh nonce / 获取新的nonce
2. Sign the message / 签名消息
3. Create your API key / 创建您的API密钥

**No login required!** / **无需登录！**

## File Structure / 文件结构

```
web3-api-key-demo/
├── 📄 README.md                    # Main documentation / 主要文档
├── 📄 SOLUTION.md                  # ⭐ Problem solution / 问题解决方案
├── 📄 SUCCESS_NOTES.md             # Login success notes / 登录成功记录
├── 📄 WORKFLOW_GUIDE.md            # Workflow details / 工作流程详情
├── ⚙️  config.js                    # Configuration / 配置文件 ⭐
├── 🔧 01_getNonce.js               # Get nonce / 获取随机数
├── 🔧 02_signMessage.js            # Sign message / 签名消息
├── 🔧 03_login.js                  # Web3 login / Web3登录
├── 🔧 04_createApiKey.js           # Create API key / 创建API密钥 ⭐
├── 🧪 05_testLogin.js              # Test login methods / 测试登录方法
└── 📦 package.json                 # Dependencies / 依赖配置
```

## Process Flow / 流程说明

### ⚠️ Important: Two Different Workflows / 重要：两种不同的工作流程

#### Workflow A: Create API Key (Recommended) / 工作流程A：创建API密钥（推荐）
**Steps: 1 → 2 → 4** (No login needed / 无需登录)

This is the direct way to create API keys:
这是创建API密钥的直接方式：

1. **Get Nonce** / 获取随机数
2. **Sign Message** / 签名消息  
4. **Create API Key** / 创建API密钥 ✅

```bash
npm run create-api-key  # This runs step 4, which includes steps 1-2
```

#### Workflow B: Web Application Login / 工作流程B：Web应用登录
**Steps: 1 → 2 → 3** (For web apps to get token / 用于Web应用获取token)

This is mainly for web applications that need a user session:
这主要用于需要用户会话的Web应用：

1. **Get Nonce** / 获取随机数
2. **Sign Message** / 签名消息
3. **Login** / 登录 ✅

---

### Step 1: Get Nonce / 步骤1：获取随机数
Request a nonce from the server for your wallet address.

从服务器请求您钱包地址的随机数。

**Note**: Each operation (login or create API key) needs a fresh nonce.

**注意**：每个操作（登录或创建API密钥）都需要一个新的随机数。

### Step 2: Sign Message / 步骤2：签名消息
Sign the message "You are signing into Astherus {nonce}" with your wallet private key.

使用您的钱包私钥签名消息 "You are signing into Astherus {nonce}"。

### Step 3: Login / 步骤3：登录 (Optional / 可选)
Login with the signature to get an access token (mainly for web applications).

使用签名登录以获取访问令牌（主要用于Web应用）。

**This step is NOT required for creating API keys!**

**创建API密钥不需要此步骤！**

### Step 4: Create API Key / 步骤4：创建API密钥
Create an API key using the signature directly (no login needed). The response includes:

直接使用签名创建API密钥（无需登录）。响应包括：
- `apiKey`: Your API key / 您的API密钥
- `apiSecret`: Your API secret / 您的API密钥密码
- `keyId`: Key ID / 密钥ID

## Important Notes / 重要说明

### ⚠️ Security / 安全

1. **NEVER share your private key!** / **永远不要分享您的私钥！**
2. Keep your API key and secret safe / 妥善保管您的API密钥和密码
3. Don't commit `config.js` with real credentials to version control / 不要将包含真实凭证的 `config.js` 提交到版本控制

### ⚠️ API Key Management / API密钥管理

1. **Save the returned `apiKey` and `apiSecret` immediately!** / **立即保存返回的 `apiKey` 和 `apiSecret`！**
2. If you lose them, you cannot retrieve them / 如果丢失，无法找回
3. You can only create new API keys / 只能创建新的API密钥
4. API keys cannot be deleted by users currently / API密钥目前无法由用户删除

## API Endpoints / API端点

- Get Nonce / 获取随机数: `POST /bapi/futures/v1/public/future/web3/get-nonce`
- Login / 登录: `POST /bapi/futures/v1/public/future/web3/ae/login`
- Create API Key / 创建API密钥: `POST /bapi/futures/v1/public/future/web3/broker-create-api-key`

## Dependencies / 依赖

- **axios**: HTTP client / HTTP客户端
- **ethers**: Ethereum library for wallet operations / 以太坊库用于钱包操作

## Troubleshooting / 故障排除

### Error: "The account does not exist, please open a futures account" / 错误："账户不存在，请开通期货账户"

This error occurs when using `SOURCE_CODE: 'broker'`. 

当使用 `SOURCE_CODE: 'broker'` 时会出现此错误。

**Fix:** Change to `SOURCE_CODE: 'ae'` in your `config.js`

**修复：** 在 `config.js` 中改为 `SOURCE_CODE: 'ae'`

---

### Error: Invalid private key / 错误：无效的私钥
Make sure your private key starts with `0x` and is 66 characters long.

确保您的私钥以 `0x` 开头且长度为66个字符。

### Error: Signature verification failed / 错误：签名验证失败
Ensure the wallet address matches the private key.

确保钱包地址与私钥匹配。

### Error: Nonce expired (during login) / 错误：随机数过期（登录时）

- For login: Use `type="LOGIN"` / 登录使用 `type="LOGIN"`
- For API key: Use `type="CREATE_API_KEY"` / 创建API密钥使用 `type="CREATE_API_KEY"`

The code already handles this correctly. If you still see this error, run:

代码已经正确处理了这个问题。如果仍然看到此错误，运行：

```bash
npm run test-login  # Test different login methods
```

## Support / 支持

For more information, please refer to:

更多信息，请参考：
- **⭐ Solution:** [SOLUTION.md](./SOLUTION.md) - How the problem was solved / 问题如何解决
- **Success Notes:** [SUCCESS_NOTES.md](./SUCCESS_NOTES.md) - Login solution / 登录解决方案
- **Workflow Guide:** [WORKFLOW_GUIDE.md](./WORKFLOW_GUIDE.md) - Detailed workflows / 详细工作流程
- **API Documentation:** [api-key-registration-en.md](https://github.com/asterdex/api-docs/blob/master/aster-api-key-registration.md)

## License / 许可证

MIT

