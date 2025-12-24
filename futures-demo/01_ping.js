/**
 * Test Connectivity / 测试连接
 * GET /fapi/v1/ping
 * 
 * Test connectivity to the Rest API
 * 测试与Rest API的连接
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Test server connectivity / 测试服务器连接
 */
async function ping() {
    try {
        console.log('Testing Futures API connectivity... / 测试期货API连接中...\n');
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v1/ping`);
        
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
    ping()
        .then(() => console.log('\n✓ Test completed / 测试完成'))
        .catch(() => console.log('\n✗ Test failed / 测试失败'));
}

module.exports = ping;

