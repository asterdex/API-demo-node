/**
 * Futures V3 Utility Functions with Web3 Signature / 期货V3工具函数（Web3签名）
 * 
 * Futures V3 API uses Web3 ECDSA signature authentication
 * 期货V3 API使用Web3 ECDSA签名认证
 */

const { ethers } = require('ethers');

/**
 * Trim dictionary - convert all values to strings / 转换字典 - 将所有值转为字符串
 */
function trimDict(obj) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        
        if (value === null || value === undefined) {
            continue; // Skip null/undefined values
        }
        
        if (Array.isArray(value)) {
            const newArray = value.map(item => {
                if (typeof item === 'object' && item !== null) {
                    return JSON.stringify(trimDict(item));
                }
                return String(item);
            });
            result[key] = JSON.stringify(newArray);
        } else if (typeof value === 'object') {
            result[key] = JSON.stringify(trimDict(value));
        } else {
            result[key] = String(value);
        }
    }
    return result;
}

/**
 * Generate Web3 signature for Futures V3 API / 为期货V3 API生成Web3签名
 * 
 * @param {Object} params - API parameters / API参数
 * @param {string} userAddress - Main account wallet address / 主账户钱包地址
 * @param {string} signerAddress - API wallet address / API钱包地址
 * @param {string} privateKey - API wallet private key / API钱包私钥
 * @param {number} recvWindow - Receive window in milliseconds / 接收窗口（毫秒）
 * @returns {Object} - Signed parameters / 签名后的参数
 */
async function signParamsWeb3(params, userAddress, signerAddress, privateKey, recvWindow = 5000) {
    try {
        // Step 1: Add timestamp and recvWindow / 添加时间戳和接收窗口
        const timestamp = Date.now();
        const nonce = Math.floor(Date.now() * 1000); // microseconds / 微秒
        
        const allParams = {
            ...params,
            recvWindow: String(recvWindow),
            timestamp: String(timestamp)
        };
        
        // Step 2: Convert all values to strings and remove null/undefined / 转换所有值为字符串并移除空值
        const trimmedParams = trimDict(allParams);
        
        // Step 3: Sort by keys and generate JSON string / 按键排序并生成JSON字符串
        const sortedKeys = Object.keys(trimmedParams).sort();
        const sortedObj = {};
        sortedKeys.forEach(key => {
            sortedObj[key] = trimmedParams[key];
        });
        
        const jsonStr = JSON.stringify(sortedObj).replace(/\s/g, '');
        
        console.log('Step 1 - JSON String / JSON字符串:', jsonStr);
        
        // Step 4: ABI encode [string, address, address, uint256] / ABI编码
        const abiCoder = ethers.AbiCoder.defaultAbiCoder();
        const encoded = abiCoder.encode(
            ['string', 'address', 'address', 'uint256'],
            [jsonStr, userAddress, signerAddress, nonce]
        );
        
        console.log('Step 2 - ABI Encoded / ABI编码:', encoded.substring(0, 100) + '...');
        
        // Step 5: Keccak256 hash / Keccak256哈希
        const hashHex = ethers.keccak256(encoded);
        
        console.log('Step 3 - Keccak Hash / Keccak哈希:', hashHex);
        
        // Step 6: Sign with private key using EIP-191 (Personal Sign) / 使用私钥签名（EIP-191个人签名）
        // This is equivalent to Python's encode_defunct + sign_message
        // 这相当于Python的encode_defunct + sign_message
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet.signMessage(ethers.getBytes(hashHex));
        
        console.log('Step 4 - Signature / 签名:', signature);
        console.log('');
        
        // Step 7: Return all parameters with signature / 返回包含签名的所有参数
        return {
            ...trimmedParams,
            nonce: String(nonce),
            user: userAddress,
            signer: signerAddress,
            signature: signature
        };
        
    } catch (error) {
        console.error('Error generating Web3 signature / 生成Web3签名错误:', error.message);
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
    buildQueryString,
    trimDict
};
