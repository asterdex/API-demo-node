/**
 * Web3 Login / Web3登录
 * POST /bapi/futures/v1/public/future/web3/ae/login
 * 
 * Login with wallet signature to get access token
 * 使用钱包签名登录以获取访问令牌
 * 
 * Weight: 1
 * Security: Signature required / 需要签名
 */

const axios = require('axios');
const config = require('./config');
const { getNonceAndSign } = require('./02_signMessage');

/**
 * Login with Web3 wallet signature / 使用Web3钱包签名登录
 * @param {string} signature - Message signature / 消息签名
 * @param {string} walletAddress - Wallet address / 钱包地址
 * @param {number} chainId - Chain ID / 链ID
 * @param {string} agentCode - Agent/referral code (optional) / 代理/推荐码（可选）
 * @returns {Promise<Object>} {token, uid}
 */
async function login(
    signature, 
    walletAddress = config.WALLET_ADDRESS,
    chainId = config.CHAIN_ID,
    agentCode = config.AGENT_CODE
) {
    try {
        console.log('Logging in... / 登录中...\n');
        console.log('Wallet Address / 钱包地址:', walletAddress);
        console.log('Chain ID / 链ID:', chainId);
        console.log('Signature / 签名:', signature.substring(0, 20) + '...', '\n');
        
        const requestData = {
            signature: signature,
            sourceAddr: walletAddress,
            chainId: chainId
        };
        
        // Add agent code if provided / 如果提供了代理码则添加
        if (agentCode) {
            requestData.agentCode = agentCode;
            console.log('Agent Code / 代理码:', agentCode, '\n');
        }
        
        const response = await axios.post(
            `${config.BASE_URL}/bapi/futures/v1/public/future/web3/ae/login`,
            requestData,
            {
                headers: {
                    'clientType': 'broker',
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Output response / 输出响应
        console.log('Response / 响应:');
        console.log(JSON.stringify(response.data, null, 2));
        
        if (response.data.success && response.data.data) {
            const { token, userId, uid, need2FA } = response.data.data;
            const userIdValue = userId || uid; // Support both field names / 支持两种字段名
            
            console.log('\n✓ Login successful / 登录成功');
            console.log('Token / 令牌:', token);
            console.log('User ID / 用户ID:', userIdValue);
            if (need2FA !== undefined) {
                console.log('Need 2FA / 需要双因素认证:', need2FA);
            }
            return { token, userId: userIdValue, need2FA };
        } else {
            throw new Error('Login failed / 登录失败');
        }
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Complete login flow / 完整登录流程
 * Get nonce, sign message, and login
 * 获取随机数、签名消息并登录
 * 
 * Note: Login requires a fresh nonce each time
 * 注意：每次登录都需要一个新的随机数
 * 
 * @returns {Promise<Object>} {token, uid}
 */
async function completeLogin() {
    try {
        console.log('⚠️  Note: Login step is mainly for Web applications');
        console.log('⚠️  注意：登录步骤主要用于Web应用');
        console.log('⚠️  For API key creation, you can skip this and use step 4 directly');
        console.log('⚠️  对于创建API密钥，可以跳过此步骤直接使用步骤4\n');
        console.log('ℹ️  Trying with LOGIN type nonce...');
        console.log('ℹ️  尝试使用LOGIN类型的nonce...\n');
        console.log('='.repeat(60) + '\n');
        
        // Get fresh nonce with LOGIN type / 获取LOGIN类型的新随机数
        // Try 'LOGIN' type first, if fails, will try without type
        // 先尝试'LOGIN'类型，如果失败，会尝试不带类型
        const { signature } = await getNonceAndSign('LOGIN');
        
        console.log('\n' + '='.repeat(60) + '\n');
        
        // Login / 登录
        const loginResult = await login(signature);
        
        return loginResult;
    } catch (error) {
        console.error('Error in login flow / 登录流程错误:', error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    completeLogin()
        .then(() => console.log('\n✓ Operation completed / 操作完成'))
        .catch(() => console.log('\n✗ Operation failed / 操作失败'));
}

module.exports = { login, completeLogin };

