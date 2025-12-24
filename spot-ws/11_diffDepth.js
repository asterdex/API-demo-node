/**
 * Diff. Depth Stream / 增量深度流
 * Stream: <symbol>@depth or <symbol>@depth@100ms
 * 
 * Order book price and quantity depth updates
 * 订单簿价格和数量深度增量更新
 */

const WebSocket = require('ws');

/**
 * Configuration / 配置
 */
const config = {
    baseUrl: 'wss://sstream.asterdex.com/ws',  // Base WebSocket URL / WebSocket基础URL
    symbol: 'bnbusdt',                         // Trading pair (lowercase) / 交易对（小写）
    updateSpeed: '',                           // Update speed / 更新速度 ('' for 1000ms or '@100ms' for 100ms / ''表示1000ms，'@100ms'表示100ms)
};

/**
 * Connect to diff depth stream / 连接增量深度流
 */
function connectDiffDepthStream() {
    const streamUrl = `${config.baseUrl}/${config.symbol}@depth${config.updateSpeed}`;
    
    console.log('Connecting to Diff Depth Stream... / 连接增量深度流中...\n');
    console.log(`URL: ${streamUrl}\n`);
    console.log(`Update Speed / 更新速度: ${config.updateSpeed || '1000ms'}\n`);
    
    const ws = new WebSocket(streamUrl);
    
    ws.on('open', () => {
        console.log('✓ Connected to Diff Depth Stream! / 已连接到增量深度流！\n');
        console.log('Listening for diff depth updates... / 监听增量深度更新中...\n');
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
    connectDiffDepthStream();
}

module.exports = connectDiffDepthStream;

