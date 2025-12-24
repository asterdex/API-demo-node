/**
 * Account Trade List / 账户成交历史
 * GET /api/v1/userTrades
 * 
 * Get trades for a specific account and symbol
 * 获取特定账户和交易对的成交历史
 * 
 * Weight: 10
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',          // Trading pair / 交易对 (required / 必需)
    limit: 10,                  // Default: 500, Max: 1000 / 默认500，最大1000
    // fromId: 123456,          // Trade ID to fetch from / 从哪个成交ID开始获取
    // startTime: 1609459200000, // Start time in ms / 开始时间（毫秒）
    // endTime: 1609545600000,   // End time in ms / 结束时间（毫秒）
};

/**
 * Get user trades / 获取用户成交历史
 */
async function getUserTrades() {
    try {
        console.log('Getting user trades... / 获取用户成交历史中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.get(
            `${config.BASE_URL}/api/v1/userTrades?${queryString}`,
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY
                }
            }
        );

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
    getUserTrades()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getUserTrades;
