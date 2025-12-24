/**
 * Check Server Time / 检查服务器时间
 * GET /fapi/v1/time
 * 
 * Test connectivity and get the current server time
 * 测试连接并获取当前服务器时间
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Get server time / 获取服务器时间
 */
async function getServerTime() {
    try {
        console.log('Getting Futures server time... / 获取期货服务器时间中...\n');
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v1/time`);
        
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
    getServerTime()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getServerTime;

