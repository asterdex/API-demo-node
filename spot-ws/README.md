# Spot WebSocket API Demo / 现货WebSocket API示例

This directory contains examples for all Spot WebSocket streams.  
此目录包含所有现货WebSocket流的示例。

## ⚠️ Important Updates / 重要更新

### 1. WebSocket URL Fixed / WebSocket URL已修复 ✅
Changed from `wss://stream.asterdex.com` to `wss://sstream.asterdex.com` (note the extra 's')  
从 `wss://stream.asterdex.com` 改为 `wss://sstream.asterdex.com`（注意多了一个's'）

### 2. Raw Data Output / 原始数据输出 ✅
All examples now output **raw JSON data** instead of formatted messages  
所有示例现在输出**原始JSON数据**而不是格式化的消息

### 3. Auto ListenKey Creation / 自动创建ListenKey ✅
`12_userData.js` now automatically creates and maintains listenKey  
`12_userData.js` 现在自动创建并维护listenKey

**📖 See details:** [RAW_DATA_UPDATE.md](./RAW_DATA_UPDATE.md) | [WEBSOCKET_FIX.md](./WEBSOCKET_FIX.md)

---

## Setup / 设置

1. Install dependencies / 安装依赖:
```bash
npm install
```

2. Run any example file / 运行任意示例文件:
```bash
node 01_aggTrade.js
```

## File List / 文件列表

### Market Data Streams / 市场数据流
- `01_aggTrade.js` - Aggregate trade stream / 聚合成交流
- `02_trade.js` - Trade stream / 逐笔成交流
- `03_kline.js` - Kline/Candlestick stream / K线流
- `04_miniTicker.js` - Individual symbol mini ticker / 单一交易对简易Ticker
- `05_allMiniTickers.js` - All symbols mini ticker / 所有交易对简易Ticker
- `06_ticker.js` - Individual symbol ticker / 单一交易对完整Ticker
- `07_allTickers.js` - All symbols ticker / 所有交易对完整Ticker
- `08_bookTicker.js` - Individual symbol book ticker / 单一交易对最优挂单
- `09_allBookTickers.js` - All symbols book ticker / 所有交易对最优挂单
- `10_partialDepth.js` - Partial book depth stream / 有限档深度流
- `11_diffDepth.js` - Diff depth stream / 增量深度流

### User Data Streams / 用户数据流
- `12_userData.js` - User data stream / 用户数据流
  - Account updates / 账户更新
  - Order updates / 订单更新
  - Balance updates / 余额更新

### Advanced Features / 高级功能
- `13_combined.js` - Combined streams / 组合流
- `14_subscribeUnsubscribe.js` - Dynamic subscribe/unsubscribe / 动态订阅/取消订阅

## WebSocket URLs / WebSocket地址

- **Base URL**: `wss://sstream.asterdex.com/ws`
- **Combined streams**: `wss://sstream.asterdex.com/stream?streams=<stream1>/<stream2>`

## Stream Name Format / 流名称格式

All stream names must be lowercase / 所有流名称必须小写

- Aggregate Trade: `<symbol>@aggTrade` (e.g., `bnbusdt@aggTrade`)
- Trade: `<symbol>@trade`
- Kline: `<symbol>@kline_<interval>` (e.g., `bnbusdt@kline_1m`)
- Mini Ticker: `<symbol>@miniTicker`
- Ticker: `<symbol>@ticker`
- Book Ticker: `<symbol>@bookTicker`
- Partial Depth: `<symbol>@depth<levels>` (e.g., `bnbusdt@depth5`)
- Diff Depth: `<symbol>@depth`
- All Mini Tickers: `!miniTicker@arr`
- All Tickers: `!ticker@arr`
- All Book Tickers: `!bookTicker`

## Usage Notes / 使用说明

### For User Data Stream / 对于用户数据流

1. Create a listenKey using REST API / 使用REST API创建listenKey:
   ```bash
   POST /api/v1/listenKey
   ```

2. Connect to WebSocket with listenKey / 使用listenKey连接WebSocket:
   ```javascript
   wss://sstream.asterdex.com/ws/<listenKey>
   ```

3. Keep the listenKey alive / 保持listenKey活跃:
   - Call `PUT /api/v1/listenKey` every 30 minutes / 每30分钟调用一次
   - ListenKey expires after 60 minutes if not kept alive / 如果不保活，60分钟后过期

4. Close the listenKey when done / 完成后关闭listenKey:
   ```bash
   DELETE /api/v1/listenKey
   ```

### Subscribe/Unsubscribe Methods / 订阅/取消订阅方法

You can subscribe to streams after connection / 连接后可以订阅流:

```javascript
// Subscribe / 订阅
{
  "method": "SUBSCRIBE",
  "params": ["bnbusdt@aggTrade", "bnbusdt@depth"],
  "id": 1
}

// Unsubscribe / 取消订阅
{
  "method": "UNSUBSCRIBE",
  "params": ["bnbusdt@aggTrade"],
  "id": 2
}

// List subscriptions / 列出订阅
{
  "method": "LIST_SUBSCRIPTIONS",
  "id": 3
}
```

## Tips / 提示

- Press `Ctrl+C` to stop any running example / 按`Ctrl+C`停止任何正在运行的示例
- Use combined streams for multiple subscriptions / 使用组合流订阅多个流
- Keep connections alive by handling ping/pong / 通过处理ping/pong保持连接活跃
- Implement reconnection logic for production / 在生产环境中实现重连逻辑
