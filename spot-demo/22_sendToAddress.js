/**
 * Send To Address / 发送到地址
 * POST /api/v1/asset/sendToAddress
 * 
 * Send assets to a specific address (with automatic wallet signature)
 * 将资产发送到指定地址（自动钱包签名）
 * 
 * Weight: 1
 * Security: USER_DATA
 * 
 * Note: This example shows how to generate the wallet signature programmatically
 * 注意：此示例展示如何以编程方式生成钱包签名
 */

const axios = require('axios');
const { ethers } = require('ethers');
const config = require('./config');
const { buildQueryString } = require('./utils');

/**
 * Generate wallet signature for transaction / 为交易生成钱包签名
 * @param {string} message - The message to sign / 要签名的消息
 * @param {string} privateKey - Wallet private key / 钱包私钥
 * @returns {Promise<string>} Signature / 签名
 */
async function generateWalletSignature(message, privateKey) {
    try {
        // Create wallet from private key / 从私钥创建钱包
        const wallet = new ethers.Wallet(privateKey);
        
        // Sign the message / 签名消息
        const signature = await wallet.signMessage(message);
        
        console.log('✓ Wallet signature generated / 钱包签名已生成');
        console.log(`  Signature / 签名: ${signature.substring(0, 20)}...${signature.substring(signature.length - 10)}\n`);
        
        return signature;
    } catch (error) {
        console.error('Failed to generate wallet signature / 钱包签名生成失败:', error.message);
        throw error;
    }
}

/**
 * Send to address (with automatic wallet signature) / 发送到地址（自动钱包签名）
 * @param {Object} transferParams - Transfer parameters / 转账参数
 * @param {string} privateKey - Wallet private key / 钱包私钥
 */
async function sendToAddress(transferParams = null, privateKey = config.PRIVATE_KEY) {
    try {
        console.log('=== Send To Address / 发送到地址 ===\n');
        
        // Use provided params or default params / 使用提供的参数或默认参数
        const params = transferParams || {
            asset: 'USDT',              // Asset / 资产 (required / 必需)
            address: '0x...',           // Destination address / 目标地址 (required / 必需)
            amount: '10',               // Amount / 数量 (required / 必需)
            // memo: 'Optional memo',   // Memo (optional) / 备注（可选）
        };
        
        console.log('Parameters / 参数:', params);
        console.log('');
        
        // Validate inputs / 验证输入
        if (!privateKey || privateKey === '0x...') {
            throw new Error('Please set PRIVATE_KEY in config.js / 请在config.js中设置PRIVATE_KEY');
        }
        if (!params.address || params.address === '0x...') {
            throw new Error('Please provide a valid destination address / 请提供有效的目标地址');
        }
        
        console.log('⚠️  WARNING / 警告: This will send real assets!');
        console.log('    Make sure the address is correct! / 确保地址正确！');
        console.log('');
        
        // Step 1: Build parameters with timestamp / 步骤1：构建带时间戳的参数
        console.log('Step 1 / 步骤1: Building request parameters / 构建请求参数');
        const timestamp = Date.now();
        const allParams = {
            ...params,
            recvWindow: config.RECV_WINDOW,
            timestamp: timestamp
        };
        
        // Create query string / 创建查询字符串
        const queryString = buildQueryString(allParams);
        console.log(`✓ Query string built / 查询字符串已构建\n`);
        
        // Step 2: Generate wallet signature / 步骤2：生成钱包签名
        console.log('Step 2 / 步骤2: Generating wallet signature / 生成钱包签名');
        const signature = await generateWalletSignature(queryString, privateKey);
        
        // Step 3: Send request / 步骤3：发送请求
        console.log('Step 3 / 步骤3: Sending transaction / 发送交易');
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/asset/sendToAddress?${queryString}`,
            {},
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'X-SIGNATURE': signature,
                    'Content-Type': 'application/x-www-form-urlencoded'
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
    console.log('  Send To Address with Auto Signature');
    console.log('  自动签名发送到地址');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚠️  Before running / 运行前:');
    console.log('  1. Set PRIVATE_KEY in config.js / 在config.js中设置私钥');
    console.log('  2. Set API_KEY in config.js / 在config.js中设置API密钥');
    console.log('  3. Update destination address / 更新目标地址');
    console.log('  4. Update asset and amount / 更新资产和数量');
    console.log('  5. Install ethers: npm install ethers / 安装ethers库\n');
    console.log('⚠️  THIS WILL SEND REAL ASSETS! / 这将发送真实资产！');
    console.log('  Uncomment the code below to execute / 取消下面代码的注释以执行\n');
    
    // Example parameters / 示例参数
    // const transferParams = {
    //     asset: 'USDT',
    //     address: '0xYourDestinationAddress',
    //     amount: '10',
    //     memo: 'Test transfer'  // Optional / 可选
    // };
    
    // sendToAddress(transferParams)
    //     .then(() => console.log('✓ Transfer completed / 转账完成'))
    //     .catch(() => console.log('✗ Transfer failed / 转账失败'));
}

module.exports = { sendToAddress, generateWalletSignature };
