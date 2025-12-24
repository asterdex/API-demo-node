/**
 * Withdraw by API [EVM] [Futures] / 通过API提币 [EVM] [期货]
 * POST /fapi/aster/user-withdraw
 * 
 * Withdraw cryptocurrency to an EVM-compatible address (Futures account)
 * 将加密货币提现到EVM兼容地址（期货账户）
 * 
 * ⚠️ Requires EIP712 signature from your wallet
 * ⚠️ 需要您钱包的EIP712签名
 * 
 * Weight: 1
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams } = require('./utils');

/**
 * Withdraw to EVM address (Futures) / 提币到EVM地址（期货）
 * 
 * @param {number} chainId - Chain ID (56=BSC, 1=ETH, 42161=Arbitrum) / 链ID
 * @param {string} asset - Asset name (e.g., USDT, ASTER) / 资产名称
 * @param {string} amount - Withdraw amount / 提币数量
 * @param {string} fee - Withdraw fee / 提币手续费
 * @param {string} receiver - Receipt address / 接收地址
 * @param {string} nonce - Unique nonce (timestamp * 1000) / 唯一随机数
 * @param {string} userSignature - EIP712 signature / EIP712签名
 */
async function withdrawEvmFutures(
    chainId,
    asset,
    amount,
    fee,
    receiver,
    nonce,
    userSignature
) {
    try {
        console.log('Withdrawing via EVM (Futures)... / 通过EVM提币中（期货）...\n');
        
        const params = {
            chainId: 56,
            asset: 'USDT',
            amount: '10',
            fee: '0.1',
            receiver: 'YOUR_ADDRESS',
            nonce: String(Date.now() * 1000),
            userSignature: 'YOUR_EIP712_SIGNATURE'
        };
        
        console.log('Parameters / 参数:', params, '\n');
        
        // Sign request parameters / 签名请求参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        
        const response = await axios.post(
            `${config.FUTURES_API_URL}/fapi/aster/user-withdraw`,
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
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Example usage / 使用示例
if (require.main === module) {
    // ⚠️ This is just an example. You need to generate a real EIP712 signature!
    // ⚠️ 这只是示例。您需要生成真实的EIP712签名！
    
    const exampleParams = {
        chainId: 56,
        asset: 'USDT',
        amount: '10',
        fee: '0.1',
        receiver: config.WALLET_ADDRESS,
        nonce: String(Date.now() * 1000),
        userSignature: '0x...' // You need to generate this with EIP712!
    };
    
    console.log('⚠️  This example will fail without a valid EIP712 signature');
    console.log('⚠️  此示例在没有有效EIP712签名的情况下会失败\n');
    console.log('To generate EIP712 signature, see documentation:');
    console.log('要生成EIP712签名，请参阅文档：');
    console.log('11-deposit-withdrawal-en.md - Section 4\n');
    
    // Uncomment to run / 取消注释以运行
    // withdrawEvmFutures(...Object.values(exampleParams))
    //     .then(() => console.log('\n✓ Withdrawal completed / 提币完成'))
    //     .catch(() => console.log('\n✗ Withdrawal failed / 提币失败'));
}

module.exports = withdrawEvmFutures;

