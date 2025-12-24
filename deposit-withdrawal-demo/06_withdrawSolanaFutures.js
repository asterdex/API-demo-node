/**
 * Withdraw by API [Solana] [Futures] / 通过API提币 [Solana] [期货]
 * POST /fapi/aster/user-solana-withdraw
 * 
 * Withdraw cryptocurrency to a Solana address (Futures account)
 * 将加密货币提现到Solana地址（期货账户）
 * 
 * Weight: 1
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams } = require('./utils');

/**
 * Withdraw to Solana address (Futures) / 提币到Solana地址（期货）
 * 
 * @param {string} asset - Asset name (e.g., USDT) / 资产名称
 * @param {string} amount - Withdraw amount / 提币数量
 * @param {string} fee - Withdraw fee / 提币手续费
 * @param {string} receiver - Solana address / Solana地址
 */
async function withdrawSolanaFutures(
    asset,
    amount,
    fee,
    receiver
) {
    try {
        console.log('Withdrawing via Solana (Futures)... / 通过Solana提币中（期货）...\n');
        
        const params = {
            chainId: 101, // Fixed value for Solana / Solana固定值
            asset,
            amount,
            fee,
            receiver
        };
        
        console.log('Parameters / 参数:', params, '\n');
        
        // Sign request parameters / 签名请求参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        
        const response = await axios.post(
            `${config.FUTURES_API_URL}/fapi/aster/user-solana-withdraw`,
            null,
            {
                params: signedParams,
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\nℹ️  Note: hash is not the transaction hash, just a unique value');
        console.log('ℹ️  注意：hash不是交易哈希，只是一个唯一值\n');
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Example usage / 使用示例
if (require.main === module) {
    const exampleParams = {
        asset: 'USDT',
        amount: '3',
        fee: '0.6',
        receiver: '4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf' // Example Solana address
    };
    
    console.log('⚠️  This is an example with sample data');
    console.log('⚠️  这是使用示例数据的演示\n');
    
    // Uncomment to run / 取消注释以运行
    // withdrawSolanaFutures(...Object.values(exampleParams))
    //     .then(() => console.log('\n✓ Withdrawal completed / 提币完成'))
    //     .catch(() => console.log('\n✗ Withdrawal failed / 提币失败'));
}

module.exports = withdrawSolanaFutures;

