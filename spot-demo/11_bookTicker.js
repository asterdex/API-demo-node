/**
 * Symbol Order Book Ticker / 最优挂单
 * GET /api/v1/ticker/bookTicker
 * 
 * Get best price/qty on the order book for a symbol or symbols
 * 获取交易对的最优挂单价格
 * 
 * Weight: 1 for single symbol, 2 for all symbols
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

/**
 * Parameters / 参数
 */
const params = {
    symbol: 'BNBUSDT',     // Trading pair / 交易对 (optional, omit for all symbols / 可选，省略则获取所有交易对)
};

/**
 * Get book ticker / 获取最优挂单
 */
async function getBookTicker() {
    try {
        console.log('Getting book ticker... / 获取最优挂单中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/ticker/bookTicker`, { params });
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    getBookTicker()
        .then(() => console.log('✓ Request completed / 请求完成'))
        .catch(() => console.log('✗ Request failed / 请求失败'));
}

module.exports = getBookTicker;
