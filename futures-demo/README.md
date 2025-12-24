# Futures API Demo / 期货API示例

This directory contains examples for all Futures API endpoints.  
此目录包含所有期货API接口的示例。

## Setup / 设置

1. Install dependencies / 安装依赖:
```bash
npm install
```

2. Configure API credentials / 配置API凭证:
Edit `config.js` and fill in your API credentials.  
编辑`config.js`并填写您的API凭证。

## File List / 文件列表

### Market Data Endpoints (01-16) / 市场数据接口 (01-16)
- 01-04: Basic endpoints (ping, time, exchangeInfo, depth)
- 05-08: Trade and kline data
- 09-13: Advanced market data (index, mark price, funding rate)
- 14-16: Ticker information

### Trading Endpoints (17-44) / 交易接口 (17-44)
- 17-20: Position and margin mode
- 21-31: Order operations
- 32-33: Account information
- 34-38: Leverage and position margin
- 39-44: Trade history and commission

### User Data Stream (45-47) / 用户数据流 (45-47)
- 45: Create listenKey
- 46: Keepalive listenKey
- 47: Close listenKey

## Usage / 使用方法

Run any example file:  
运行任意示例文件：

```bash
node 01_ping.js
```

## Security / 安全性

⚠️ Never commit your API credentials to version control!  
⚠️ 永远不要将API凭证提交到版本控制系统！

