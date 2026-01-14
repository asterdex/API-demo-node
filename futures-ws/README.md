# Futures WebSocket API Demo / 期货WebSocket API示例

This directory contains examples for Futures WebSocket streams.  
此目录包含期货WebSocket流的示例。

## Setup / 设置

```bash
npm install
```

## Usage / 使用方法

### Market Data Streams / 市场数据流

```bash
node 01_aggTrade.js
node 02_markPrice.js
# ... other market streams
```

### User Data Stream / 用户数据流

```bash
node 15_userData.js
```

✨ **自动创建 ListenKey / Automatic ListenKey Creation**

`15_userData.js` 会自动：
- 从 `futures-demo/config.js` 读取配置（需要 API_KEY）
- 调用 REST API 创建 listenKey
- 连接到用户数据流
- 每30分钟自动延长 listenKey 有效期

The script automatically:
- Loads config from `futures-demo/config.js` (requires API_KEY)
- Creates listenKey via REST API
- Connects to user data stream
- Keeps listenKey alive every 30 minutes

## WebSocket URL / WebSocket地址

**Base URL**: `wss://fstream.asterdex.com/ws`

## File List / 文件列表

### Market Data / 市场数据 (01-14)
- `01_aggTrade.js` - 归集交易流
- `02_markPrice.js` - 标记价格流
- `03_allMarkPrice.js` - 所有标记价格流
- `04_kline.js` - K线流
- `05_miniTicker.js` - 单交易对迷你ticker
- `06_allMiniTicker.js` - 所有迷你ticker
- `07_ticker.js` - 单交易对ticker
- `08_allTicker.js` - 所有ticker
- `09_bookTicker.js` - 单交易对最优挂单
- `10_allBookTicker.js` - 所有最优挂单
- `11_liquidation.js` - 单交易对强平订单
- `12_allLiquidation.js` - 所有强平订单
- `13_partialDepth.js` - 有限档深度流
- `14_diffDepth.js` - 增量深度流

### User Data / 用户数据 (15)
- `15_userData.js` - 用户数据流（账户更新、订单更新）

⚠️ **Note**: User data stream requires valid API configuration in `futures-demo/config.js`  
用户数据流需要在 `futures-demo/config.js` 中配置有效的 API_KEY
