# Futures V3 API Demo / 期货V3 API示例

## ⚠️ 重要提示 / Important Notice

**Futures V3 API 使用 EIP-712 类型化数据签名认证，与 Spot 和 Futures API 完全不同！**

**Futures V3 API uses EIP-712 typed data signature authentication, completely different from Spot and Futures API!**

---

## 🔐 认证方式 / Authentication Method

### EIP-712 类型化数据签名 / EIP-712 Typed Data Signature

Futures V3 需要以下参数：
- `user` - 主账户钱包地址
- `signer` - API钱包地址
- `nonce` - 微秒时间戳（带随机数）
- `signature` - EIP-712 签名

签名流程：
1. 将参数构建为查询字符串格式（key=value&key=value）
2. 构造 EIP-712 类型化数据结构（Domain + Types + Message）
3. 使用 ethers.js 的 signTypedData 方法签名
4. 生成符合 EIP-712 标准的签名

**EIP-712 优势**：
- ✅ 符合以太坊标准（EIP-712）
- ✅ MetaMask 等钱包可直接显示签名内容
- ✅ 更好的安全性和可读性

---

## 📦 安装依赖 / Install Dependencies

```bash
cd futures-v3-demo
npm install
```

依赖包括：
- `axios` - HTTP 客户端
- `ethers` - Web3 库
- `@ethereumjs/util` - 以太坊工具

---

## ⚙️ 配置 / Configuration

### 1. 获取API钱包 / Get API Wallet

访问 AsterDEX 创建 API 钱包：
- 英文：https://www.asterdex.com/en/api-wallet
- 中文：https://www.asterdex.com/zh/api-wallet

您将获得：
- `signer` - API钱包地址
- `privateKey` - API钱包私钥

### 2. 编辑 config.js

```javascript
module.exports = {
    // 基础URL / Base URL
    BASE_URL: 'https://fapi.asterdex.com',
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // EIP-712 签名认证 / EIP-712 Signature Authentication
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // 主账户钱包地址（您的交易账户）
    USER_ADDRESS: '0xYourMainWalletAddress...',
    
    // API钱包地址（从API管理页面获取）
    SIGNER_ADDRESS: '0xYourAPIWalletAddress...',
    
    // API钱包私钥（从API管理页面获取）
    PRIVATE_KEY: '0xYourAPIWalletPrivateKey...',
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // EIP-712 域配置 / EIP-712 Domain Configuration
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    EIP712_DOMAIN: {
        name: 'AsterSignTransaction',
        version: '1',
        chainId: 56,  // BSC Chain ID
        verifyingContract: '0x0000000000000000000000000000000000000000'
    },
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 其他设置 / Other Settings
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    DEFAULT_SYMBOL: 'BTCUSDT',
    RECV_WINDOW: 5000
};
```

**EIP-712 域说明 / EIP-712 Domain Explanation**：
- `name`: 签名应用名称（固定为 'AsterSignTransaction'）
- `version`: 版本号（当前为 '1'）
- `chainId`: 链ID（56 = BSC，714 = testnet）
- `verifyingContract`: 验证合约地址（使用零地址）

⚠️ **安全提示**：
- 永远不要将真实的私钥提交到 Git
- `config.js` 已在 `.gitignore` 中
- 使用测试账户进行测试

---

## 📘 EIP-712 配置详解 / EIP-712 Configuration Guide

### 什么是 EIP-712 Domain？

EIP-712 Domain 定义了签名的上下文环境，包含 4 个关键字段：

```javascript
EIP712_DOMAIN: {
    name: 'AsterSignTransaction',     // 应用名称（固定）
    version: '1',                      // 版本（固定）
    chainId: 56,                       // 链ID（重要！）
    verifyingContract: '0x0000...'    // 验证合约（固定为零地址）
}
```

### chainId 配置说明

| 环境 | chainId | 说明 |
|------|---------|------|
| 生产环境 | `56` | BSC (Binance Smart Chain) 主网 |
| 测试网 | `714` | AsterDEX 测试网络 |

