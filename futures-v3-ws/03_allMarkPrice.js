/**
 * Futures V3 allMarkPrice Stream / 期货V3 allMarkPrice流
 */

const WebSocket = require('ws');

const config = {
    baseUrl: 'wss://fstream.asterdex.com/ws',
    
    
    
    
};

function connect() {
    const streamUrl = `${config.baseUrl}/!markPrice@arr`;
    console.log(`Connecting to ${streamUrl}...\n`);
    
    const ws = new WebSocket(streamUrl);
    
    ws.on('open', () => console.log('✓ Connected / 已连接\n'));
    ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        console.log('Message / 消息:', JSON.stringify(msg, null, 2));
    });
    ws.on('error', (err) => console.error('Error / 错误:', err.message));
    ws.on('close', () => console.log('Closed / 已关闭'));
    
    process.on('SIGINT', () => { ws.close(); process.exit(0); });
}

if (require.main === module) connect();
module.exports = connect;
