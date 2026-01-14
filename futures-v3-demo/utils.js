/**
 * Futures V3 Utility Functions with EIP-712 Signature / 期货V3工具函数（EIP-712签名）
 * 
 * Futures V3 API uses EIP-712 typed data signature authentication
 * 期货V3 API使用EIP-712类型化数据签名认证
 */

const { ethers } = require('ethers');
const config = require('./config');

/**
 * Generate EIP-712 signature for Futures V3 API / 为期货V3 API生成EIP-712签名
 * 
 * @param {Object} params - API parameters / API参数
 * @param {string} userAddress - Main account wallet address / 主账户钱包地址
 * @param {string} signerAddress - API wallet address / API钱包地址
 * @param {string} privateKey - API wallet private key / API钱包私钥
 * @param {number} recvWindow - Receive window in milliseconds / 接收窗口（毫秒）
 * @param {Object} eip712Domain - Optional: EIP-712 domain override (defaults to config.EIP712_DOMAIN) / 可选：覆盖EIP-712域配置（默认使用config.EIP712_DOMAIN）
 * @returns {Object} - Signed parameters / 签名后的参数
 */
async function signParamsWeb3(params, userAddress, signerAddress, privateKey, recvWindow = 5000, eip712Domain = null) {
    try {
        // Step 1: Generate nonce (microseconds with random) / 生成nonce（微秒 + 随机数）
        const timestamp = Date.now();
        const nonce = Math.floor(timestamp * 1000) + Math.floor(Math.random() * 1000000);
        
        // Step 2: Build parameters object / 构建参数对象
        const allParams = {
            ...params
        };
        
        // Convert all values to strings / 将所有值转为字符串
        for (const key in allParams) {
            if (allParams[key] !== null && allParams[key] !== undefined) {
                allParams[key] = String(allParams[key]);
            } else {
                delete allParams[key];
            }
        }
        
        // Add authentication parameters / 添加认证参数
        allParams.nonce = String(nonce);
        allParams.user = userAddress;
        allParams.signer = signerAddress;
        
        // Step 3: Build query string (key=value&key=value format) / 构建查询字符串
        const queryString = buildQueryString(allParams);
        
        console.log('Step 1 - Query String / 查询字符串:', queryString);
        
        // Step 4: Setup EIP-712 domain (use config or parameter) / 设置EIP-712域（使用配置或参数）
        const domain = eip712Domain || config.EIP712_DOMAIN;
        
        // Step 5: Define EIP-712 types / 定义EIP-712类型
        const types = {
            Message: [
                { name: 'msg', type: 'string' }
            ]
        };
        
        // Step 6: Define message value / 定义消息值
        const value = {
            msg: queryString
        };
        
        console.log('Step 2 - EIP-712 Domain / EIP-712域:', JSON.stringify(domain));
        
        // Step 7: Sign with EIP-712 / 使用EIP-712签名
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet.signTypedData(domain, types, value);
        
        console.log('Step 3 - EIP-712 Signature / EIP-712签名:', signature);
        console.log('');
        
        // Step 8: Return all parameters with signature / 返回包含签名的所有参数
        return {
            ...allParams,
            signature: signature
        };
        
    } catch (error) {
        console.error('Error generating EIP-712 signature / 生成EIP-712签名错误:', error.message);
        throw error;
    }
}

/**
 * Build query string from parameters / 从参数构建查询字符串
 */
function buildQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== null)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
}

module.exports = {
    signParamsWeb3,
    buildQueryString
};