⚠️ **重要**：chainId 必须与服务器端配置一致，否则签名验证会失败！

### 配置示例

```javascript
// 生产环境配置
module.exports = {
    BASE_URL: 'https://fapi.asterdex.com',
    EIP712_DOMAIN: {
        name: 'AsterSignTransaction',
        version: '1',
        chainId: 56,  // 生产环境使用 56
        verifyingContract: '0x0000000000000000000000000000000000000000'
    }
};

// 测试网配置
module.exports = {
    BASE_URL: 'https://fapi.asterdex-testnet.com',
    EIP712_DOMAIN: {
        name: 'AsterSignTransaction',
        version: '1',
        chainId: 714,  // 测试网使用 714
        verifyingContract: '0x0000000000000000000000000000000000000000'
    }
};
```

---

## 🚀 使用示例 / Usage Examples

### 查询持仓模式 / Get Position Mode

```bash
node 17_getPositionMode.js
```

### 下单 / Place Order

```bash
node 20_order.js
```

### 查询账户信息 / Get Account Info

```bash
node 31_account.js
```

### 测试 EIP-712 签名 / Test EIP-712 Signature

```bash
node test_eip712_signature.js
```

这个测试脚本会：
- ✅ 验证 EIP-712 配置是否正确
- ✅ 显示签名生成的每个步骤
- ✅ 输出完整的签名参数

---

## 📝 示例文件列表 / Example Files

### 市场数据 / Market Data (NONE - 无需签名)
- `01_ping.js` - 测试连接
- `02_time.js` - 服务器时间
- `03_exchangeInfo.js` - 交易规则
- `04_depth.js` - 深度信息
- `05_trades.js` - 最近成交
- `06_historicalTrades.js` - 历史成交
- `07_aggTrades.js` - 归集成交
- `08_klines.js` - K线数据
- `09_indexKlines.js` - 指数K线
- `10_markKlines.js` - 标记价格K线
- `11_premiumIndex.js` - 溢价指数
- `12_fundingRate.js` - 资金费率
- `13_ticker24hr.js` - 24小时价格
- `14_tickerPrice.js` - 最新价格
- `15_bookTicker.js` - 最优挂单

### 账户和交易 / Account & Trading (需要Web3签名)
- `16_positionMode.js` - 设置持仓模式
- `17_getPositionMode.js` - 查询持仓模式
- `18_multiAssets.js` - 设置联合保证金
- `19_getMultiAssets.js` - 查询联合保证金
- `20_order.js` - 下单
- `21_queryOrder.js` - 查询订单
- `22_cancelOrder.js` - 撤销订单
- `23_batchOrders.js` - 批量下单
- `24_cancelAllOrders.js` - 撤销所有订单
- `25_batchCancel.js` - 批量撤销
- `26_countdownCancel.js` - 倒计时撤销
- `27_openOrder.js` - 查询当前订单
- `28_openOrders.js` - 查询所有当前订单
- `29_allOrders.js` - 查询所有订单
- `30_balance.js` - 账户余额
- `31_account.js` - 账户信息
- `32_leverage.js` - 调整杠杆
- `33_marginType.js` - 变换逐全仓模式
- `34_positionMargin.js` - 调整逐仓保证金
- `35_marginHistory.js` - 逐仓保证金变动历史
- `36_positionRisk.js` - 用户持仓风险
- `37_userTrades.js` - 账户成交历史
- `38_income.js` - 账户损益资金流水
- `39_leverageBracket.js` - 杠杆分层标准
- `40_adlQuantile.js` - 持仓ADL队列估算
- `41_forceOrders.js` - 用户强平单
- `42_commissionRate.js` - 用户手续费率
- `43_transfer.js` - 资金划转
- `44_listenKey.js` - 创建listenKey
- `45_keepaliveListenKey.js` - 延长listenKey
- `46_closeListenKey.js` - 关闭listenKey

---

## 🔧 工具函数 / Utility Functions

### utils.js

