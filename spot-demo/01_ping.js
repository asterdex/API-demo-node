/**
 * Test Connectivity / 测试连接
 * GET /api/v1/ping
 * 
 * Test whether the REST API can be reached
 * 测试REST API是否可以访问
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
        console.log('Testing server connectivity... / 测试服务器连接中...\n');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/ping`);
        
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

