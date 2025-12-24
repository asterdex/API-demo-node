/**
 * Withdraw / 提现
 * POST /api/v1/aster/user-withdraw
 * 
 * Submit a withdraw request
 * 提交提现请求
 * 
 * Weight: 1
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 */
const params = {
    coin: 'USDT',               // Coin / 币种 (required / 必需)
    address: '0x...',           // Withdraw address / 提现地址 (required / 必需)
    amount: '100',              // Withdraw amount / 提现金额 (required / 必需)
    // network: 'ETH',          // Network (optional) / 网络（可选）
    // addressTag: 'memo',      // Address tag/memo (optional) / 地址标签/备注（可选）
    // name: 'My Address',      // Address name (optional) / 地址名称（可选）
};

/**
 * Submit withdraw request / 提交提现请求
 */
async function withdraw() {
    try {
        console.log('Submitting withdraw request... / 提交提现请求中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        console.log('⚠️  WARNING / 警告: This will submit a real withdraw request!');
        console.log('    Make sure the address is correct! / 确保地址正确！');
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/aster/user-withdraw?${queryString}`,
            {},
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
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
    // Uncomment to execute (commented for safety)
    // 取消注释以执行（为安全起见已注释）
    console.log('⚠️  This function is commented out for safety / 为安全起见此函数已注释');
    console.log('    Uncomment in the code to execute / 在代码中取消注释以执行');
    
    // withdraw()
    //     .then(() => console.log('\n✓ Request completed / 请求完成'))
    //     .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = withdraw;
