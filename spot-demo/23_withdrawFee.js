/**
 * Withdraw Fee / 提现手续费
 * GET /api/v1/aster/withdraw/estimateFee
 * 
 * Estimate withdraw fee for an asset
 * 估算资产的提现手续费
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    coin: 'USDT',               // Coin / 币种 (required / 必需)
};

/**
 * Get withdraw fee / 获取提现手续费
 */
async function getWithdrawFee() {
    try {
        console.log('Getting withdraw fee... / 获取提现手续费中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(
            `${config.BASE_URL}/api/v1/aster/withdraw/estimateFee`,
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
    getWithdrawFee()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getWithdrawFee;
