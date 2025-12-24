/**
 * Keepalive Listen Key / 保持Listen Key活跃
 * PUT /api/v1/listenKey
 * 
 * Keepalive a user data stream to prevent timeout
 * 保持用户数据流活跃以防止超时
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
    listenKey: 'your_listen_key_here',  // Listen key to keepalive / 要保持活跃的listen key (required / 必需)
};

/**
 * Keepalive listen key / 保持listen key活跃
 */
async function keepaliveListenKey() {
    try {
        console.log('Keeping listen key alive... / 保持listen key活跃中...\n');
        console.log('Listen Key:', params.listenKey);
        console.log('');
        
        const response = await axios.put(
            `${config.BASE_URL}/api/v1/listenKey`,
            params,
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/json'
                }
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
    keepaliveListenKey()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = keepaliveListenKey;
