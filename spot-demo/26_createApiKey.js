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
 * @param {string} walletAddress - Wallet address / 钱包地址
 * @returns {Promise<string>} Nonce / Nonce值
 */
async function getNonce(walletAddress) {
    try {
        console.log('Getting nonce from server... / 从服务器获取nonce中...');
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/getNonce`,
            { walletAddress },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        return response.data;
    } catch (error) {
        console.error('\n✗ Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Create API Key with Auto Signature');
    console.log('  自动签名创建API密钥');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚠️  Before running / 运行前:');
    console.log('  1. Set WALLET_ADDRESS in config.js / 在config.js中设置钱包地址');
    console.log('  2. Set PRIVATE_KEY in config.js / 在config.js中设置私钥');
    console.log('  3. Install ethers: npm install ethers / 安装ethers库\n');
    console.log('  Uncomment the code below to execute / 取消下面代码的注释以执行\n');
    
    // createApiKey()
    //     .then(() => console.log('✓ Process completed / 流程完成'))
    //     .catch(() => console.log('✗ Process failed / 流程失败'));
}

module.exports = { createApiKey, generateSignature, getNonce };
