# Spot API Demo / 现货API示例

This directory contains examples for all Spot API endpoints.  
此目录包含所有现货API接口的示例。

## Setup / 设置

1. Install dependencies / 安装依赖:
```bash
npm install
```

2. Configure API credentials / 配置API凭证:
Edit `config.js` and fill in your API credentials.  
编辑`config.js`并填写您的API凭证。

## File List / 文件列表

### Market Data Endpoints / 市场数据接口
- `01_ping.js` - Test connectivity / 测试连接
- `02_time.js` - Get server time / 获取服务器时间
- `03_exchangeInfo.js` - Exchange information / 交易所信息
- `04_depth.js` - Order book depth / 订单簿深度
- `05_trades.js` - Recent trades / 最近成交
- `06_historicalTrades.js` - Historical trades / 历史成交
- `07_aggTrades.js` - Aggregate trades / 聚合成交
- `08_klines.js` - Kline/Candlestick data / K线数据
- `09_ticker24hr.js` - 24hr ticker / 24小时行情
- `10_tickerPrice.js` - Latest price / 最新价格
- `11_bookTicker.js` - Best bid/ask / 最优挂单
- `12_commissionRate.js` - Commission rate / 手续费率

### Trading Endpoints / 交易接口
- `13_placeOrder.js` - Place new order / 下单
- `14_cancelOrder.js` - Cancel order / 撤销订单
- `15_queryOrder.js` - Query order / 查询订单
- `16_openOrders.js` - Current open orders / 当前挂单
- `17_allOrders.js` - All orders / 所有订单
- `18_cancelAllOpenOrders.js` - Cancel all open orders / 撤销所有挂单

### Account Endpoints / 账户接口
- `19_account.js` - Account information / 账户信息
- `20_userTrades.js` - Account trade list / 账户成交历史

### Wallet Endpoints / 钱包接口
- `21_perpSpotTransfer.js` - Perpetual-Spot transfer / 永续-现货划转
- `22_sendToAddress.js` - Send to address / 发送到地址
- `23_withdrawFee.js` - Withdraw fee / 提现手续费
- `24_withdraw.js` - Withdraw / 提现

### API Key Management / API密钥管理
- `25_getNonce.js` - Get nonce / 获取Nonce
- `26_createApiKey.js` - Create API key / 创建API密钥

### User Data Stream / 用户数据流
- `27_createListenKey.js` - Create listen key / 创建Listen Key
- `28_keepaliveListenKey.js` - Keepalive listen key / 保持Listen Key活跃
- `29_closeListenKey.js` - Close listen key / 关闭Listen Key

## Usage / 使用方法

Run any example file:  
运行任意示例文件：

```bash
node 01_ping.js
```

## Security / 安全性

⚠️ Never commit your API credentials to version control!  
⚠️ 永远不要将API凭证提交到版本控制系统！

- Keep your `config.js` file private / 保持`config.js`文件私密
- Add `config.js` to `.gitignore` / 将`config.js`添加到`.gitignore`
- Use environment variables in production / 在生产环境中使用环境变量

