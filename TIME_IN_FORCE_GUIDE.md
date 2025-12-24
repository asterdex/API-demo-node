# TimeInForce 参数详解 / TimeInForce Parameter Guide

## 📖 什么是 TimeInForce？/ What is TimeInForce?

`timeInForce` (有效期类型) 是下单时的一个重要参数，它决定了订单在交易所中的**有效时长和执行方式**。

`timeInForce` is an important parameter when placing orders that determines the **validity period and execution method** of the order on the exchange.

---

## 🎯 适用场景 / When to Use

`timeInForce` 参数主要用于以下订单类型：
- **LIMIT** 订单（限价单）- **必需参数**
- **STOP** 订单（止损单）- 可选，默认 GTC
- **TAKE_PROFIT** 订单（止盈单）- 可选，默认 GTC

`timeInForce` is mainly used for:
- **LIMIT** orders - **Required parameter**
- **STOP** orders - Optional, default GTC
- **TAKE_PROFIT** orders - Optional, default GTC

**注意：** MARKET（市价单）订单不需要此参数
**Note:** MARKET orders do not require this parameter

---

## 📋 TimeInForce 类型详解 / Types Explained

### 1. GTC (Good Till Cancel) - 成交为止

**中文解释：**
- **含义：** "有效直到取消"
- **行为：** 订单会一直保持在订单簿中，直到：
  - ✅ 完全成交
  - ✅ 被用户手动取消
  - ✅ 达到订单的过期时间（如果有设置）
- **特点：** 
  - 最常用的类型
  - 订单可以部分成交
  - 未成交部分会继续挂在订单簿上等待成交

**English:**
- **Meaning:** Order remains active until filled or cancelled
- **Behavior:** The order stays in the order book until:
  - ✅ Fully filled
  - ✅ Manually cancelled by user
  - ✅ Order expiration time reached (if set)
- **Features:**
  - Most commonly used type
  - Can be partially filled
  - Unfilled portion remains in order book

**使用示例 / Example:**
```javascript
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "1.0",
  "price": "30000",
  "timeInForce": "GTC"  // 订单会一直挂着直到成交或取消
}
```

**适合场景 / Best For:**
- 💰 不急于成交，愿意等待更好价格
- 📊 设置买入/卖出目标价
- 🎯 长期挂单策略

---

### 2. IOC (Immediate or Cancel) - 立即成交或取消

**中文解释：**
- **含义：** "立即成交剩余取消"
- **行为：** 订单提交后立即尝试成交：
  - ✅ 能成交多少就成交多少（可以部分成交）
  - ❌ 未能立即成交的部分会被自动取消
  - ⚡ 不会在订单簿中停留
- **特点：**
  - 追求即时性
  - 允许部分成交
  - 剩余部分不会挂单

**English:**
- **Meaning:** Fill what's immediately available, cancel the rest
- **Behavior:** After submission, order immediately attempts to fill:
  - ✅ Fills as much as possible (partial fills allowed)
  - ❌ Unfilled portion is automatically cancelled
  - ⚡ Does not remain in the order book
- **Features:**
  - Prioritizes immediacy
  - Allows partial fills
  - Remaining portion won't be queued

**使用示例 / Example:**
```javascript
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "1.0",
  "price": "31000",
  "timeInForce": "IOC"  // 立即尽量成交，剩余取消
}
```

**结果示例 / Result Example:**
- 订单数量：1.0 BTC
- 当前可成交：0.6 BTC
- 结果：成交 0.6 BTC，剩余 0.4 BTC 被取消

**适合场景 / Best For:**
- ⚡ 需要快速进出场
- 🎯 市场流动性测试
- 💹 套利交易（降低滑点风险）
- 🔄 不想订单长时间挂单

---

### 3. FOK (Fill or Kill) - 全部成交或全部取消

**中文解释：**
- **含义：** "要么全部成交，要么全部取消"
- **行为：** 订单提交后：
  - ✅ 如果能够立即全部成交 → 执行订单
  - ❌ 如果无法立即全部成交 → 整个订单被取消
  - ⚡ 绝对不会部分成交
  - ⚡ 不会在订单簿中停留
