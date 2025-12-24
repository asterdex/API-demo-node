# 🔐 安全须知 / Security Notice

## ⚠️ 极其重要 / CRITICAL IMPORTANCE

本项目包含需要私钥和API凭证的示例代码。请务必遵守以下安全规则：  
This project contains example code requiring private keys and API credentials. Please follow these security rules:

## 🚨 绝对不要做的事 / NEVER DO THIS

### ❌ 1. 不要提交敏感信息到版本控制 / Don't Commit Sensitive Info to Version Control

```bash
# ❌ 错误示例 / WRONG
git add config.js        # Contains API keys / 包含API密钥
git commit -m "Add config"
git push
```

**后果 / Consequences:**
- API密钥和私钥将被公开 / API keys and private keys will be public
- 资产可能被盗 / Assets may be stolen
- 账户可能被滥用 / Account may be abused

### ❌ 2. 不要在代码中硬编码私钥 / Don't Hardcode Private Keys

```javascript
// ❌ 错误示例 / WRONG
const PRIVATE_KEY = '0x1234567890abcdef...'; // Hardcoded
```

### ❌ 3. 不要分享配置文件 / Don't Share Config Files

```bash
# ❌ 错误 / WRONG
# Sending config.js via email, chat, or any channel
# 通过邮件、聊天或任何渠道发送config.js
```

### ❌ 4. 不要使用生产密钥进行测试 / Don't Use Production Keys for Testing

```javascript
// ❌ 错误 / WRONG
// Using production API keys in development/testing
// 在开发/测试中使用生产API密钥
```

## ✅ 必须做的事 / MUST DO THIS

### ✅ 1. 使用 .gitignore

确保以下文件被忽略：  
Ensure these files are ignored:

```gitignore
# 已配置在项目根目录的 .gitignore 中
# Already configured in .gitignore at project root

**/config.js           # ← 包含API密钥和私钥 / Contains keys
**/.env               # ← 环境变量 / Environment variables
**/node_modules/      # ← Node模块 / Node modules
```

### ✅ 2. 验证 .gitignore 生效

```bash
# 检查哪些文件会被提交 / Check which files will be committed
git status

# 验证 config.js 不在列表中 / Verify config.js is not in the list
# 如果看到 config.js，立即停止！ / If you see config.js, STOP immediately!
```

### ✅ 3. 使用环境变量（生产环境）/ Use Environment Variables (Production)

创建 `.env` 文件（已添加到 .gitignore）：  
Create `.env` file (already in .gitignore):

```env
PRIVATE_KEY=0x...
WALLET_ADDRESS=0x...
API_KEY=...
SECRET_KEY=...
```

在代码中使用：  
Use in code:

```javascript
require('dotenv').config();

const config = {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    WALLET_ADDRESS: process.env.WALLET_ADDRESS,
    API_KEY: process.env.API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
};
```

### ✅ 4. 定期轮换密钥 / Regularly Rotate Keys

```bash
# 每 30-90 天更换一次 API 密钥和私钥
# Change API keys and private keys every 30-90 days

# 如果怀疑泄露，立即更换
# If suspected leak, change immediately
```

### ✅ 5. 限制权限和余额 / Limit Permissions and Balance

- 只授予必要的API权限 / Grant only necessary API permissions
- 测试钱包只存放少量资金 / Keep minimal funds in test wallets
- 生产钱包使用多重签名 / Use multi-sig for production wallets

## 🔍 如何检查是否已泄露 / How to Check for Leaks

### 检查 Git 历史 / Check Git History

```bash
# 搜索历史记录中的敏感信息 / Search for sensitive info in history
git log --all --full-history --source --pretty=format:'' --name-only | sort -u | grep -i config

# 搜索私钥模式 / Search for private key patterns
git log -p | grep -i "private.*key\|0x[a-f0-9]{64}"

# 如果发现泄露，需要： / If leak found, need to:
# 1. 立即更换所有密钥 / Change all keys immediately
# 2. 清理 Git 历史 / Clean Git history (复杂，请谨慎)
```

### 检查公开仓库 / Check Public Repositories

```bash
# 如果不小心推送到公开仓库 / If accidentally pushed to public repo:
# 1. 立即将仓库设为私有 / Make repo private immediately
# 2. 更换所有泄露的密钥 / Change all leaked keys
# 3. 监控账户活动 / Monitor account activity
# 4. 考虑删除仓库并重建 / Consider deleting and rebuilding repo
```

## 🛡️ 最佳实践 / Best Practices

### 开发环境 / Development Environment

