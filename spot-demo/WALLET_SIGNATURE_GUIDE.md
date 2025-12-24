# 钱包签名完整指南 / Complete Wallet Signature Guide

## 概述 / Overview

本项目中所有需要钱包签名的接口都已实现自动签名功能。  
All endpoints requiring wallet signatures now support automatic signature generation.

## 涉及钱包签名的接口 / Endpoints with Wallet Signatures

### 1. **创建API密钥 / Create API Key** 
- **文件**: `26_createApiKey.js`
- **接口**: `POST /api/v1/createApiKey`
- **签名内容**: Nonce（从服务器获取）
- **签名方法**: Ethereum personal_sign (EIP-191)

### 2. **发送到地址 / Send To Address**
- **文件**: `22_sendToAddress.js`
- **接口**: `POST /api/v1/asset/sendToAddress`
- **签名内容**: 完整的请求参数查询字符串
- **签名方法**: Ethereum personal_sign (EIP-191)

## 签名工具模块 / Signature Utility Module

所有签名功能都整合在 `walletSignature.js` 模块中：  
All signature functions are integrated in the `walletSignature.js` module:

```javascript
const { signMessage, verifySignature, getAddressFromPrivateKey } = require('./walletSignature');

// Sign a message / 签名消息
const signature = await signMessage('message to sign', privateKey);

// Verify signature / 验证签名
const isValid = verifySignature('message', signature, walletAddress);

// Get address from private key / 从私钥获取地址
const address = getAddressFromPrivateKey(privateKey);
```

## 配置设置 / Configuration Setup

### 1. 安装依赖 / Install Dependencies

```bash
cd spot-demo
npm install
```

这会自动安装 `ethers` 库（已添加到 package.json）。  
This will automatically install the `ethers` library (already added to package.json).

### 2. 配置钱包信息 / Configure Wallet Info

编辑 `config.js` 文件：  
Edit `config.js` file:

```javascript
module.exports = {
    // Base URL / 基础URL
    BASE_URL: 'https://sapi.asterdex.com',
    
    // API Key / API密钥
    API_KEY: 'your_api_key_here',
    
    // Secret Key / 密钥
    SECRET_KEY: 'your_secret_key_here',
    
    // Wallet Private Key (for wallet signatures) / 钱包私钥（用于钱包签名）
    // ⚠️ KEEP THIS SECURE! Never commit to version control!
    // ⚠️ 保密！永远不要提交到版本控制！
    PRIVATE_KEY: '0x1234567890abcdef...', // 64 characters hex / 64位十六进制
    
    // Wallet Address / 钱包地址
    WALLET_ADDRESS: '0xYourWalletAddress...', // Your wallet address / 您的钱包地址
    
    // Default trading pair / 默认交易对
    DEFAULT_SYMBOL: 'BNBUSDT',
    
    // Receive window (milliseconds) / 接收窗口（毫秒）
    RECV_WINDOW: 5000
};
```

## 使用示例 / Usage Examples

### 示例 1: 创建API密钥 / Example 1: Create API Key

```javascript
// 26_createApiKey.js

// 1. 配置钱包信息（在config.js中）
// Configure wallet info (in config.js)

// 2. 运行脚本（取消注释执行代码）
// Run script (uncomment execution code)
node 26_createApiKey.js

// 输出 / Output:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   Create API Key with Auto Signature
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 
// === Creating API Key / 创建API密钥 ===
// 
// Step 1: Getting nonce / 获取nonce
// ✓ Nonce received / 已收到nonce: abc123
// 
// Step 2: Generating signature / 生成签名
// ✓ Signature generated / 签名已生成
// 
// Step 3: Creating API key / 创建API密钥
// ✓ API Key Created Successfully!
// 
// API Credentials:
//   ✓ API Key: xxxxxxxxxx
//   ✓ Secret Key: yyyyyyyyyy
```

### 示例 2: 发送到地址 / Example 2: Send To Address

```javascript
// 22_sendToAddress.js

// 1. 配置钱包信息和API密钥
// Configure wallet info and API key

// 2. 设置转账参数
// Set transfer parameters
const transferParams = {
    asset: 'USDT',
    address: '0xRecipientAddress',
    amount: '10',
    memo: 'Test transfer'  // Optional / 可选
};

// 3. 执行转账
// Execute transfer
const result = await sendToAddress(transferParams);

// 输出 / Output:
// === Send To Address / 发送到地址 ===
// 
// Step 1: Building request parameters / 构建请求参数
// ✓ Query string built
// 
// Step 2: Generating wallet signature / 生成钱包签名
// ✓ Wallet signature generated
// 
// Step 3: Sending transaction / 发送交易
// ✓ Transaction Successful!
// 
// Transaction Details:
//   ✓ Transaction Hash: 0x123...
//   ✓ Asset: USDT
//   ✓ Amount: 10
//   ✓ To Address: 0x...
```

## 签名流程详解 / Signature Process Details

### Ethereum Personal Sign (EIP-191)

所有钱包签名都使用以太坊标准的 personal_sign 方法：  
All wallet signatures use Ethereum's standard personal_sign method:

