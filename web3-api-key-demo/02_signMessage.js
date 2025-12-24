/**
 * Sign Message / 签名消息
 * 
 * Sign a message with wallet private key
 * 使用钱包私钥签名消息
 * 
 * Message format: "You are signing into Astherus {nonce}"
 * 消息格式："You are signing into Astherus {nonce}"
 * 
 * Security: Requires private key / 需要私钥
 */

const { ethers } = require('ethers');
const config = require('./config');
const getNonce = require('./01_getNonce');

/**
 * Sign message with private key / 使用私钥签名消息
 * @param {string} nonce - Nonce from step 1 / 第一步获取的随机数
 * @param {string} privateKey - Wallet private key / 钱包私钥
 * @returns {Promise<string>} Signature / 签名
 */
async function signMessage(nonce, privateKey = config.PRIVATE_KEY) {
    try {
        console.log('Signing message... / 签名消息中...\n');
        
        // Build message / 构建消息
        const message = `You are signing into Astherus ${nonce}`;
        console.log('Message to sign / 待签名消息:');
        console.log(message, '\n');
        
        // Create wallet from private key / 从私钥创建钱包
        const wallet = new ethers.Wallet(privateKey);
        console.log('Wallet Address / 钱包地址:', wallet.address, '\n');
        
        // Sign message / 签名消息
        const signature = await wallet.signMessage(message);
        
        // Output signature / 输出签名
        console.log('Signature / 签名:');
        console.log(signature);
        
        console.log('\n✓ Message signed successfully / 消息签名成功');
        return signature;
    } catch (error) {
        console.error('Error / 错误:', error.message);
        throw error;
    }
}

/**
 * Complete flow: get nonce and sign / 完整流程：获取随机数并签名
 * @param {string} type - Operation type (e.g., 'CREATE_API_KEY') / 操作类型
 * @returns {Promise<Object>} {nonce, signature}
 */
async function getNonceAndSign(type = 'CREATE_API_KEY') {
    try {
        // Step 1: Get nonce / 步骤1：获取随机数
        const nonce = await getNonce(config.WALLET_ADDRESS, type);
        
        console.log('\n' + '='.repeat(60) + '\n');
        
        // Step 2: Sign message / 步骤2：签名消息
        const signature = await signMessage(nonce);
        
        return { nonce, signature };
    } catch (error) {
        console.error('Error in flow / 流程错误:', error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    getNonceAndSign()
        .then(() => console.log('\n✓ Operation completed / 操作完成'))
        .catch(() => console.log('\n✗ Operation failed / 操作失败'));
}

module.exports = { signMessage, getNonceAndSign };

