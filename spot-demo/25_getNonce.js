/**
 * Get Nonce / 获取Nonce
 * POST /api/v1/getNonce
 * 
 * Get nonce for API key creation
 * 获取用于创建API密钥的Nonce
 * 
 * Weight: 1
 * Security: NONE (but requires wallet signature)
 */

const axios = require('axios');
const config = require('./config');

/**
 * Get nonce / 获取Nonce
 */
async function getNonce() {
    try {
        console.log('Getting nonce for API key creation... / 获取API密钥创建的Nonce中...\n');
        console.log('Wallet Address / 钱包地址:', config.WALLET_ADDRESS);
        console.log('');
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/getNonce`,
            {
                walletAddress: config.WALLET_ADDRESS
            },
            {
                headers: {
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
    getNonce()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getNonce;
