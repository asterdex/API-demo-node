/**
 * Exchange Information / 交易所信息
 * GET /fapi/v1/exchangeInfo
 * 
 * Current exchange trading rules and symbol information
 * 当前交易所交易规则和交易对信息
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const config = require('./config');

async function getExchangeInfo() {
    try {
        console.log('Getting exchange information... / 获取交易所信息中...\n');
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v1/exchangeInfo`);
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    getExchangeInfo()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getExchangeInfo;

