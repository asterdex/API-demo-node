/**
 * Create API Key / 创建API密钥
 * POST /api/v1/createApiKey
 * 
 * Create a new API key pair
 * 创建新的API密钥对
 * 
 * Weight: 1
 * Security: NONE (but requires wallet signature)
 * 
 * Note: This example shows how to generate the signature programmatically
 * 注意：此示例展示如何以编程方式生成签名
 */

const axios = require('axios');
const { ethers } = require('ethers');
const config = require('./config');

/**
 * Generate wallet signature for nonce / 为nonce生成钱包签名
 * @param {string} nonce - The nonce to sign / 要签名的nonce
 * @param {string} privateKey - Wallet private key / 钱包私钥
 * @returns {Promise<string>} Signature / 签名
 */
async function generateSignature(nonce, privateKey) {
    try {
        // Create wallet from private key / 从私钥创建钱包
        const wallet = new ethers.Wallet(privateKey);
        
        // Sign the nonce / 签名nonce
        const signature = await wallet.signMessage(nonce);
        
        console.log('✓ Signature generated / 签名已生成');
        console.log(`  Signature / 签名: ${signature}\n`);
        
        return signature;
    } catch (error) {
        console.error('Failed to generate signature / 签名生成失败:', error.message);
        throw error;
    }
}

/**
 * Get nonce from server / 从服务器获取nonce
 * @param {string} address - Wallet address / 钱包地址
 * @param {string} network - Optional network parameter / 可选的网络参数
 * @returns {Promise<string>} Nonce / Nonce值
 */
async function getNonce(address, network = null) {
    try {
        console.log('Getting nonce from server... / 从服务器获取nonce中...');
        
        // Build request parameters / 构建请求参数
        const params = {
            address: address,
            userOperationType: 'CREATE_API_KEY'
        };
        
        // Add optional network parameter / 添加可选的网络参数
        if (network) {
            params.network = network;
        }
        
        // Build query string / 构建查询字符串
        const queryString = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/getNonce?${queryString}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        // Output raw response data / 输出原始响应数据
        console.log(`✓ Nonce received / 已收到nonce: ${response.data}\n`);
        
        return response.data;
    } catch (error) {
        console.error('\n✗ Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Create API Key / 创建API密钥
 * @param {string} desc - API key description / API密钥描述
 * @param {string} apikeyIP - Optional IP whitelist / 可选IP白名单
 * @param {string} network - Optional network parameter / 可选网络参数
 * @returns {Promise<Object>} {apiKey, apiSecret}
 */
async function createApiKey(desc = 'My API Key', apikeyIP = null, network = null) {
    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('  Create API Key / 创建API密钥');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Step 1: Get nonce / 步骤1：获取nonce
        console.log('Step 1: Getting nonce / 获取nonce');
        const nonce = await getNonce(config.WALLET_ADDRESS, network);
        
        // Step 2: Generate signature / 步骤2：生成签名
        console.log('Step 2: Generating signature / 生成签名');
        const message = `You are signing into Astherus ${nonce}`;
        const signature = await generateSignature(message, config.PRIVATE_KEY);
        
        // Step 3: Create API key / 步骤3：创建API密钥
        console.log('Step 3: Creating API key / 创建API密钥');
        console.log(`  Address / 地址: ${config.WALLET_ADDRESS}`);
        console.log(`  Description / 描述: ${desc}`);
        if (apikeyIP) {
            console.log(`  IP Whitelist / IP白名单: ${apikeyIP}`);
        }
        console.log('');
        
        // Build request parameters / 构建请求参数
        const params = {
            address: config.WALLET_ADDRESS,
            userOperationType: 'CREATE_API_KEY',
            userSignature: signature,
            desc: desc,
            recvWindow: config.RECV_WINDOW,
            timestamp: Date.now()
        };
        
        // Add optional parameters / 添加可选参数
        if (apikeyIP) {
            params.apikeyIP = apikeyIP;
        }
        if (network) {
            params.network = network;
        }
        
        // Build query string / 构建查询字符串
        const queryString = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/createApiKey?${queryString}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ API Key Created Successfully!');
        console.log('   API密钥创建成功！');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('API Credentials / API凭证:');
        console.log(JSON.stringify(response.data, null, 2));
        
        console.log('\n⚠️  IMPORTANT / 重要提示:');
        console.log('  Save these credentials securely!');
        console.log('  安全保存这些凭证！');
        console.log('  You cannot retrieve them later.');
        console.log('  之后无法再次获取。\n');
        
        return response.data;
    } catch (error) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('❌ Error / 错误');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    // console.log('⚠️  Before running / 运行前:');
    // console.log('  1. Set WALLET_ADDRESS in config.js / 在config.js中设置钱包地址');
    // console.log('  2. Set PRIVATE_KEY in config.js / 在config.js中设置私钥');
    // console.log('  3. Ensure ethers is installed: npm install ethers / 确保已安装ethers库\n');
    // console.log('  Uncomment the code below to execute / 取消下面代码的注释以执行\n');
    
    // Example usage / 使用示例:
    // createApiKey('My Test API Key', '192.168.1.1')  // With IP whitelist / 带IP白名单
    createApiKey('My Test API Key')                 // Without IP whitelist / 不带IP白名单
    // createApiKey('My SOL API Key', null, 'SOL')     // For Solana network (需要 Solana 地址!)
    
    createApiKey()  // 使用默认参数（EVM 地址）
        .then(() => console.log('\n✓ Process completed / 流程完成'))
        .catch(() => console.log('\n✗ Process failed / 流程失败'));
}

module.exports = { createApiKey, generateSignature, getNonce };
