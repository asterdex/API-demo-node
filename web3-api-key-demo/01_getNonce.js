/**
 * Get Nonce / 获取随机数
 * POST /bapi/futures/v1/public/future/web3/get-nonce
 * 
 * Get a nonce for signing message
 * 获取用于签名消息的随机数
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Get nonce for wallet address / 获取钱包地址的随机数
 * @param {string} walletAddress - Wallet address / 钱包地址
 * @param {string} type - Operation type / 操作类型
 * @returns {Promise<string>} Nonce / 随机数
 */
async function getNonce(walletAddress = config.WALLET_ADDRESS, type = 'CREATE_API_KEY') {
    try {
        console.log('Getting nonce... / 获取随机数中...\n');
        console.log('Wallet Address / 钱包地址:', walletAddress);
        console.log('Type / 类型:', type, '\n');
        
        const response = await axios.post(
            `${config.BASE_URL}/bapi/futures/v1/public/future/web3/get-nonce`,
            {
                sourceAddr: walletAddress,
                type: type
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Output response / 输出响应
        console.log('Response / 响应:');
        console.log(JSON.stringify(response.data, null, 2));
        
        if (response.data.success && response.data.data) {
            const nonce = response.data.data.nonce;
            console.log('\n✓ Nonce obtained / 随机数已获取:', nonce);
            return nonce;
        } else {
            throw new Error('Failed to get nonce / 获取随机数失败');
        }
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    getNonce()
        .then(() => console.log('\n✓ Operation completed / 操作完成'))
        .catch(() => console.log('\n✗ Operation failed / 操作失败'));
}

module.exports = getNonce;

