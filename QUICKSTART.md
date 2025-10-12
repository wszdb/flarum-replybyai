# 🚀 快速开始指南

## 5分钟快速部署

### 步骤 1️⃣：获取插件

```bash
# 方式一：从 Composer 安装（推荐）
composer require wszdb/flarum-replaybyai

# 方式二：从 GitHub 克隆
git clone https://github.com/wszdb/flarum-replaybyai.git
```

### 步骤 2️⃣：构建前端资源

```bash
cd flarum-replaybyai/js
npm install
npm run build
```

或使用快捷脚本：
- Windows: 双击 `build.bat`
- Linux/Mac: 运行 `./build.sh`

### 步骤 3️⃣：启用扩展

```bash
cd /path/to/flarum
php flarum cache:clear
php flarum migrate
```

在管理后台 → 扩展 → 启用 "Replay By AI"

### 步骤 4️⃣：配置 API

进入管理后台 → Replay By AI 设置：

| 配置项 | 示例值 | 说明 |
|--------|--------|------|
| API Key | `sk-abc123...` | 必填，OpenAI API 密钥 |
| Base URL | `https://api.openai.com/v1` | 可选，默认 OpenAI |
| Model | `gpt-3.5-turbo` | 必填，模型名称 |
| Max Tokens | `200` | 可选，回复长度 |
| System Prompt | 自定义 | 可选，AI 行为指导 |

### 步骤 5️⃣：开始使用

1. 浏览任意讨论帖
2. 在帖子下方找到 **智赞** 按钮
3. 点击后等待 AI 生成回复
4. 编辑生成的内容（可选）
5. 点击发送！

## 🎯 功能演示

### 智赞按钮位置
```
[帖子内容]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👍 赞  💬 回复  🤖 智赞  ⋯ 更多
```

### 自动引用示例

**首楼回复：**
```
AI 生成的回复内容...
```

**非首楼回复：**
```
@用户名#2 

AI 生成的回复内容...
```

## ⚡ 常见问题

**Q: 智赞按钮不显示？**
- 确保已登录
- 不能对自己的帖子使用
- 清除浏览器缓存

**Q: 提示 API Key 错误？**
- 检查密钥是否正确
- 确认账户有余额
- 验证网络连接

**Q: 回复生成失败？**
- 查看 `storage/logs/flarum.log`
- 检查 API 配置
- 确认模型名称正确

## 🔧 高级配置

### 自定义系统提示词

```
你是一个友好的社区助手。请根据帖子内容生成有价值的回复。
回复要求：
1. 简洁明了，不超过 3 段
2. 语气友好、专业
3. 提供建设性意见
4. 避免重复帖子内容
```

### 使用其他 API 服务

**Azure OpenAI：**
```
Base URL: https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT
Model: gpt-35-turbo
```

**其他兼容服务：**
只需修改 Base URL 和 Model 即可

## 📞 获取帮助

- 📖 [完整文档](./INSTALLATION.md)
- 🐛 [报告问题](https://github.com/wszdb/flarum-replaybyai/issues)
- 💬 [讨论区](https://github.com/wszdb/flarum-replaybyai/discussions)

## 🎉 完成！

现在您的 Flarum 论坛已经拥有 AI 智能回复功能了！

祝使用愉快！ 🚀