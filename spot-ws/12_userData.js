/**
 * User Data Streams / 用户数据流
 * Stream: <listenKey>
 * 
 * Provides account updates and order updates
 * 提供账户更新和订单更新
 * 
 * This script automatically creates a listenKey before connecting
 * 此脚本会在连接前自动创建listenKey
 */

const WebSocket = require('ws');
const axios = require('axios');
const path = require('path');

/**
 * Load API configuration from spot-demo
 * 从spot-demo加载API配置
 */
const spotConfig = require(path.join(__dirname, '../spot-demo/config.js'));

/**
 * Configuration / 配置
 */
const config = {
    baseUrl: 'wss://sstream.asterdex.com/ws',  // Base WebSocket URL / WebSocket基础URL
    restApiUrl: spotConfig.BASE_URL,            // REST API URL / REST API地址
    apiKey: spotConfig.API_KEY,                  // API Key / API密钥
};

/**
 * Create listenKey automatically / 自动创建listenKey
 */
async function createListenKey() {
    try {
        console.log('Creating listenKey automatically... / 自动创建listenKey中...\n');
        
        const response = await axios.post(
            `${config.restApiUrl}/api/v1/listenKey`,
            {},
            {
                headers: {
                    'X-MBX-APIKEY': config.apiKey
                }
            }
        );
        
        if (response.data && response.data.listenKey) {
            console.log('✓ ListenKey created successfully / ListenKey创建成功');
            console.log(`ListenKey: ${response.data.listenKey}\n`);
            return response.data.listenKey;
        } else {
            throw new Error('Invalid response from listenKey API / listenKey API响应无效');
        }
    } catch (error) {
        console.error('Error creating listenKey / 创建listenKey错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Connect to user data stream / 连接用户数据流
 */
async function connectUserDataStream() {
    try {
        // Automatically create listenKey / 自动创建listenKey
        const listenKey = await createListenKey();
        
        const streamUrl = `${config.baseUrl}/${listenKey}`;
        
        console.log('Connecting to User Data Stream... / 连接用户数据流中...\n');
        console.log(`URL: ${streamUrl}\n`);
        
        const ws = new WebSocket(streamUrl);
        
        ws.on('open', () => {
            console.log('✓ Connected to User Data Stream! / 已连接到用户数据流！\n');
            console.log('Listening for raw data... / 监听原始数据中...\n');
        });
        
        ws.on('message', (data) => {
            // Output raw data / 输出原始数据
            const rawData = data.toString();
            console.log('Raw Data / 原始数据:');
            console.log(rawData);
            console.log('');
        });
        
        ws.on('error', (error) => {
            console.error('WebSocket Error / WebSocket错误:', error.message);
        });
        
        ws.on('close', () => {
            console.log('Connection closed / 连接已关闭');
            console.log('ℹ️  ListenKey will expire automatically / ListenKey会自动过期');
        });
        
        // Handle Ctrl+C gracefully / 优雅处理Ctrl+C
        process.on('SIGINT', () => {
            console.log('\nClosing connection... / 关闭连接中...');
            ws.close();
            process.exit(0);
        });
        
        // Keep listenKey alive every 30 minutes / 每30分钟保持listenKey活跃
        const keepAliveInterval = setInterval(async () => {
            try {
                await axios.put(
                    `${config.restApiUrl}/api/v1/listenKey`,
                    {},
                    {
                        headers: {
                            'X-MBX-APIKEY': config.apiKey
                        }
                    }
                );
                console.log('✓ ListenKey kept alive / ListenKey保持活跃');
            } catch (error) {
                console.error('Error keeping listenKey alive / 保持listenKey活跃错误:', error.message);
            }
        }, 30 * 60 * 1000); // 30 minutes / 30分钟
        
        // Clean up interval on close / 关闭时清理定时器
        ws.on('close', () => {
            clearInterval(keepAliveInterval);
        });
        
    } catch (error) {
        console.error('Failed to connect / 连接失败:', error.message);
        process.exit(1);
    }
}

// Execute / 执行
if (require.main === module) {
    connectUserDataStream();
}

module.exports = connectUserDataStream;

