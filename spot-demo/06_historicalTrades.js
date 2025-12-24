/**
 * Historical Trades / 历史成交
 * GET /api/v1/historicalTrades
 * 
 * Get historical trades (requires API key)
 * 获取历史成交记录（需要API密钥）
 * 
 * Weight: 20
 * Security: MARKET_DATA
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',     // Trading pair / 交易对 (required / 必需)
    limit: 10,             // Default: 500, Max: 1000 / 默认500，最大1000
    // fromId: 1000,       // Trade ID to fetch from / 从哪个成交ID开始获取
};

/**
 * Get historical trades / 获取历史成交
 */
async function getHistoricalTrades() {
    try {
        console.log('Getting historical trades... / 获取历史成交中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/historicalTrades`, {
            params,
            headers: {
                'X-MBX-APIKEY': config.API_KEY
            }
        });

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
    getHistoricalTrades()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getHistoricalTrades;
