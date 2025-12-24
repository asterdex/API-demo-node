/**
 * Query Current Open Order / 查询当前挂单
 * GET /fapi/v1/openOrder
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "symbol": "BTCUSDT",
    "orderId": "123456"
};

async function openOrder() {
    try {
        console.log('Parameters / 参数:', params);
        
        // Sign the parameters / 签名参数
        const { signParams, buildQueryString } = require('./utils');
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v1/openOrder?${queryString}`, {
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

if (require.main === module) {
    openOrder()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = openOrder;
