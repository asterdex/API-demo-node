/**
 * 24hr Ticker Price Change Statistics / 24小时价格变动统计
 * GET /api/v1/ticker/24hr
 * 
 * Get 24 hour price change statistics
 * 获取24小时价格变动统计
 * 
 * Weight: 1 for single symbol, 40 for all symbols
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',     // Trading pair / 交易对 (optional, omit for all symbols / 可选，省略则获取所有交易对)
};

/**
 * Get 24hr ticker / 获取24小时行情
 */
async function get24hrTicker() {
    try {
        console.log('Getting 24hr ticker... / 获取24小时行情中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/ticker/24hr`, { params });
        
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
    get24hrTicker()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = get24hrTicker;
