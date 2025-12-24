# Futures WebSocket API Demo / 期货WebSocket API示例

This directory contains examples for Futures WebSocket streams.  
此目录包含期货WebSocket流的示例。

## Setup / 设置

```bash
npm install
```

## Usage / 使用方法

```bash
node 01_aggTrade.js
```

## WebSocket URL / WebSocket地址

**Base URL**: `wss://fstream.asterdex.com/ws`

## File List / 文件列表

1-4: Market trade and price streams  
5-8: Ticker streams  
9-10: Book ticker streams  
11-12: Liquidation streams  
13-14: Depth streams  
15: User data stream  

⚠️ For user data stream, create a listenKey first using REST API.(Demo is configured to automatically create a listenKey when accessing the user data stream, so you can subscribe directly.)  
对于用户数据流，请先使用REST API创建listenKey。（demo已配置访问用户数据流自动创建listenKey,可以直接订阅）
