/**
 * All Market Mini Tickers Stream / 所有交易对简易Ticker流
 * Stream: !miniTicker@arr
 * 
 * 24hr rolling window mini-ticker statistics for all symbols in an array
 * 所有交易对的24小时滚动窗口简易Ticker统计（数组格式）
 */

const WebSocket = require('ws');

/**
 * Configuration / 配置
 */
const config = {
    baseUrl: 'wss://sstream.asterdex.com/ws',  // Base WebSocket URL / WebSocket基础URL
};

/**
 * Connect to all mini tickers stream / 连接所有简易Ticker流
 */
function connectAllMiniTickersStream() {
    const streamUrl = `${config.baseUrl}/!miniTicker@arr`;
    
    console.log('Connecting to All Mini Tickers Stream... / 连接所有简易Ticker流中...\n');
    console.log(`URL: ${streamUrl}\n`);
    
    const ws = new WebSocket(streamUrl);
    
    ws.on('open', () => {
        console.log('✓ Connected to All Mini Tickers Stream! / 已连接到所有简易Ticker流！\n');
        console.log('Listening for all mini ticker updates... / 监听所有简易Ticker更新中...\n');
    });
    
    ws.on('message', (data) => {
        // Output raw data / 输出原始数据
        console.log(data.toString());
    });    
    ws.on('error', (error) => {
        console.error('WebSocket Error / WebSocket错误:', error.message);
    });
    
    ws.on('close', () => {
        console.log('Connection closed / 连接已关闭');
    });
    
    // Handle Ctrl+C gracefully / 优雅处理Ctrl+C
    process.on('SIGINT', () => {
        console.log('\nClosing connection... / 关闭连接中...');
        ws.close();
        process.exit(0);
    });
}

// Execute / 执行
if (require.main === module) {
    connectAllMiniTickersStream();
}

module.exports = connectAllMiniTickersStream;

