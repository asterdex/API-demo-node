/**
 * Withdraw by API [Solana] [Spot] / 通过API提币 [Solana] [现货]
 * POST /api/v1/aster/user-solana-withdraw
 * 
 * Withdraw cryptocurrency to a Solana address (Spot account)
 * 将加密货币提现到Solana地址（现货账户）
 * 
 * Weight: 1
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams } = require('./utils');

/**
 * Withdraw to Solana address (Spot) / 提币到Solana地址（现货）
 * 
 * @param {string} asset - Asset name (e.g., USDT) / 资产名称
 * @param {string} amount - Withdraw amount / 提币数量
 * @param {string} fee - Withdraw fee / 提币手续费
 * @param {string} receiver - Solana address / Solana地址
 */
async function withdrawSolanaSpot(
    asset,
    amount,
    fee,
    receiver
) {
    try {
        console.log('Withdrawing via Solana (Spot)... / 通过Solana提币中（现货）...\n');
        
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
            `${config.SPOT_API_URL}/api/v1/aster/user-solana-withdraw`,
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
        amount: '0.97',
        fee: '0.5',
        receiver: 'BzsJhmtg2UtQWNw6764DkK5Y4GPjc1XMzRqAGqSziymK' // Example Solana address
    };
    
    console.log('⚠️  This is an example with sample data');
    console.log('⚠️  这是使用示例数据的演示\n');
    
    // Uncomment to run / 取消注释以运行
    // withdrawSolanaSpot(...Object.values(exampleParams))
    //     .then(() => console.log('\n✓ Withdrawal completed / 提币完成'))
    //     .catch(() => console.log('\n✗ Withdrawal failed / 提币失败'));
}

module.exports = withdrawSolanaSpot;

