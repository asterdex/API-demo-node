# Futures V3 API Demo / 期货V3 API示例

## ⚠️ 重要提示 / Important Notice

**Futures V3 API 使用 Web3 签名认证，与 Spot 和 Futures API 完全不同！**

**Futures V3 API uses Web3 signature authentication, completely different from Spot and Futures API!**

---

## 🔐 认证方式 / Authentication Method

### Web3 ECDSA 签名 / Web3 ECDSA Signature

Futures V3 需要以下参数：
- `user` - 主账户钱包地址
- `signer` - API钱包地址
- `nonce` - 微秒时间戳
- `timestamp` - 毫秒时间戳
- `signature` - Web3 ECDSA 签名

签名流程：
1. 参数排序并转为JSON字符串
2. ABI编码（string, address, address, uint256）
3. Keccak256哈希
4. 使用私钥进行ECDSA签名

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
    BASE_URL: 'https://fapi.asterdex.com',
    
    // 主账户钱包地址（您的交易账户）
    USER_ADDRESS: '0xYourMainWalletAddress...',
    
    // API钱包地址（从API管理页面获取）
    SIGNER_ADDRESS: '0xYourAPIWalletAddress...',
    
    // API钱包私钥（从API管理页面获取）
    PRIVATE_KEY: '0xYourAPIWalletPrivateKey...',
    
    DEFAULT_SYMBOL: 'BTCUSDT',
    RECV_WINDOW: 5000
};
```

⚠️ **安全提示**：
- 永远不要将真实的私钥提交到 Git
- `config.js` 已在 `.gitignore` 中
- 使用测试账户进行测试

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

提供 Web3 签名功能：

```javascript
const { signParamsWeb3, buildQueryString } = require('./utils');

// 生成签名
const signedParams = signParamsWeb3(
    params,
    config.USER_ADDRESS,
    config.SIGNER_ADDRESS,
    config.PRIVATE_KEY,
    config.RECV_WINDOW
);

// 构建查询字符串
const queryString = buildQueryString(signedParams);
```

---

## 🆚 与 Futures API 的区别 / Difference from Futures API

| 特性 / Feature | Futures API | Futures V3 API |
|---------------|-------------|----------------|
| 认证方式 / Auth | HMAC SHA256 | Web3 ECDSA |
| 所需参数 / Params | timestamp, signature | user, signer, nonce, signature |
| 签名工具 / Signing | crypto (Node.js) | ethers (Web3) |
| 复杂度 / Complexity | ⭐ Simple | ⭐⭐⭐ Complex |
| 功能 / Features | 完整 / Complete | 完整 / Complete |

---

## 📖 参考文档 / Reference

- API文档：`https://github.com/asterdex/api-docs/blob/master/aster-finance-futures-api-v3.md`
- Web3认证说明：`WEB3_AUTH_NOTICE.md`
- Python示例：API文档中有完整的Python实现

---

## ❓ 常见问题 / FAQ

### Q1: 为什么需要三个地址？
**A:** 
- `USER_ADDRESS` - 您的主交易账户
- `SIGNER_ADDRESS` - API专用钱包（更安全）
- `PRIVATE_KEY` - API钱包的私钥（用于签名）

### Q2: 如何获取API钱包？
**A:** 访问 https://www.asterdex.com/en/api-wallet 创建

### Q3: 签名失败怎么办？
**A:** 检查：
- 钱包地址格式是否正确（0x开头）
- 私钥是否匹配SIGNER_ADDRESS
- 时间是否同步（nonce基于系统时间）

### Q4: 可以用Spot API的密钥吗？
**A:** 不可以。Futures V3需要专门的API钱包。

### Q5: 为什么比Futures API复杂？
**A:** V3使用Web3标准，提供更好的安全性和去中心化特性。

---

## 🔗 相关链接 / Related Links

- [AsterDEX 官网](https://www.asterdex.com)
- [API 管理](https://www.asterdex.com/en/api-wallet)
- [Ethers.js 文档](https://docs.ethers.org/)

---

