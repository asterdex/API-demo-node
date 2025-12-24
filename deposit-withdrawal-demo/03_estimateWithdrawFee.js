/**
 * Estimate Withdraw Fee / 估算提币手续费
 * GET /bapi/futures/v1/public/future/aster/estimate-withdraw-fee
 * 
 * Estimate the withdrawal fee for a specific currency and network
 * 估算特定币种和网络的提币手续费
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Estimate withdraw fee / 估算提币手续费
 * @param {number} chainId - Chain ID / 链ID
 * @param {string} network - Network type (EVM, SOL) / 网络类型
 * @param {string} currency - Currency name (e.g., ASTER, USDT) / 币种名称
 * @param {string} accountType - Account type (spot, perp) / 账户类型
 */
async function estimateWithdrawFee(
    chainId = 56,
    network = 'EVM',
    currency = 'ASTER',
    accountType = 'spot'
) {
    try {
        console.log('Estimating withdraw fee... / 估算提币手续费中...\n');
        
        const params = {
            chainId,
            network,
            currency,
            accountType
        };
        
        console.log('Parameters / 参数:', params, '\n');
        
        const response = await axios.get(
            `${config.BASE_URL}/bapi/futures/v1/public/future/aster/estimate-withdraw-fee`,
            { params }
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
    estimateWithdrawFee()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = estimateWithdrawFee;

