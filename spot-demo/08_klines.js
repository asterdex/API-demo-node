/**
 * K-Lines / K线数据
 * GET /api/v1/klines
 * 
 * Get candlestick/kline bars
 * 获取K线/蜡烛图数据
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
    interval: '1h',        // Interval / 时间间隔 (required / 必需)
                           // Options / 可选值: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
    limit: 10,             // Default: 500, Max: 1000 / 默认500，最大1000
    // startTime: 1609459200000,  // Start time in ms / 开始时间（毫秒）
    // endTime: 1609545600000,    // End time in ms / 结束时间（毫秒）
};

/**
 * Get kline data / 获取K线数据
 */
async function getKlines() {
    try {
        console.log('Getting kline data... / 获取K线数据中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/klines`, { params });
        
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
    getKlines()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getKlines;