1. **使用测试网络** / **Use Testnets**
   - Goerli, Sepolia（以太坊测试网）/ Ethereum testnets
   - 使用测试代币 / Use test tokens
   - 测试钱包专用 / Dedicated test wallets

2. **创建配置模板** / **Create Config Template**
   
   `config.example.js`:
   ```javascript
   module.exports = {
       BASE_URL: 'https://sapi.asterdex.com',
       API_KEY: 'your_api_key_here',          // ← 占位符 / Placeholder
       SECRET_KEY: 'your_secret_key_here',    // ← 占位符 / Placeholder
       PRIVATE_KEY: '0x...',                  // ← 占位符 / Placeholder
       WALLET_ADDRESS: '0x...',               // ← 占位符 / Placeholder
   };
   ```

3. **文档说明** / **Documentation**
   - 在 README 中说明如何配置 / Explain config in README
   - 不要在文档中包含真实密钥 / Don't include real keys in docs
   - 使用明显的占位符 / Use obvious placeholders

### 生产环境 / Production Environment

1. **密钥管理系统** / **Key Management System**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - Google Cloud Secret Manager

2. **最小权限原则** / **Principle of Least Privilege**
   ```javascript
   // 为不同功能使用不同的 API 密钥
   // Use different API keys for different functions
   const READ_ONLY_KEY = process.env.READ_API_KEY;
   const TRADE_KEY = process.env.TRADE_API_KEY;
   ```

3. **监控和告警** / **Monitoring and Alerts**
   - 异常活动检测 / Abnormal activity detection
   - API 调用频率监控 / API call frequency monitoring
   - 余额变动告警 / Balance change alerts

## 🚨 应急响应 / Emergency Response

### 如果私钥泄露 / If Private Key Leaked

```bash
# 1. 立即行动 / IMMEDIATE ACTION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 停止使用该钱包 / Stop using that wallet
# 将所有资产转移到新钱包 / Transfer all assets to new wallet

# 2. 撤销访问 / REVOKE ACCESS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 删除所有关联的 API 密钥 / Delete all associated API keys
# 更改所有相关密码 / Change all related passwords

# 3. 审计 / AUDIT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 检查交易历史 / Check transaction history
# 查找未授权活动 / Look for unauthorized activity
# 记录所有异常 / Document all anomalies

# 4. 预防 / PREVENTION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 更新安全措施 / Update security measures
# 实施更严格的控制 / Implement stricter controls
# 培训团队成员 / Train team members
```

### 如果 API 密钥泄露 / If API Key Leaked

```bash
# 1. 通过 API 或控制面板撤销密钥
# Revoke key via API or dashboard

# 2. 生成新的 API 密钥
# Generate new API key

# 3. 更新所有应用中的配置
# Update config in all applications

# 4. 监控账户活动 24-48 小时
# Monitor account activity for 24-48 hours
```

## 📋 安全检查清单 / Security Checklist

开始开发前，确认以下各项：  
Before starting development, confirm:

- [ ] ✅ `.gitignore` 文件已创建并包含 `config.js` / `.gitignore` created with `config.js`
- [ ] ✅ 已使用 `config.example.js` 作为模板 / Using `config.example.js` as template
- [ ] ✅ 真实的 `config.js` 不在版本控制中 / Real `config.js` not in version control
- [ ] ✅ 使用测试网络和测试密钥 / Using testnets and test keys
- [ ] ✅ 测试钱包余额有限 / Test wallet has limited balance
- [ ] ✅ 已阅读所有安全文档 / Read all security documentation
- [ ] ✅ 团队成员了解安全规则 / Team members understand security rules

提交代码前，再次确认：  
Before committing code, confirm again:

- [ ] ✅ 运行 `git status` 检查待提交文件 / Run `git status` to check files
- [ ] ✅ `config.js` 不在待提交列表中 / `config.js` not in commit list
- [ ] ✅ 没有硬编码的密钥 / No hardcoded keys
- [ ] ✅ 所有敏感信息使用占位符 / All sensitive info uses placeholders

## 📞 获取帮助 / Get Help

如果您：  
If you:

- 怀疑密钥已泄露 / Suspect key leak
- 发现可疑活动 / Notice suspicious activity
- 需要安全建议 / Need security advice

请：  
Please:

1. 立即停止所有操作 / Stop all operations immediately
2. 参考应急响应流程 / Follow emergency response procedures
3. 联系技术支持 / Contact technical support
4. 记录所有细节 / Document all details

## 🔗 相关资源 / Related Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Ethereum Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

---

**记住 / Remember:**  
安全是所有人的责任。保护好您的密钥，就是保护您的资产。  
Security is everyone's responsibility. Protecting your keys means protecting your assets.


