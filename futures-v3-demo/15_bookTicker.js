/**
 * Best Order Book / 最优挂单
 * GET /fapi/v3/ticker/bookTicker
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "symbol": "BTCUSDT"
};

async function bookTicker() {
    try {
        console.log('Request / 请求:', 'GET /fapi/v3/ticker/bookTicker');
        console.log('Parameters / 参数:', params);
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v3/ticker/bookTicker`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    bookTicker()
        .then(() => console.log('\n✓ Completed / 完成'))
        .catch(() => console.log('\n✗ Failed / 失败'));
}

module.exports = bookTicker;
