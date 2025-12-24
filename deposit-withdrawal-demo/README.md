# Deposit & Withdrawal API Demo / 充提币API示例

This directory contains examples for Deposit and Withdrawal APIs.  
此目录包含充提币API的示例。

## ⚠️ Important Notice / 重要提示

**Withdrawal operations require EIP712 signatures!**  
**提币操作需要EIP712签名！**

Before using withdrawal APIs, you must:
使用提币API之前，您必须：

1. Understand EIP712 signature mechanism / 了解EIP712签名机制
2. Generate proper signatures using your wallet / 使用钱包生成正确的签名
3. Read section 4 of `11-deposit-withdrawal-en.md` for details / 详细信息请阅读 `11-deposit-withdrawal-en.md` 第4节

---

## Setup / 设置

1. Install dependencies / 安装依赖:
```bash
npm install
```

2. Configure your API credentials / 配置您的API凭证:
   - Edit `config.js` / 编辑 `config.js`
   - Set `API_KEY`, `SECRET_KEY`, and `WALLET_ADDRESS`
   - 设置 `API_KEY`、`SECRET_KEY` 和 `WALLET_ADDRESS`

---

## File List / 文件列表

### Query APIs (No signature required) / 查询API（无需签名）

- `01_getDepositAssets.js` - Get all deposit assets / 获取所有充币资产
- `02_getWithdrawAssets.js` - Get all withdraw assets / 获取所有提币资产
- `03_estimateWithdrawFee.js` - Estimate withdraw fee / 估算提币手续费

### Withdrawal APIs (Signature required) / 提币API（需要签名）

#### EVM Networks (BSC, Ethereum, Arbitrum) / EVM网络

- `04_withdrawEvmFutures.js` - EVM withdraw (Futures) / EVM提币（期货）
- `05_withdrawEvmSpot.js` - EVM withdraw (Spot) / EVM提币（现货）

#### Solana Network / Solana网络

- `06_withdrawSolanaFutures.js` - Solana withdraw (Futures) / Solana提币（期货）
- `07_withdrawSolanaSpot.js` - Solana withdraw (Spot) / Solana提币（现货）

### Configuration / 配置

- `config.js` - API configuration / API配置
- `utils.js` - Utility functions / 工具函数

---

## Usage Examples / 使用示例

### 1. Get Deposit Assets / 获取充币资产

```bash
npm run deposit-assets
# or / 或者
node 01_getDepositAssets.js
```

**Output / 输出:**
```json
{
  "code": "000000",
  "data": [
    {
      "name": "ASTER",
      "displayName": "ASTER",
      "contractAddress": "0x000ae314e2a2172a039b26378814c252734f556a",
      "decimals": 18,
      "network": "EVM",
      "chainId": 56
    }
  ],
  "success": true
}
```

---

### 2. Get Withdraw Assets / 获取提币资产

```bash
npm run withdraw-assets
# or / 或者
node 02_getWithdrawAssets.js
```

---

### 3. Estimate Withdraw Fee / 估算提币手续费

```bash
npm run estimate-fee
# or / 或者
node 03_estimateWithdrawFee.js
```

**Output / 输出:**
```json
{
  "code": "000000",
  "data": {
    "gasLimit": 200000,
    "tokenPrice": 1.12357820,
    "gasCost": 0.0891,
    "gasUsdValue": 0.1
  },
  "success": true
}
```

---

### 4. Withdraw (With Signature) / 提币（需要签名）

⚠️ **Important:** Withdrawal examples are templates only!  
⚠️ **重要：** 提币示例仅为模板！

You need to:
您需要：

1. Generate EIP712 signature / 生成EIP712签名
2. Update the parameters / 更新参数
3. Uncomment the execution code / 取消注释执行代码

```javascript
// Example in 04_withdrawEvmFutures.js
const params = {
    chainId: 56,
    asset: 'USDT',
    amount: '10',
    fee: '0.1',
    receiver: 'YOUR_ADDRESS',
    nonce: String(Date.now() * 1000),
    userSignature: 'YOUR_EIP712_SIGNATURE' // Generate this!
};
```

---

## API Endpoints / API端点

### Public Endpoints / 公开端点

| Endpoint / 端点 | Method / 方法 | Description / 描述 |
|----------------|--------------|------------------|
| `/bapi/futures/v1/public/future/aster/deposit/assets` | GET | Get deposit assets / 获取充币资产 |
| `/bapi/futures/v1/public/future/aster/withdraw/assets` | GET | Get withdraw assets / 获取提币资产 |
| `/bapi/futures/v1/public/future/aster/estimate-withdraw-fee` | GET | Estimate fee / 估算手续费 |

### Private Endpoints / 私有端点

