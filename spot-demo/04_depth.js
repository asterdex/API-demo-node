/**
 * Order Book Depth / 订单簿深度
 * GET /api/v1/depth
 * 
 * Get order book depth information
 * 获取订单簿深度信息
 * 
 * Weight: 2-20 (based on limit)
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',     // Trading pair / 交易对 (required / 必需)
    limit: 10              // Default: 100, Options: [5, 10, 20, 50, 100, 500, 1000] / 默认100，可选值：[5, 10, 20, 50, 100, 500, 1000]
};

/**
 * Get order book depth / 获取订单簿深度
 */
async function getDepth() {
    try {
        console.log('Getting order book depth... / 获取订单簿深度中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/depth`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    getDepth()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getDepth;

