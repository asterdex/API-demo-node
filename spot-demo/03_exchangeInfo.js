/**
 * Exchange Information / 交易规则信息
 * GET /api/v1/exchangeInfo
 * 
 * Get trading rules and symbol information
 * 获取交易规则和交易对信息
 * 
 * Weight: 1
 * Security: NONE
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Get exchange information / 获取交易所信息
 */
async function getExchangeInfo() {
    try {
        console.log('Getting exchange information... / 获取交易所信息中...\n');
        
        const response = await axios.get(`${config.BASE_URL}/api/v1/exchangeInfo`);
        
        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        // Save response to JSON file / 保存响应到JSON文件
        const outputFile = path.join(__dirname, 'exchangeInfo-response.json');
        fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2), 'utf8');
        console.log(`\n✓ Response saved to / 响应已保存到: ${outputFile}`);
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Execute / 执行
if (require.main === module) {
    getExchangeInfo()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = getExchangeInfo;

