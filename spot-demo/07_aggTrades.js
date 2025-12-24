/**
 * Aggregate Trades / 聚合成交
 * GET /api/v1/aggTrades
 * 
 * Get compressed/aggregate trades
 * 获取压缩/聚合成交记录
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
    limit: 10,             // Default: 500, Max: 1000 / 默认500，最大1000
    // fromId: 1000,       // Aggregate trade ID to fetch from / 从哪个聚合成交ID开始
    // startTime: 1609459200000,  // Timestamp in ms / 开始时间（毫秒）
    // endTime: 1609545600000,    // Timestamp in ms / 结束时间（毫秒）
};

/**
 * Get aggregate trades / 获取聚合成交
 */
async function getAggregateTrades() {
    try {
        console.log('Getting aggregate trades... / 获取聚合成交中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/aggTrades`, { params });
        
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
    getAggregateTrades()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getAggregateTrades;
