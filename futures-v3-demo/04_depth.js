/**
 * Order Book / 订单簿
 * GET /fapi/v3/depth
 */

const axios = require('axios');
const config = require('./config');

const params = {
    "symbol": "BTCUSDT",
    "limit": 10
};

async function depth() {
    try {
        console.log('Request / 请求:', 'GET /fapi/v3/depth');
        console.log('Parameters / 参数:', params);
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v3/depth`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    depth()
        .then(() => console.log('\n✓ Completed / 完成'))
        .catch(() => console.log('\n✗ Failed / 失败'));
}

module.exports = depth;
