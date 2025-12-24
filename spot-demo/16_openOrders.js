/**
 * Current Open Orders / 当前挂单
 * GET /api/v1/openOrders
 * 
 * Get all open orders on a symbol
 * 获取交易对的所有挂单
 * 
 * Weight: 1 for single symbol, 40 for all symbols
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',          // Trading pair / 交易对 (optional, omit for all symbols / 可选，省略则获取所有交易对)
};

/**
 * Get current open orders / 获取当前挂单
 */
async function getOpenOrders() {
    try {
        console.log('Getting open orders... / 获取当前挂单中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.get(
            `${config.BASE_URL}/api/v1/openOrders?${queryString}`,
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
    getOpenOrders()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getOpenOrders;
