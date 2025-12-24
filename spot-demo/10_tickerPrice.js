/**
 * Symbol Price Ticker / 最新价格
 * GET /api/v1/ticker/price
 * 
 * Get latest price for a symbol or symbols
 * 获取交易对的最新价格
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
 * Get ticker price / 获取最新价格
 */
async function getTickerPrice() {
    try {
        console.log('Getting ticker price... / 获取最新价格中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/ticker/price`, { params });
        
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
    getTickerPrice()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getTickerPrice;
