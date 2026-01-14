/**
 * Account Information V4 / 账户信息V4
 * GET /fapi/v4/account
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const params = {};

async function accountV4() {
    try {
        console.log('Request / 请求:', 'GET /fapi/v4/account');
        console.log('Parameters / 参数:', params);
        
        // Sign the parameters / 签名参数
        const { signParams, buildQueryString } = require('./utils');
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const fullUrl = `${config.BASE_URL}/fapi/v4/account`;
        const response = await axios.get(`${fullUrl}?${queryString}`, {
            headers: {
                'X-MBX-APIKEY': config.API_KEY
            }
        });

        // Output raw response data / 输出原始响应数据
        console.log(JSON.stringify(response.data, null, 2));
        
        // Save response to JSON file / 保存响应到JSON文件
        const outputFile = path.join(__dirname, 'accountV4-response.json');
        fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2), 'utf8');
        console.log(`\n✓ Response saved to / 响应已保存到: ${outputFile}`);
        
        // Output request details / 输出请求详情
        console.log('\n--- Request Details / 请求详情 ---');
        console.log('Full URL / 完整URL:', fullUrl);
        console.log('Query String / 查询字符串:', queryString);
        
        return response.data;
    } catch (error) {
        console.error('Error / 错误:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    accountV4()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = accountV4;

