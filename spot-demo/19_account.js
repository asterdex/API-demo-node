/**
 * Account Information / 账户信息
 * GET /api/v1/account
 * 
 * Get current account information
 * 获取当前账户信息
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
const params = {};

/**
 * Get account information / 获取账户信息
 */
async function getAccountInfo() {
    try {
        console.log('Getting account information... / 获取账户信息中...\n');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.get(
            `${config.BASE_URL}/api/v1/account?${queryString}`,
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
    getAccountInfo()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getAccountInfo;
