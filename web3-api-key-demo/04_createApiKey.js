/**
 * Create API Key / 创建API密钥
 * POST /bapi/futures/v1/public/future/web3/broker-create-api-key
 * 
 * Create API key with wallet signature
 * 使用钱包签名创建API密钥
 * 
 * ⚠️ IMPORTANT / 重要提示:
 * 1. Please keep a record of the returned apiKey and apiSecret
 *    请记录返回的apiKey和apiSecret
 * 2. If you lose them, you cannot retrieve them and can only create them again
 *    如果丢失，无法找回，只能重新创建
 * 3. API keys cannot be deleted by user now
 *    API密钥目前无法由用户删除
 * 
 * Weight: 1
 * Security: Signature required / 需要签名
 */

const axios = require('axios');
const config = require('./config');
const { getNonceAndSign } = require('./02_signMessage');

/**
 * Create API key / 创建API密钥
 * @param {string} signature - Message signature / 消息签名
 * @param {string} walletAddress - Wallet address / 钱包地址
 * @param {string} desc - API key description / API密钥描述
 * @param {string} network - Blockchain network / 区块链网络
 * @param {string} ip - IP whitelist / IP白名单
 * @param {string} sourceCode - Source code / 来源代码
 * @returns {Promise<Object>} {apiKey, apiSecret, keyId, apiName}
 */
async function createApiKey(
    signature,
    walletAddress = config.WALLET_ADDRESS,
    desc = config.API_KEY_DESC,
    network = config.NETWORK,
    ip = config.IP_WHITELIST,
    sourceCode = config.SOURCE_CODE
) {
    try {
        console.log('Creating API key... / 创建API密钥中...\n');
        console.log('Wallet Address / 钱包地址:', walletAddress);
        console.log('Description / 描述:', desc);
        console.log('Network / 网络:', network);
        console.log('IP Whitelist / IP白名单:', ip || '(No restriction / 无限制)');
        console.log('Source Code / 来源代码:', sourceCode);
        console.log('Signature / 签名:', signature.substring(0, 20) + '...', '\n');
        
        const response = await axios.post(
            `${config.BASE_URL}/bapi/futures/v1/public/future/web3/broker-create-api-key`,
            {
                desc: desc,
                ip: ip,
                network: network,
                signature: signature,
                sourceAddr: walletAddress,
                type: 'CREATE_API_KEY',
                sourceCode: sourceCode
            },
            {
                headers: {
                    'clientType': 'broker',
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Output response / 输出响应
        console.log('Response / 响应:');
        console.log(JSON.stringify(response.data, null, 2));
        
        if (response.data.success && response.data.data) {
            const { apiKey, apiSecret, keyId, apiName } = response.data.data;
            
            console.log('\n' + '='.repeat(60));
            console.log('✓ API Key created successfully / API密钥创建成功');
            console.log('='.repeat(60));
            console.log('\n⚠️  IMPORTANT: Save these credentials safely! / 重要：请安全保存这些凭证！\n');
            console.log('API Key / API密钥:');
            console.log(apiKey);
            console.log('\nAPI Secret / API密钥:');
            console.log(apiSecret);
            console.log('\nKey ID / 密钥ID:', keyId);
            if (apiName) console.log('API Name / API名称:', apiName);
            console.log('\n' + '='.repeat(60));
            
            return { apiKey, apiSecret, keyId, apiName };
        } else {
            throw new Error('Failed to create API key / 创建API密钥失败');
        }
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Complete API key creation flow / 完整API密钥创建流程
 * This is the recommended method: Get nonce -> Sign -> Create API key
 * 这是推荐的方法：获取随机数 -> 签名 -> 创建API密钥
 * 
 * No login required! / 无需登录！
 * 
 * @returns {Promise<Object>} {apiKey, apiSecret, keyId, apiName}
 */
async function completeApiKeyCreation() {
    try {
        console.log('Starting complete API key creation flow...');
        console.log('开始完整的API密钥创建流程...\n');
        console.log('ℹ️  This process does NOT require login (step 3)');
        console.log('ℹ️  此流程不需要登录（步骤3）');
        console.log('ℹ️  We will directly: get nonce -> sign -> create API key');
        console.log('ℹ️  我们将直接：获取随机数 -> 签名 -> 创建API密钥\n');
        console.log('='.repeat(60) + '\n');
        
        // Step 1 & 2: Get fresh nonce and sign / 步骤1和2：获取新随机数并签名
        console.log('STEP 1-2: Getting fresh nonce and signing message');
        console.log('步骤1-2：获取新随机数并签名消息');
        console.log('(Each API key creation needs a fresh signature)');
        console.log('(每次创建API密钥都需要一个新的签名)\n');
        const { signature } = await getNonceAndSign();
        
        console.log('\n' + '='.repeat(60) + '\n');
        
        // Step 4: Create API key (step 3 login is skipped) / 步骤4：创建API密钥（跳过步骤3登录）
        console.log('STEP 4: Creating API key with the signature');
        console.log('步骤4：使用签名创建API密钥\n');
        const apiKeyResult = await createApiKey(signature);
        
        return apiKeyResult;
    } catch (error) {
        console.error('Error in API key creation flow / API密钥创建流程错误:', error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    completeApiKeyCreation()
        .then(() => console.log('\n✓ All operations completed / 所有操作完成'))
        .catch(() => console.log('\n✗ Operation failed / 操作失败'));
}

module.exports = { createApiKey, completeApiKeyCreation };

