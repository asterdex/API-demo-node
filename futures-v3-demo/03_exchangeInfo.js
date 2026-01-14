/**
 * Exchange Information / 交易所信息
 * GET /fapi/v3/exchangeInfo
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const params = {};

async function exchangeInfo() {
    try {
        console.log('Request / 请求:', 'GET /fapi/v3/exchangeInfo');
        console.log('Parameters / 参数:', params);
        
        const response = await axios.get(`${config.BASE_URL}/fapi/v3/exchangeInfo`, );
        
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

if (require.main === module) {
    exchangeInfo()
        .then(() => console.log('\n✓ Completed / 完成'))
        .catch(() => console.log('\n✗ Failed / 失败'));
}

module.exports = exchangeInfo;
