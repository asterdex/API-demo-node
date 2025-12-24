/**
 * Subscribe/Unsubscribe to Streams / 订阅/取消订阅流
 * 
 * You can subscribe/unsubscribe to streams dynamically after connection
 * 连接后可以动态订阅/取消订阅流
 * 
 * This example demonstrates how to manage subscriptions programmatically
 * 此示例演示如何以编程方式管理订阅
 */

const WebSocket = require('ws');

/**
 * Configuration / 配置
 */
const config = {
    baseUrl: 'wss://sstream.asterdex.com/ws',  // Base WebSocket URL / WebSocket基础URL
};

/**
 * Demo: Subscribe and Unsubscribe / 演示：订阅和取消订阅
 */
function demoSubscribeUnsubscribe() {
    console.log('Connecting to WebSocket... / 连接WebSocket中...\n');
    
    const ws = new WebSocket(config.baseUrl);
    
    ws.on('open', () => {
        console.log('✓ Connected to WebSocket! / 已连接到WebSocket！\n');
        
        // Subscribe to multiple streams / 订阅多个流
        console.log('Subscribing to streams... / 订阅流中...');
        const subscribeMsg = {
            method: 'SUBSCRIBE',
            params: [
                'bnbusdt@aggTrade',
                'bnbusdt@depth',
                'btcusdt@ticker'
            ],
            id: 1
        };
        ws.send(JSON.stringify(subscribeMsg));
        console.log('Subscription request sent / 订阅请求已发送\n');
        
        // After 10 seconds, unsubscribe from one stream
        // 10秒后取消订阅一个流
        setTimeout(() => {
            console.log('Unsubscribing from bnbusdt@depth... / 取消订阅bnbusdt@depth中...');
            const unsubscribeMsg = {
                method: 'UNSUBSCRIBE',
                params: ['bnbusdt@depth'],
                id: 2
            };
            ws.send(JSON.stringify(unsubscribeMsg));
            console.log('Unsubscription request sent / 取消订阅请求已发送\n');
        }, 10000);
        
        // After 20 seconds, get list of subscriptions
        // 20秒后获取订阅列表
        setTimeout(() => {
            console.log('Getting list of subscriptions... / 获取订阅列表中...');
            const listMsg = {
                method: 'LIST_SUBSCRIPTIONS',
                id: 3
            };
            ws.send(JSON.stringify(listMsg));
        }, 20000);
        
        // After 30 seconds, set a property
        // 30秒后设置属性
        setTimeout(() => {
            console.log('Setting combined property... / 设置组合属性中...');
            const setPropMsg = {
                method: 'SET_PROPERTY',
                params: ['combined', true],
                id: 4
            };
            ws.send(JSON.stringify(setPropMsg));
        }, 30000);
        
        // After 40 seconds, close connection
        // 40秒后关闭连接
        setTimeout(() => {
            console.log('\nDemo completed! Closing connection... / 演示完成！关闭连接中...');
            ws.close();
            process.exit(0);
        }, 40000);
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

/**
 * Helper function to subscribe to streams / 辅助函数：订阅流
 */
function subscribe(ws, streams, id = 1) {
    const msg = {
        method: 'SUBSCRIBE',
        params: Array.isArray(streams) ? streams : [streams],
        id: id
    };
    ws.send(JSON.stringify(msg));
    console.log(`Subscribed to / 已订阅: ${streams}`);
}

/**
 * Helper function to unsubscribe from streams / 辅助函数：取消订阅流
 */
function unsubscribe(ws, streams, id = 2) {
    const msg = {
        method: 'UNSUBSCRIBE',
        params: Array.isArray(streams) ? streams : [streams],
        id: id
    };
    ws.send(JSON.stringify(msg));
    console.log(`Unsubscribed from / 已取消订阅: ${streams}`);
}

/**
 * Helper function to list subscriptions / 辅助函数：列出订阅
 */
function listSubscriptions(ws, id = 3) {
    const msg = {
        method: 'LIST_SUBSCRIPTIONS',
        id: id
    };
    ws.send(JSON.stringify(msg));
    console.log('Requested subscription list / 已请求订阅列表');
}

// Execute demo / 执行演示
if (require.main === module) {
    console.log('=== Subscribe/Unsubscribe Demo / 订阅/取消订阅演示 ===\n');
    console.log('This demo will:');
    console.log('1. Subscribe to 3 streams / 订阅3个流');
    console.log('2. After 10s: Unsubscribe from 1 stream / 10秒后：取消订阅1个流');
    console.log('3. After 20s: List all subscriptions / 20秒后：列出所有订阅');
    console.log('4. After 30s: Set a property / 30秒后：设置一个属性');
    console.log('5. After 40s: Close connection / 40秒后：关闭连接\n');
    
    demoSubscribeUnsubscribe();
}

module.exports = {
    subscribe,
    unsubscribe,
    listSubscriptions,
    demo: demoSubscribeUnsubscribe
};

