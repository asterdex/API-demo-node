/**
 * Close User Data Stream / 关闭用户数据流
 * DELETE /fapi/v1/listenKey
 */

const axios = require('axios');
const config = require('./config');

const params = {};

async function closeListenKey() {
    try {
        console.log('Parameters / 参数:', params);
        
        
        const response = await axios.delete(`${config.BASE_URL}/fapi/v1/listenKey`, { params, headers: { "X-MBX-APIKEY": config.API_KEY } });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    closeListenKey()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = closeListenKey;