- **特点：**
  - "全有或全无"
  - 最严格的执行要求
  - 保证订单数量的完整性

**English:**
- **Meaning:** Either fill the entire order immediately or cancel it completely
- **Behavior:** After submission:
  - ✅ If can be fully filled immediately → Execute order
  - ❌ If cannot be fully filled immediately → Cancel entire order
  - ⚡ Absolutely no partial fills
  - ⚡ Does not remain in the order book
- **Features:**
  - "All or nothing"
  - Strictest execution requirement
  - Guarantees order quantity integrity

**使用示例 / Example:**
```javascript
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "LIMIT",
  "quantity": "1.0",
  "price": "31000",
  "timeInForce": "FOK"  // 必须全部成交，否则全部取消
}
```

**结果示例 / Result Example:**
- 订单数量：1.0 BTC
- 当前可成交：0.6 BTC
- 结果：订单被完全取消（因为无法全部成交）

**适合场景 / Best For:**
- 🎯 需要精确数量的交易
- 💰 大额订单（避免部分成交）
- 🔄 套利交易（必须完整执行）
- ⚖️ 对冲策略（需要确定数量）

---

## 📊 类型对比表 / Comparison Table

| 特性 / Feature | GTC | IOC | FOK |
|---------------|-----|-----|-----|
| **中文名称** | 成交为止 | 立即成交或取消 | 全部成交或全部取消 |
| **是否挂单 / Stays in Book** | ✅ 是 | ❌ 否 | ❌ 否 |
| **允许部分成交 / Partial Fill** | ✅ 是 | ✅ 是 | ❌ 否 |
| **未成交处理 / Unfilled Handling** | 继续挂单 | 取消 | 全部取消 |
| **执行速度 / Speed** | 慢 Slow | 快 Fast | 快 Fast |
| **使用频率 / Usage** | 最高 Highest | 中等 Medium | 较低 Lower |
| **价格保证 / Price Guarantee** | ✅ 是 | ⚠️ 部分 | ❌ 否 |
| **数量保证 / Quantity Guarantee** | ❌ 否 | ❌ 否 | ✅ 是 |

---

## 💡 实际应用场景 / Real-World Scenarios

### 场景1：日常交易 / Scenario 1: Regular Trading

**需求：** 想以 30,000 买入 BTC，可以等待
**选择：** `GTC`

```javascript
{
  "side": "BUY",
  "type": "LIMIT",
  "price": "30000",
  "quantity": "1.0",
  "timeInForce": "GTC"  // 挂单等待，直到成交
}
```

---

### 场景2：快速平仓 / Scenario 2: Quick Position Closing

**需求：** 需要快速平掉多头仓位，接受部分成交
**选择：** `IOC`

```javascript
{
  "side": "SELL",
  "type": "LIMIT",
  "price": "31000",
  "quantity": "1.0",
  "timeInForce": "IOC"  // 立即尽量成交，剩余自动取消
}
```

---

### 场景3：套利交易 / Scenario 3: Arbitrage Trading

**需求：** 必须同时买入 1.0 BTC，否则套利失败
**选择：** `FOK`

```javascript
{
  "side": "BUY",
  "type": "LIMIT",
  "price": "31000",
  "quantity": "1.0",
  "timeInForce": "FOK"  // 必须全部成交，否则全部取消
}
```

---

### 场景4：止损单 / Scenario 4: Stop Loss

**需求：** 设置止损，触发后希望慢慢成交
**选择：** `GTC` (默认)

```javascript
{
  "side": "SELL",
  "type": "STOP",
  "stopPrice": "29000",
  "price": "28900",
  "quantity": "1.0",
  "timeInForce": "GTC"  // 触发后订单会一直挂着
}
```

---

## ⚠️ 重要提示 / Important Notes

### 1. 订单类型限制 / Order Type Restrictions

