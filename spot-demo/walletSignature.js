/**
 * Wallet Signature Utilities / 钱包签名工具
 * 
 * This module provides utilities for generating wallet signatures
 * 此模块提供生成钱包签名的工具函数
 */

const { ethers } = require('ethers');

/**
 * Generate wallet signature for a message / 为消息生成钱包签名
 * @param {string} message - The message to sign / 要签名的消息
 * @param {string} privateKey - Wallet private key (with 0x prefix) / 钱包私钥（带0x前缀）
 * @returns {Promise<string>} Signature / 签名
 */
async function signMessage(message, privateKey) {
    try {
        // Validate private key / 验证私钥
        if (!privateKey || privateKey === '0x...' || privateKey.length < 64) {
            throw new Error('Invalid private key / 无效的私钥');
        }
        
        // Ensure private key has 0x prefix / 确保私钥有0x前缀
        if (!privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
        }
        
        // Create wallet from private key / 从私钥创建钱包
        const wallet = new ethers.Wallet(privateKey);
        
        // Sign the message using Ethereum's personal_sign method (EIP-191)
        // 使用以太坊的personal_sign方法签名（EIP-191）
        const signature = await wallet.signMessage(message);
        
        return signature;
    } catch (error) {
        throw new Error(`Failed to sign message / 签名失败: ${error.message}`);
    }
}

/**
 * Verify a wallet signature / 验证钱包签名
 * @param {string} message - The original message / 原始消息
 * @param {string} signature - The signature to verify / 要验证的签名
 * @param {string} expectedAddress - Expected signer address / 期望的签名者地址
 * @returns {boolean} True if valid / 如果有效则返回true
 */
function verifySignature(message, signature, expectedAddress) {
    try {
        // Recover the address from signature / 从签名恢复地址
        const recoveredAddress = ethers.verifyMessage(message, signature);
        
        // Compare addresses (case-insensitive) / 比较地址（不区分大小写）
        return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch (error) {
        return false;
    }
}

/**
 * Get wallet address from private key / 从私钥获取钱包地址
 * @param {string} privateKey - Wallet private key / 钱包私钥
 * @returns {string} Wallet address / 钱包地址
 */
function getAddressFromPrivateKey(privateKey) {
    try {
        // Ensure private key has 0x prefix / 确保私钥有0x前缀
        if (!privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
        }
        
        const wallet = new ethers.Wallet(privateKey);
        return wallet.address;
    } catch (error) {
        throw new Error(`Failed to get address / 获取地址失败: ${error.message}`);
    }
}

/**
 * Sign typed data (EIP-712) / 签名类型化数据（EIP-712）
 * @param {Object} domain - Domain separator / 域分隔符
 * @param {Object} types - Type definitions / 类型定义
 * @param {Object} value - Value to sign / 要签名的值
 * @param {string} privateKey - Wallet private key / 钱包私钥
 * @returns {Promise<string>} Signature / 签名
 */
async function signTypedData(domain, types, value, privateKey) {
    try {
        // Ensure private key has 0x prefix / 确保私钥有0x前缀
        if (!privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
        }
        
        const wallet = new ethers.Wallet(privateKey);
        
        // Sign typed data / 签名类型化数据
        const signature = await wallet.signTypedData(domain, types, value);
        
        return signature;
    } catch (error) {
        throw new Error(`Failed to sign typed data / 签名类型化数据失败: ${error.message}`);
    }
}

/**
 * Example usage / 使用示例
 */
async function example() {
    const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const message = 'Hello, World!';
    
    // Sign message / 签名消息
    const signature = await signMessage(message, privateKey);
    console.log('Signature / 签名:', signature);
    
    // Get address / 获取地址
    const address = getAddressFromPrivateKey(privateKey);
    console.log('Address / 地址:', address);
    
    // Verify signature / 验证签名
    const isValid = verifySignature(message, signature, address);
    console.log('Valid / 有效:', isValid);
}

// Uncomment to run example / 取消注释运行示例
// if (require.main === module) {
//     example().catch(console.error);
// }

module.exports = {
    signMessage,
    verifySignature,
    getAddressFromPrivateKey,
    signTypedData
};

