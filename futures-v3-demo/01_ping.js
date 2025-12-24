/**
 * Test Connectivity / 测试连接
 * GET /fapi/v3/ping
 */

const axios = require('axios');
const config = require('./config');

const params = {};

async function ping() {
    try {
        console.log('Request / 请求:', 'GET /fapi/v3/ping');
        console.log('Parameters / 参数:', params);
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v3/ping`, );
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    ping()
        .then(() => console.log('\n✓ Completed / 完成'))
        .catch(() => console.log('\n✗ Failed / 失败'));
}

module.exports = ping;