| 订单类型 / Order Type | timeInForce | 是否必需 / Required |
|---------------------|-------------|-----------------|
| LIMIT | GTC, IOC, FOK | ✅ 是 / Yes |
| MARKET | - | ❌ 不需要 / No |
| STOP | GTC, IOC, FOK | ⚠️ 可选 (默认GTC) / Optional |
| TAKE_PROFIT | GTC, IOC, FOK | ⚠️ 可选 (默认GTC) / Optional |
| STOP_MARKET | - | ❌ 不需要 / No |
| TAKE_PROFIT_MARKET | - | ❌ 不需要 / No |

---

### 2. 价格设置建议 / Price Setting Tips

**GTC:**
- 可以设置理想价格
- 适合挂单等待

**IOC:**
- 价格应接近市场价
- 价格太离谱可能完全无法成交

**FOK:**
- 价格必须非常接近或优于市场价
- 否则很容易被全部取消

---

### 3. 常见错误 / Common Mistakes

❌ **错误1：** MARKET 订单使用 timeInForce
```javascript
{
  "type": "MARKET",
  "timeInForce": "GTC"  // ❌ 市价单不需要此参数
}
```

✅ **正确：**
```javascript
{
  "type": "MARKET"  // ✅ 市价单不需要 timeInForce
}
```

---

❌ **错误2：** FOK 订单价格设置不合理
```javascript
{
  "side": "BUY",
  "type": "LIMIT",
  "price": "25000",  // 当前价30000
  "timeInForce": "FOK"  // ❌ 价格太低，必定失败
}
```

---

## 🎓 选择决策树 / Decision Tree

```
你想要什么？
What do you want?
    │
    ├─ 🎯 确保精确数量？
    │   Exact quantity?
    │   └─ 是 Yes → FOK ✅
    │
    ├─ ⚡ 追求速度，接受部分成交？
    │   Speed, accept partial?
    │   └─ 是 Yes → IOC ✅
    │
    └─ 💰 愿意等待最佳价格？
        Wait for best price?
        └─ 是 Yes → GTC ✅
```

---

## 📝 代码示例 / Code Examples

### JavaScript Example

```javascript
// 示例1：普通限价单 - GTC
const gtcOrder = {
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '1.0',
  price: '30000',
  timeInForce: 'GTC'
};

// 示例2：快速成交单 - IOC
const iocOrder = {
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'LIMIT',
  quantity: '0.5',
  price: '31000',
  timeInForce: 'IOC'
};

// 示例3：全量成交单 - FOK
const fokOrder = {
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '2.0',
  price: '31000',
  timeInForce: 'FOK'
};
```

---

- **Futures API Documentation**: `03-futures-api-en.md`
- **Futures V3 API Documentation**: `05-futures-v3-api-en.md`
- **Order Examples**: 
  - `futures-demo/21_order.js`
  - `futures-v3-demo/20_order.js`
  - `spot-demo/13_placeOrder.js`

---

## 🆘 FAQ / 常见问题

### Q1: 我应该用哪个？/ Which should I use?

**A:** 
- 90%的情况：用 **GTC** ✅
- 需要快速成交：用 **IOC** ⚡
- 必须全量成交：用 **FOK** 🎯

---

### Q2: IOC 和 FOK 有什么区别？/ IOC vs FOK?

**A:**
- **IOC**: 能成交多少是多少，剩余取消（部分成交OK）
- **FOK**: 要么全部成交，要么全部取消（不接受部分成交）

---

### Q3: 为什么我的 FOK 订单总是失败？/ Why FOK orders always fail?

**A:** 
FOK 要求立即全部成交，如果：
- 价格设置不合理
- 数量太大
- 市场流动性不足

就会导致订单被取消。建议：
1. 价格要接近或优于市场价
2. 数量要合理
3. 在流动性好的时候下单

---

### Q4: GTC 订单会一直存在吗？/ Do GTC orders last forever?

**A:** 
理论上是的，但实际上：
- 交易所可能有最长挂单时间限制
- 你可以随时手动取消
- 某些异常情况（如维护）可能会取消订单

---


