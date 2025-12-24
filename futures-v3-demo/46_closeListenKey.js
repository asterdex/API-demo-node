/**
 * Close ListenKey / 关闭ListenKey
 * DELETE /fapi/v3/listenKey
 */

const axios = require('axios');
const config = require('./config');

const params = {};

async function closeListenKey() {
    try {
        console.log('Request / 请求:', 'DELETE /fapi/v3/listenKey');
        console.log('Parameters / 参数:', params);
        
        const response = await axios.delete(`${config.BASE_URL}/fapi/v3/listenKey`);
        
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
        .then(() => console.log('\n✓ Completed / 完成'))
        .catch(() => console.log('\n✗ Failed / 失败'));
}

module.exports = closeListenKey;
