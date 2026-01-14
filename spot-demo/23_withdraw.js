/**
 * Withdraw / 提现
 * POST /api/v1/aster/user-withdraw
 * 
 * Submit a withdraw request
 * 提交提现请求
 * 
 * Weight: 1
 * Security: USER_DATA
 * 
 * ⚠️ IMPORTANT / 重要说明:
 * This endpoint requires TWO signatures / 此接口需要两个签名:
 * 1. userSignature - EIP-712 wallet signature (auto-generated) / EIP-712 钱包签名（自动生成）
 * 2. HMAC SHA256 signature - API signature (auto-generated) / HMAC SHA256 API签名（自动生成）
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');
const { generateWithdrawSignature } = require('./walletSignature');

/**
 * Withdraw parameters / 提现参数
 * 
 * Note: nonce and userSignature will be auto-generated
 * 注意：nonce 和 userSignature 将自动生成
 */
const withdrawParams = {
    chainId: '56',                          // Chain ID: 1(ETH), 56(BSC), 42161(Arbi)
    asset: 'USDT',                          // Coin / 币种
    receiver: config.WALLET_ADDRESS,        // Withdraw address / 提现地址 (using wallet address from config)
    amount: '10',                           // Withdraw amount / 提现金额
    fee: '1.234567891',                     // Fee / 手续费
    // network: 'ETH',                      // Network (optional) / 网络（可选）
    // addressTag: 'memo',                  // Address tag/memo (optional) / 地址标签/备注（可选）
    // name: 'My Address',                  // Address name (optional) / 地址名称（可选）
};

/**
 * Submit withdraw request / 提交提现请求
 * 
 * @param {Object} customParams - Custom withdraw parameters (optional) / 自定义提现参数（可选）
 * @param {string} asterChain - 'Mainnet' or 'Testnet' (default: 'Mainnet')
 * @returns {Promise<Object>} Withdraw response / 提现响应
 */
async function withdraw(customParams = null, asterChain = 'Mainnet') {
    try {
        // Use custom params or default params / 使用自定义参数或默认参数
        const params = customParams || withdrawParams;
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📤 Withdraw Request / 提现请求');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('⚠️  WARNING / 警告: This will submit a REAL withdraw request!');
        console.log('    Make sure all parameters are correct! / 确保所有参数正确！\n');
        
        console.log('Withdraw Parameters / 提现参数:');
        console.log(`  Chain ID: ${params.chainId}`);
        console.log(`  Asset: ${params.asset}`);
        console.log(`  Amount: ${params.amount}`);
        console.log(`  Fee: ${params.fee}`);
        console.log(`  Receiver: ${params.receiver}`);
        console.log(`  Aster Chain: ${asterChain}\n`);
        
        // Step 1: Generate user signature (EIP-712) / 步骤1：生成用户签名（EIP-712）
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔐 Step 1: Generating User Signature (EIP-712)');
        console.log('    步骤1：生成用户签名（EIP-712）');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const { nonce, userSignature } = await generateWithdrawSignature(
            params,
            config.PRIVATE_KEY,
            asterChain
        );
        
        // Step 2: Add nonce and userSignature to params / 步骤2：添加 nonce 和 userSignature 到参数
        const completeParams = {
            ...params,
            nonce,
            userSignature
        };
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔐 Step 2: Generating API Signature (HMAC SHA256)');
        console.log('    步骤2：生成API签名（HMAC SHA256）');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Step 3: Sign with HMAC SHA256 / 步骤3：使用 HMAC SHA256 签名
        const signedParams = signParams(completeParams, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        console.log('✓ API signature generated / API签名已生成\n');
        
        // Step 4: Submit request / 步骤4：提交请求
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📡 Step 3: Submitting Request / 步骤3：提交请求');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        const fullUrl = `${config.BASE_URL}/api/v1/aster/user-withdraw?${queryString}`;
        console.log('Full URL / 完整URL:');
        console.log(fullUrl);
        console.log('');
        
        const response = await axios.post(
            fullUrl,
            {},
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Response / 响应');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log(JSON.stringify(response.data, null, 2));
        
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
    // ⚠️ SAFETY: Uncomment the line below to execute
    // ⚠️ 安全提示：取消下面一行的注释以执行
    
    console.log('⚠️  This function is commented out for safety / 为安全起见此函数已注释');
    console.log('    Uncomment the withdraw() call in the code to execute');
    console.log('    在代码中取消注释 withdraw() 调用以执行\n');
    
    // withdraw()
    //     .then(() => console.log('\n✓ Request completed / 请求完成'))
    //     .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = withdraw;
