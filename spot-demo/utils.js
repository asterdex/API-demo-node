/**
 * Utility Functions / 工具函数
 */

const crypto = require('crypto');

/**
 * Create HMAC SHA256 signature / 创建HMAC SHA256签名
 * @param {string} queryString - Query string to sign / 要签名的查询字符串
 * @param {string} secretKey - Secret key / 密钥
 * @returns {string} Signature / 签名
 */
function createSignature(queryString, secretKey) {
    return crypto
        .createHmac('sha256', secretKey)
        .update(queryString)
        .digest('hex');
}

/**
 * Build query string from parameters / 从参数构建查询字符串
 * @param {Object} params - Parameters object / 参数对象
 * @returns {string} Query string / 查询字符串
 */
function buildQueryString(params) {
    return Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');
}

/**
 * Add timestamp and signature to parameters / 为参数添加时间戳和签名
 * @param {Object} params - Parameters object / 参数对象
 * @param {string} secretKey - Secret key / 密钥
 * @param {number} recvWindow - Receive window / 接收窗口
 * @returns {Object} Parameters with signature / 带签名的参数
 */
function signParams(params, secretKey, recvWindow = 5000) {
    const timestamp = Date.now();
    const allParams = {
        ...params,
        recvWindow: recvWindow,
        timestamp: timestamp
    };
    
    const queryString = buildQueryString(allParams);
    const signature = createSignature(queryString, secretKey);
    
    return {
        ...allParams,
        signature: signature
    };
}

module.exports = {
    createSignature,
    buildQueryString,
    signParams
};

