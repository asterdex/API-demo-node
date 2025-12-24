/**
 * Perpetual-Spot Transfer / 永续-现货划转
 * POST /api/v1/asset/wallet/transfer
 * 
 * Transfer between perpetual and spot wallets
 * 在永续和现货钱包之间划转
 * 
 * Weight: 1
 * Security: USER_DATA
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 */
const params = {
    asset: 'USDT',              // Asset / 资产 (required / 必需)
    amount: '100',              // Amount / 数量 (required / 必需)
    type: 1,                    // Transfer type / 划转类型 (required / 必需)
                                // 1: Spot -> Perpetual (现货 -> 永续)
                                // 2: Perpetual -> Spot (永续 -> 现货)
};

/**
 * Transfer between perpetual and spot / 永续-现货划转
 */
async function perpSpotTransfer() {
    try {
        console.log('Executing perpetual-spot transfer... / 执行永续-现货划转中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        const typeMap = {
            1: 'Spot -> Perpetual (现货 -> 永续)',
            2: 'Perpetual -> Spot (永续 -> 现货)'
        };
        console.log(`Transfer Type / 划转类型: ${typeMap[params.type]}`);
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.post(
            `${config.BASE_URL}/api/v1/asset/wallet/transfer?${queryString}`,
            {},
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

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
    perpSpotTransfer()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = perpSpotTransfer;
