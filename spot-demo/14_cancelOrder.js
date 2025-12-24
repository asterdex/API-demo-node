/**
 * Cancel Order / 撤销订单
 * DELETE /api/v1/order
 * 
 * Cancel an active order
 * 撤销一个活跃订单
 * 
 * Weight: 1
 * Security: TRADE
 */

const axios = require('axios');
const config = require('./config');
const { signParams, buildQueryString } = require('./utils');

/**
 * Parameters / 参数
 * Either orderId or origClientOrderId must be sent
 * 必须发送orderId或origClientOrderId其中之一
 */
const params = {
    symbol: 'BNBUSDT',          // Trading pair / 交易对 (required / 必需)
    orderId: '123456',          // Order ID / 订单ID (optional / 可选)
    // origClientOrderId: 'my_order_123',  // Original client order ID / 原始客户订单ID (optional / 可选)
};

/**
 * Cancel an order / 撤销订单
 */
async function cancelOrder() {
    try {
        console.log('Canceling order... / 撤销订单中...\n');
        console.log('Parameters / 参数:', params);
        console.log('');
        
        // Sign the parameters / 签名参数
        const signedParams = signParams(params, config.SECRET_KEY, config.RECV_WINDOW);
        const queryString = buildQueryString(signedParams);
        
        const response = await axios.delete(
            `${config.BASE_URL}/api/v1/order?${queryString}`,
            {
                headers: {
                    'X-MBX-APIKEY': config.API_KEY
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
    cancelOrder()
        .then(() => console.log('\n✓ Request completed / 请求完成'))
        .catch(() => console.log('\n✗ Request failed / 请求失败'));
}

module.exports = cancelOrder;