| Endpoint / 端点 | Method / 方法 | Account / 账户 | Network / 网络 |
|----------------|--------------|---------------|--------------|
| `/fapi/aster/user-withdraw` | POST | Futures / 期货 | EVM |
| `/api/v1/aster/user-withdraw` | POST | Spot / 现货 | EVM |
| `/fapi/aster/user-solana-withdraw` | POST | Futures / 期货 | Solana |
| `/api/v1/aster/user-solana-withdraw` | POST | Spot / 现货 | Solana |

---

## Supported Networks / 支持的网络

### EVM Networks / EVM网络

| Chain / 链 | Chain ID | Name / 名称 |
|-----------|----------|-----------|
| BSC | 56 | Binance Smart Chain |
| Ethereum | 1 | Ethereum Mainnet |
| Arbitrum | 42161 | Arbitrum One |

### Solana

| Chain / 链 | Chain ID | Name / 名称 |
|-----------|----------|-----------|
| Solana | 101 | Solana Mainnet |

---

## EIP712 Signature / EIP712签名

For EVM withdrawals, you need to generate an EIP712 signature.  
对于EVM提币，您需要生成EIP712签名。

### EIP712 Domain

```javascript
{
  "name": "Aster",
  "version": "1",
  "chainId": 56,  // The withdrawal chain ID / 提币链ID
  "verifyingContract": "0x0000000000000000000000000000000000000000"
}
```

### EIP712 Types

```javascript
{
  "Action": [
    {"name": "type", "type": "string"},               // "Withdraw"
    {"name": "destination", "type": "address"},        // Receipt address
    {"name": "destination Chain", "type": "string"},   // "BSC", "ETH", "Arbitrum"
    {"name": "token", "type": "string"},               // "ASTER", "USDT"
    {"name": "amount", "type": "string"},              // "1.23"
    {"name": "fee", "type": "string"},                 // "0.01"
    {"name": "nonce", "type": "uint256"},              // timestamp * 1000
    {"name": "aster chain", "type": "string"}          // "Mainnet"
  ]
}
```

### Example with ethers.js

```javascript
const { ethers } = require('ethers');

const domain = {
  name: 'Aster',
  version: '1',
  chainId: 56,
  verifyingContract: '0x0000000000000000000000000000000000000000'
};

const types = {
  Action: [
    { name: 'type', type: 'string' },
    { name: 'destination', type: 'address' },
    { name: 'destination Chain', type: 'string' },
    { name: 'token', type: 'string' },
    { name: 'amount', type: 'string' },
    { name: 'fee', type: 'string' },
    { name: 'nonce', type: 'uint256' },
    { name: 'aster chain', type: 'string' }
  ]
};

const value = {
  type: 'Withdraw',
  destination: '0xYourAddress',
  'destination Chain': 'BSC',
  token: 'ASTER',
  amount: '1.0',
  fee: '0.1',
  nonce: Date.now() * 1000,
  'aster chain': 'Mainnet'
};

const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY');
const signature = await wallet._signTypedData(domain, types, value);
```

---

## Security / 安全提示

### ⚠️ Important / 重要

1. **Never share your private key!** / **永远不要分享您的私钥！**
2. **Double-check recipient addresses** / **仔细检查接收地址**
3. **Verify withdrawal amounts and fees** / **验证提币数量和手续费**
4. **Test with small amounts first** / **先用小额测试**
5. **Keep your API keys secure** / **保护好您的API密钥**

### Best Practices / 最佳实践

- Always verify the network and chain ID / 始终验证网络和链ID
- Use the estimate fee API before withdrawing / 提币前使用估算手续费API
- Store signatures securely / 安全存储签名
- Implement rate limiting / 实施速率限制
- Log all withdrawal operations / 记录所有提币操作

---

## Troubleshooting / 故障排除

### Common Errors / 常见错误

#### 1. "Invalid signature" / "无效签名"
- Check EIP712 domain and types / 检查EIP712域和类型
- Verify nonce matches in signature and request / 验证签名和请求中的nonce匹配
- Ensure correct chain ID / 确保链ID正确

#### 2. "Insufficient balance" / "余额不足"
- Check account balance / 检查账户余额
- Include withdrawal fee in calculation / 计算中包含提币手续费

#### 3. "Invalid address" / "无效地址"
- Verify address format / 验证地址格式
- Check network compatibility / 检查网络兼容性

---

## Support / 支持

For more information, please refer to:
更多信息，请参考：

- **API Documentation:** `https://github.com/asterdex/api-docs/blob/master/aster-deposit-withdrawal.md`
- **Configuration Guide:** `CONFIGURATION_GUIDE.md`
- **Main README:** `../README.md`

---

## License / 许可证

MIT

