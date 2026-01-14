/**
 * Create Listen Key / 创建Listen Key
 * POST /api/v1/listenKey
 * 
 * Create a new user data stream listen key
 * 创建新的用户数据流listen key
 * 
 * Weight: 1
 * Security: USER_STREAM
 */

const axios = require('axios');
const config = require('./config');

/**
 * Create listen key for user data stream / 创建用户数据流的listen key
 */
async function createListenKey() {
    try {
        console.log('Creating listen key... / 创建listen key中...\n');
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/listenKey`,
            {},
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY
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
    createListenKey()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = createListenKey;
