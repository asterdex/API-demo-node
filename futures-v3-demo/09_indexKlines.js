/**
 * Index Price Kline / 指数价格K线
 * GET /fapi/v3/indexPriceKlines
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "pair": "BTCUSDT",
    "interval": "1h",
    "limit": 10
};

async function indexKlines() {
    try {
        console.log('Request / 请求:', 'GET /fapi/v3/indexPriceKlines');
        console.log('Parameters / 参数:', params);
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v3/indexPriceKlines`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    indexKlines()
        .then(() => console.log('\n✓ Completed / 完成'))
        .catch(() => console.log('\n✗ Failed / 失败'));
}

module.exports = indexKlines;
