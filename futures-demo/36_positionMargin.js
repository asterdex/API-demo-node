/**
 * Modify Isolated Position Margin / 调整逐仓保证金
 * POST /fapi/v1/positionMargin
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "symbol": "BTCUSDT",
    "amount": "100",
    "type": 1
};

async function positionMargin() {
    try {
        console.log('Parameters / 参数:', params);
        
        // Sign the parameters / 签名参数
        const { signParams, buildQueryString } = require('./utils');
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.post(
            `${config.BASE_URL}/fapi/v1/positionMargin`,
            queryString,
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
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

if (require.main === module) {
    positionMargin()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = positionMargin;
