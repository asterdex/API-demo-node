/**
 * Get Nonce / 获取Nonce
 * POST /api/v1/getNonce
 * 
 * Get nonce for API key creation
 * 获取用于创建API密钥的Nonce
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Get nonce / 获取Nonce
 * @param {string} network - Optional network parameter (e.g., 'SOL' for Solana) / 可选的网络参数（例如 Solana 使用 'SOL'）
 * @returns {Promise<string>} Nonce value / Nonce值
 */
async function getNonce(network = null) {
    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📝 Get Nonce / 获取Nonce');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('Parameters / 参数:');
        console.log(`  Address / 地址: ${config.WALLET_ADDRESS}`);
        console.log(`  User Operation Type / 操作类型: CREATE_API_KEY`);
        if (network) {
            console.log(`  Network / 网络: ${network}`);
        }
        console.log('');
        
        // Build request parameters / 构建请求参数
        const params = {
            address: config.WALLET_ADDRESS,
            userOperationType: 'CREATE_API_KEY'
        };
        
        // Add optional network parameter / 添加可选的网络参数
        if (network) {
            params.network = network;
        }
        
        // Build query string / 构建查询字符串
        const queryString = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/getNonce?${queryString}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Response / 响应');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Output raw response data / 输出原始响应数据
        console.log(`Nonce: ${response.data}`);
        
        return response.data;
    } catch (error) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('❌ Error / 错误');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    getNonce()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getNonce;
