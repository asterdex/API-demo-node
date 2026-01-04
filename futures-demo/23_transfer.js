/**
 * Transfer Between Futures And Spot / 期货现货划转
 * POST /fapi/v1/asset/wallet/transfer
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "asset": "USDT",
    "amount": "100",
    "clientTranId": `transfer_${Date.now()}`, // 唯一的交易ID / Unique transaction ID
    "kindType": "FUTURE_SPOT" // FUTURE_SPOT (期货转现货) 或 SPOT_FUTURE (现货转期货)
};

async function transfer() {
    try {
        console.log('Request / 请求:', 'POST /fapi/v1/asset/wallet/transfer');
        console.log('Parameters / 参数:', params);
        
        // Sign the parameters / 签名参数
        const { signParams, buildQueryString } = require('./utils');
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const fullUrl = `${config.BASE_URL}/fapi/v1/asset/wallet/transfer`;
        const response = await axios.post(
            fullUrl,
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
        
        // Output request details / 输出请求详情
        console.log('\n--- Request Details / 请求详情 ---');
        console.log('Full URL / 完整URL:', fullUrl);
        console.log('Query String / 查询字符串:', queryString);
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    transfer()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = transfer;