```javascript
// 1. Prepare message / 准备消息
const message = "message to sign";

// 2. Create wallet / 创建钱包
const wallet = new ethers.Wallet(privateKey);

// 3. Sign message / 签名消息
const signature = await wallet.signMessage(message);

// Signature format / 签名格式:
// 0x + 130 hex characters (65 bytes)
// - r: 32 bytes
// - s: 32 bytes  
// - v: 1 byte (recovery id)
```

### 签名验证 / Signature Verification

```javascript
// Recover signer address from signature / 从签名恢复签名者地址
const recoveredAddress = ethers.verifyMessage(message, signature);

// Verify it matches expected address / 验证是否匹配期望的地址
if (recoveredAddress.toLowerCase() === expectedAddress.toLowerCase()) {
    console.log('✓ Valid signature / 签名有效');
}
```

## 安全最佳实践 / Security Best Practices

### 1. 私钥管理 / Private Key Management

❌ **不要这样做 / DON'T:**
```javascript
// 硬编码私钥 / Hard-coded private key
const PRIVATE_KEY = '0x1234...'; // ❌ NEVER DO THIS!
```

✅ **这样做 / DO:**
```javascript
// 使用环境变量 / Use environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// 或使用配置文件（添加到.gitignore）
// Or use config file (add to .gitignore)
const config = require('./config');
const PRIVATE_KEY = config.PRIVATE_KEY;
```

### 2. .gitignore 配置 / .gitignore Configuration

创建 `.gitignore` 文件：  
Create `.gitignore` file:

```gitignore
# API Credentials / API凭证
config.js

# Environment Variables / 环境变量
.env
.env.local

# Node modules / Node模块
node_modules/

# Logs / 日志
*.log
```

### 3. 环境变量使用 / Environment Variables Usage

创建 `.env` 文件（添加到 .gitignore）：  
Create `.env` file (add to .gitignore):

```env
PRIVATE_KEY=0x1234567890abcdef...
WALLET_ADDRESS=0xYourAddress...
API_KEY=your_api_key
SECRET_KEY=your_secret_key
BASE_URL=https://sapi.asterdex.com
```

在代码中使用：  
Use in code:

```javascript
require('dotenv').config();

module.exports = {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    WALLET_ADDRESS: process.env.WALLET_ADDRESS,
};
```

### 4. 权限最小化 / Minimize Permissions

- 为不同用途使用不同的钱包 / Use different wallets for different purposes
- 限制钱包余额 / Limit wallet balance
- 定期轮换密钥 / Rotate keys regularly

## 故障排除 / Troubleshooting

### 问题 1: "Invalid private key"

**原因 / Cause:**
- 私钥格式错误 / Wrong private key format
- 私钥长度不正确 / Incorrect private key length

**解决方案 / Solution:**
```javascript
// 正确的私钥格式 / Correct private key format:
// - 以 0x 开头 / Starts with 0x
// - 66 个字符（0x + 64 位十六进制）/ 66 characters (0x + 64 hex digits)
const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
```

### 问题 2: "Signature verification failed"

**原因 / Cause:**
- 消息内容不匹配 / Message content mismatch
- 使用了错误的私钥 / Wrong private key used
- 签名过程中的编码问题 / Encoding issues during signing

**解决方案 / Solution:**
- 确保消息内容完全一致 / Ensure message content is identical
- 验证钱包地址匹配 / Verify wallet address matches
- 检查字符编码（UTF-8）/ Check character encoding (UTF-8)

### 问题 3: "Module not found: ethers"

**解决方案 / Solution:**
```bash
npm install ethers
```

### 问题 4: "Transaction failed"

**可能原因 / Possible Causes:**
- API密钥无效 / Invalid API key
- 签名不正确 / Incorrect signature
- 请求参数错误 / Wrong request parameters
- 网络问题 / Network issues

**调试步骤 / Debug Steps:**
1. 验证API密钥有效 / Verify API key is valid
2. 检查签名生成是否成功 / Check signature generation succeeds
3. 查看详细错误消息 / Review detailed error message
4. 检查网络连接 / Check network connection

## 代码模板 / Code Templates

### 通用签名模板 / Generic Signature Template

```javascript
const { signMessage } = require('./walletSignature');
const config = require('./config');

async function signAndSendRequest(params) {
    try {
        // 1. 构建消息 / Build message
        const message = buildMessageToSign(params);
        
        // 2. 生成签名 / Generate signature
        const signature = await signMessage(message, config.PRIVATE_KEY);
        
        // 3. 发送请求 / Send request
        const response = await axios.post(endpoint, params, {
            headers: {
                'X-MBX-APIKEY': config.API_KEY,
                'X-SIGNATURE': signature
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
```


## 相关文档 / Related Documentation

- [Ethers.js Documentation](https://docs.ethers.org/)
- [EIP-191: Signed Data Standard](https://eips.ethereum.org/EIPS/eip-191)
- [EIP-712: Typed Structured Data](https://eips.ethereum.org/EIPS/eip-712)
- AsterDEX API Documentation

## 技术支持 / Technical Support

如有问题，请参考：  
For issues, please refer to:

1. 本文档的故障排除部分 / Troubleshooting section in this document
2. 示例代码中的注释 / Comments in example code
3. AsterDEX官方文档 / AsterDEX official documentation
4. Ethers.js官方文档 / Ethers.js official documentation

---


