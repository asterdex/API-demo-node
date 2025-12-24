/**
 * Commission Rate / 手续费率
 * GET /api/v1/commissionRate
 * 
 * Get commission rate for a symbol
 * 获取交易对的手续费率
 * 
 * Weight: 20
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',     // Trading pair / 交易对 (required / 必需)
};

/**
 * Get commission rate / 获取手续费率
 */
async function getCommissionRate() {
    try {
        console.log('Getting commission rate... / 获取手续费率中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.get(
            `${config.BASE_URL}/api/v1/commissionRate?${queryString}`,
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
    getCommissionRate()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getCommissionRate;
