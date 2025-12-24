/**
 * Close Listen Key / 关闭Listen Key
 * DELETE /api/v1/listenKey
 * 
 * Close a user data stream
 * 关闭用户数据流
 * 
 * Weight: 1
 * Security: USER_STREAM
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    listenKey: 'your_listen_key_here',  // Listen key to close / 要关闭的listen key (required / 必需)
};

/**
 * Close listen key / 关闭listen key
 */
async function closeListenKey() {
    try {
        console.log('Closing listen key... / 关闭listen key中...\n');
        console.log('Listen Key:', params.listenKey);
        console.log('');
        
        const response = await axios.delete(
            `${config.BASE_URL}/api/v1/listenKey`,
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/json'
                },
                data: params
            }
        );

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
    closeListenKey()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = closeListenKey;
