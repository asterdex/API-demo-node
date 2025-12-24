/**
 * Get All Withdraw Assets / 获取所有提币资产
 * GET /bapi/futures/v1/public/future/aster/withdraw/assets
 * 
 * Get all supported withdraw assets
 * 获取所有支持的提币资产
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Get withdraw assets / 获取提币资产
 * @param {string} chainIds - Chain IDs, comma separated / 链ID，逗号分隔
 * @param {string} networks - Network types, comma separated / 网络类型，逗号分隔
 * @param {string} accountType - Account type (spot, perp) / 账户类型
 */
async function getWithdrawAssets(
    chainIds = '56',
    networks = 'EVM',
    accountType = 'spot'
) {
    try {
        console.log('Getting withdraw assets... / 获取提币资产中...\n');
        
        const params = {
            chainIds,
            networks,
            accountType
        };
        
        console.log('Parameters / 参数:', params, '\n');
        
        const response = await axios.get(
            `${config.BASE_URL}/bapi/futures/v1/public/future/aster/withdraw/assets`,
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
    getWithdrawAssets()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getWithdrawAssets;

