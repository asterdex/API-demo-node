/**
 * Recent Trades List / 最近成交列表
 * GET /fapi/v1/trades
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "symbol": "BTCUSDT",
    "limit": 10
};

async function trades() {
    try {
        console.log('Parameters / 参数:', params);
        
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v1/trades`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    trades()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = trades;
