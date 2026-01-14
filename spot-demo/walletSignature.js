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
 * Generate withdraw user signature (EIP-712) / 生成提现用户签名（EIP-712）
 * 
 * This signature is required by the /api/v1/aster/user-withdraw endpoint
 * 此签名是 /api/v1/aster/user-withdraw 接口所必需的
 * 
 * @param {Object} withdrawParams - Withdraw parameters / 提现参数
 * @param {string} withdrawParams.chainId - Chain ID (1=ETH, 56=BSC, 42161=Arbi)
 * @param {string} withdrawParams.asset - Asset symbol (e.g., 'USDT')
 * @param {string} withdrawParams.amount - Withdraw amount
 * @param {string} withdrawParams.fee - Fee amount
 * @param {string} withdrawParams.receiver - Receiver address
 * @param {string} privateKey - User's wallet private key / 用户钱包私钥
 * @param {string} asterChain - 'Mainnet' or 'Testnet' / 'Mainnet' 或 'Testnet'
 * @returns {Promise<Object>} { nonce, userSignature }
 */
async function generateWithdrawSignature(withdrawParams, privateKey, asterChain = 'Mainnet') {
    try {
        const { chainId, asset, amount, fee, receiver } = withdrawParams;
        
        // Validate parameters / 验证参数
        if (!chainId || !asset || !amount || !fee || !receiver) {
            throw new Error('Missing required withdraw parameters / 缺少必需的提现参数');
        }
        
        // Map chainId to chain name / 映射 chainId 到链名称
        const chainMap = {
            '1': 'ETH',
            '56': 'BSC',
            '42161': 'Arbitrum'
        };
        
        const destinationChain = chainMap[chainId];
        if (!destinationChain) {
            throw new Error(`Unsupported chainId: ${chainId}. Supported: 1(ETH), 56(BSC), 42161(Arbi)`);
        }
        
        // Generate nonce (microseconds) / 生成 nonce（微秒）
        const nonce = Date.now() * 1000;
        
        // EIP-712 Domain / EIP-712 域
        const domain = {
            name: 'Aster',
            version: '1',
            chainId: parseInt(chainId),
            verifyingContract: ethers.ZeroAddress,
        };
        
        // EIP-712 Types / EIP-712 类型
        const types = {
            Action: [
                { name: "type", type: "string" },
                { name: "destination", type: "address" },
                { name: "destination Chain", type: "string" },
                { name: "token", type: "string" },
                { name: "amount", type: "string" },
                { name: "fee", type: "string" },
                { name: "nonce", type: "uint256" },
                { name: "aster chain", type: "string" },
            ],
        };
        
        // EIP-712 Value / EIP-712 值
        const value = {
            'type': 'Withdraw',
            'destination': receiver,
            'destination Chain': destinationChain,
            'token': asset,
            'amount': amount,
            'fee': fee,
            'nonce': nonce,
            'aster chain': asterChain,
        };
        
        console.log('\n📝 Generating withdraw signature / 生成提现签名...');
        console.log('Domain:', JSON.stringify(domain, null, 2));
        console.log('Value:', JSON.stringify(value, null, 2));
        
        // Sign typed data / 签名类型化数据
        const userSignature = await signTypedData(domain, types, value, privateKey);
        
        console.log('✓ Signature generated / 签名已生成');
        console.log('Nonce:', nonce);
        console.log('Signature:', userSignature);
        
        return {
            nonce: nonce.toString(),
            userSignature
        };
    } catch (error) {
        throw new Error(`Failed to generate withdraw signature / 生成提现签名失败: ${error.message}`);
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
    
    // Generate withdraw signature example / 生成提现签名示例
    const withdrawParams = {
        chainId: '56',
        asset: 'USDT',
        amount: '10.123400',
        fee: '1.234567891',
        receiver: address
    };
    const { nonce, userSignature } = await generateWithdrawSignature(withdrawParams, privateKey);
    console.log('\nWithdraw Signature / 提现签名:');
    console.log('Nonce:', nonce);
    console.log('Signature:', userSignature);
}

// Uncomment to run example / 取消注释运行示例
// if (require.main === module) {
//     example().catch(console.error);
// }

module.exports = {
    signMessage,
    verifySignature,
    getAddressFromPrivateKey,
    signTypedData,
    generateWithdrawSignature
};

