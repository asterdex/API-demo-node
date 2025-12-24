/**
 * API Configuration Template / API配置模板
 * 
 * ⚠️ IMPORTANT / 重要提示:
 * 1. Copy this file to config.js / 复制此文件为 config.js
 * 2. Fill in your actual credentials / 填写您的实际凭证
 * 3. NEVER commit config.js to version control / 永远不要提交 config.js 到版本控制
 * 
 * Usage / 使用方法:
 * $ cp config.example.js config.js
 * $ nano config.js  # Edit and fill in your credentials / 编辑并填写您的凭证
 */

module.exports = {
    // Base URL / 基础URL
    BASE_URL: 'https://sapi.asterdex.com',
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // API Credentials / API凭证
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // API Key / API密钥
    // Get from: AsterDEX Dashboard → API Management → Create API Key
    // 获取方式：AsterDEX控制台 → API管理 → 创建API密钥
    API_KEY: 'your_api_key_here',
    
    // Secret Key / 密钥
    // ⚠️ Keep this secret! / 保密！
    // This is shown only once when creating API key
    // 创建API密钥时只显示一次
    SECRET_KEY: 'your_secret_key_here',
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Wallet Credentials (for wallet signature endpoints) / 钱包凭证（用于钱包签名接口）
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // Wallet Private Key / 钱包私钥
    // ⚠️ EXTREMELY SENSITIVE! / 极度敏感！
    // Format: 0x + 64 hex characters / 格式：0x + 64位十六进制
    // Example: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
    // 
    // How to export from MetaMask / 如何从MetaMask导出:
    // 1. Click account icon → Account details / 点击账户图标 → 账户详情
    // 2. Export Private Key / 导出私钥
    // 3. Enter password / 输入密码
    // 4. Copy private key / 复制私钥
    //
    // ⚠️ WARNING / 警告:
    // - NEVER share this with anyone! / 永远不要与任何人分享！
    // - NEVER commit to version control! / 永远不要提交到版本控制！
    // - Use test wallets for testing! / 测试时使用测试钱包！
    PRIVATE_KEY: '0x0000000000000000000000000000000000000000000000000000000000000000',
    
    // Wallet Address / 钱包地址
    // Format: 0x + 40 hex characters / 格式：0x + 40位十六进制
    // Example: 0x1234567890123456789012345678901234567890
    //
    // This is the public address corresponding to the private key above
    // 这是上面私钥对应的公开地址
    //
    // How to find / 如何查找:
    // - In MetaMask: Copy address from account / MetaMask中：从账户复制地址
    // - From private key: Use walletSignature.js getAddressFromPrivateKey()
    //   从私钥：使用 walletSignature.js 的 getAddressFromPrivateKey()
    WALLET_ADDRESS: '0x0000000000000000000000000000000000000000',
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Trading Configuration / 交易配置
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // Default trading pair / 默认交易对
    DEFAULT_SYMBOL: 'BNBUSDT',
    
    // Receive window (milliseconds) / 接收窗口（毫秒）
    // Time window for request to be valid / 请求有效的时间窗口
    // Recommended: 5000 (5 seconds) / 建议值：5000（5秒）
    RECV_WINDOW: 5000,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Configuration Validation / 配置验证
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// You can uncomment this to validate your configuration
// 可以取消注释以验证您的配置

/*
function validateConfig() {
    const config = module.exports;
    const issues = [];
    
    // Check if credentials are still default values / 检查凭证是否仍是默认值
    if (config.API_KEY === 'your_api_key_here') {
        issues.push('❌ API_KEY is not configured / API_KEY未配置');
    }
    
    if (config.SECRET_KEY === 'your_secret_key_here') {
        issues.push('❌ SECRET_KEY is not configured / SECRET_KEY未配置');
    }
    
    if (config.PRIVATE_KEY === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        issues.push('⚠️  PRIVATE_KEY is using default value / PRIVATE_KEY使用默认值');
    }
    
    if (config.WALLET_ADDRESS === '0x0000000000000000000000000000000000000000') {
        issues.push('⚠️  WALLET_ADDRESS is using default value / WALLET_ADDRESS使用默认值');
    }
    
    // Check format / 检查格式
    if (config.PRIVATE_KEY && !config.PRIVATE_KEY.match(/^0x[a-fA-F0-9]{64}$/)) {
        issues.push('❌ PRIVATE_KEY format invalid (should be 0x + 64 hex chars) / PRIVATE_KEY格式无效');
    }
    
    if (config.WALLET_ADDRESS && !config.WALLET_ADDRESS.match(/^0x[a-fA-F0-9]{40}$/)) {
        issues.push('❌ WALLET_ADDRESS format invalid (should be 0x + 40 hex chars) / WALLET_ADDRESS格式无效');
    }
    
    // Report issues / 报告问题
    if (issues.length > 0) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Configuration Issues / 配置问题:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        issues.forEach(issue => console.log(issue));
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return false;
    }
    
    console.log('✅ Configuration looks good! / 配置看起来不错！\n');
    return true;
}

// Validate on require / 引入时验证
validateConfig();
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Security Reminders / 安全提醒
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n⚠️  Security Reminder / 安全提醒:');
console.log('Make sure config.js is in .gitignore!');
console.log('确保 config.js 在 .gitignore 中！\n');

