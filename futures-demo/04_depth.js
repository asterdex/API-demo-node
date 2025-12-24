/**
 * Order Book / 订单簿
 * GET /fapi/v1/depth
 * 
 * Get order book depth information
 * 获取订单簿深度信息
 * 
 * Weight: Adjusted based on limit / 根据limit调整
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

const params = {
    symbol: 'BTCUSDT',  // Symbol / 交易对 (required / 必需)
    limit: 10           // Default: 500, Options: [5,10,20,50,100,500,1000] / 默认500
};

async function getOrderBook() {
    try {
        console.log('Getting order book... / 获取订单簿中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v1/depth`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    getOrderBook()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getOrderBook;