提供 EIP-712 签名功能：

```javascript
const { signParamsWeb3, buildQueryString } = require('./utils');

// 生成 EIP-712 签名
// signParamsWeb3 函数会自动从 config.js 读取 EIP712_DOMAIN 配置
const signedParams = await signParamsWeb3(
    params,                    // API 参数
    config.USER_ADDRESS,       // 主账户地址
    config.SIGNER_ADDRESS,     // API 钱包地址
    config.PRIVATE_KEY,        // API 钱包私钥
    config.RECV_WINDOW         // 接收窗口（可选）
);

// 构建查询字符串
const queryString = buildQueryString(signedParams);
```

**签名函数说明**：
- `signParamsWeb3()` - 使用 EIP-712 标准生成签名
- 自动读取 `config.EIP712_DOMAIN` 配置
- 支持可选的自定义域配置（第6个参数）
- 返回包含 signature 的完整参数对象

---

## 🆚 与 Futures API 的区别 / Difference from Futures API

| 特性 / Feature | Futures API | Futures V3 API |
|---------------|-------------|----------------|
| 认证方式 / Auth | HMAC SHA256 | EIP-712 Typed Data |
| 所需参数 / Params | timestamp, signature | user, signer, nonce, signature |
| 签名工具 / Signing | crypto (Node.js) | ethers (Web3 + EIP-712) |
| 签名格式 / Format | HMAC 哈希 | 类型化数据签名 |
| 钱包兼容 / Wallet | 不支持 / No | 支持 MetaMask / Yes |
| 复杂度 / Complexity | ⭐ Simple | ⭐⭐ Medium |
| 功能 / Features | 完整 / Complete | 完整 / Complete |

---

## 📖 参考文档 / Reference

- **Futures V3 API 文档**：`05-futures-v3-api-en.md`
- **Testnet 文档**：`07-testnet.md`（包含 EIP-712 示例）
- **EIP-712 标准**：https://eips.ethereum.org/EIPS/eip-712
- **Ethers.js 文档**：https://docs.ethers.org/v6/api/providers/#Signer-signTypedData
- **Python 示例**：Testnet 文档中有完整的 EIP-712 Python 实现

---

## ❓ 常见问题 / FAQ

### Q1: 为什么需要三个地址？
**A:** 
- `USER_ADDRESS` - 您的主交易账户
- `SIGNER_ADDRESS` - API专用钱包（更安全）
- `PRIVATE_KEY` - API钱包的私钥（用于签名）

### Q2: 如何获取API钱包？
**A:** 访问 https://www.asterdex.com/en/api-wallet 创建

### Q3: 什么是 EIP-712？
**A:** EIP-712 是以太坊的类型化数据签名标准，特点：
- ✅ 用户可以看到签名的具体内容
- ✅ MetaMask 等钱包原生支持
- ✅ 更安全、更透明的签名方式

### Q4: chainId 应该设置为多少？
**A:** 
- **生产环境**：`56`（BSC Chain ID）
- **测试网**：`714`（AsterDEX Testnet）
- 具体值请参考最新文档或咨询技术支持

### Q5: 签名失败怎么办？
**A:** 检查：
- 钱包地址格式是否正确（0x开头）
- 私钥是否匹配 SIGNER_ADDRESS
- EIP712_DOMAIN 配置是否正确
- chainId 是否与环境匹配

### Q6: 可以用 Spot API 的密钥吗？
**A:** 不可以。Futures V3 需要专门的 API 钱包。

### Q7: 为什么从 Web3 ABI 编码改为 EIP-712？
**A:** EIP-712 是以太坊官方标准，提供：
- 更好的钱包兼容性（MetaMask 可直接识别）
- 更高的安全性（用户可见签名内容）
- 更符合行业标准

---

## 🔗 相关链接 / Related Links

- [AsterDEX 官网](https://www.asterdex.com)
- [API 管理](https://www.asterdex.com/en/api-wallet)
- [Ethers.js 文档](https://docs.ethers.org/)

---

