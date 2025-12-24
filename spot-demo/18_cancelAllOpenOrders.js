/**
 * Cancel All Open Orders / 撤销所有挂单
 * DELETE /api/v1/allOpenOrders
 * 
 * Cancel all open orders on a symbol
 * 撤销交易对的所有挂单
 * 
 * Weight: 1
 * Security: TRADE
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',          // Trading pair / 交易对 (required / 必需)
};

/**
 * Cancel all open orders / 撤销所有挂单
 */
async function cancelAllOpenOrders() {
    try {
        console.log('Canceling all open orders... / 撤销所有挂单中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.delete(
            `${config.BASE_URL}/api/v1/allOpenOrders?${queryString}`,
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
    cancelAllOpenOrders()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = cancelAllOpenOrders;
