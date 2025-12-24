/**
 * Recent Trades / 最近成交
 * GET /api/v1/trades
 * 
 * Get recent trades
 * 获取最近成交记录
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',     // Trading pair / 交易对 (required / 必需)
    limit: 10              // Default: 500, Max: 1000 / 默认500，最大1000
};

/**
 * Get recent trades / 获取最近成交
 */
async function getRecentTrades() {
    try {
        console.log('Getting recent trades... / 获取最近成交中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/trades`, { params });
        
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
    getRecentTrades()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getRecentTrades;
