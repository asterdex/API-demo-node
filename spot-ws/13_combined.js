/**
 * Combined Streams / 组合流
 * Multiple streams can be accessed in a single connection
 * 可以在单个连接中访问多个流
 * 
 * Combined stream format: /stream?streams=<stream1>/<stream2>/<stream3>
 * 组合流格式：/stream?streams=<流1>/<流2>/<流3>
 */

const WebSocket = require('ws');

/**
 * Configuration / 配置
 */
const config = {
    baseUrl: 'wss://sstream.asterdex.com',     // Base WebSocket URL / WebSocket基础URL
    streams: [                                 // Streams to combine / 要组合的流
        'bnbusdt@aggTrade',                    // Aggregate trade stream / 聚合成交流
        'bnbusdt@depth',                       // Diff depth stream / 增量深度流
        'btcusdt@ticker',                      // Ticker stream / Ticker流
    ]
};

/**
 * Connect to combined streams / 连接组合流
 */
function connectCombinedStreams() {
    const streamsParam = config.streams.join('/');
    const streamUrl = `${config.baseUrl}/stream?streams=${streamsParam}`;
    
    console.log('Connecting to Combined Streams... / 连接组合流中...\n');
    console.log('Streams / 流:');
    config.streams.forEach((stream, index) => {
        console.log(`  ${index + 1}. ${stream}`);
    });
    console.log(`\nURL: ${streamUrl}\n`);
    
    const ws = new WebSocket(streamUrl);
    
    ws.on('open', () => {
        console.log('✓ Connected to Combined Streams! / 已连接到组合流！\n');
        console.log('Listening for updates from all streams... / 监听所有流的更新中...\n');
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
    connectCombinedStreams();
}

module.exports = connectCombinedStreams;

