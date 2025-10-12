# Flarum Replay By AI - 安装指南

## 📋 系统要求

- PHP >= 8.1
- Flarum >= 1.2.0
- Composer
- Node.js >= 14.x
- npm 或 pnpm

## 🚀 安装步骤

### 方法一：从 GitHub 安装（推荐）

1. **克隆仓库到 Flarum 扩展目录**

```bash
cd /path/to/flarum
composer require wszdb/flarum-replaybyai
```

2. **启用扩展**

```bash
php flarum cache:clear
php flarum migrate
```

在管理后台启用 "Replay By AI" 扩展。

### 方法二：本地开发安装

1. **克隆仓库**

```bash
git clone https://github.com/wszdb/flarum-replaybyai.git
cd flarum-replaybyai
```

2. **安装 PHP 依赖**

```bash
composer install
```

3. **构建前端资源**

Linux/macOS:
```bash
chmod +x build.sh
./build.sh
```

Windows:
```bash
build.bat
```

或手动构建：
```bash
cd js
npm install
npm run build
```

4. **链接到 Flarum**

将插件目录链接或复制到 Flarum 的 `extensions` 目录：

```bash
ln -s /path/to/flarum-replaybyai /path/to/flarum/extensions/flarum-replaybyai
```

5. **启用扩展**

```bash
cd /path/to/flarum
php flarum cache:clear
php flarum migrate
```

## ⚙️ 配置

1. 登录 Flarum 管理后台
2. 进入 **扩展** → **Replay By AI**
3. 配置以下设置：

### API 密钥 (必填)
- 输入您的 OpenAI API 密钥
- 格式：`sk-xxxxxxxxxxxxxxxxxxxxxxxx`
- 获取地址：https://platform.openai.com/api-keys

### 基础 URL (可选)
- 默认：`https://api.openai.com/v1`
- 如使用其他兼容服务（如 Azure OpenAI），请修改此地址

### 模型名称 (必填)
- 推荐：`gpt-3.5-turbo`（快速且经济）
- 高级：`gpt-4`（更智能但较贵）
- 支持任何 OpenAI 兼容的模型

### 最大令牌数 (可选)
- 默认：200
- 控制 AI 回复的最大长度
- 范围：50-1000

### 系统提示词 (可选)
- 自定义 AI 的回复风格和行为
- 默认：生成有思想、友好的回复

## 🎯 使用方法

1. **查看帖子**：在任何讨论帖中浏览
2. **点击智赞按钮**：在想要回复的楼层下方点击 "智赞" 按钮
3. **等待生成**：AI 会分析帖子内容（前 200 字符）
4. **编辑回复**：AI 生成的内容会自动填入回复框，您可以编辑
5. **发送回复**：满意后点击 "回复" 按钮发送

### 特性说明

- ✅ **智能引用**：对非首楼回复自动添加 `@用户名#楼层号` 引用
- ✅ **内容截取**：长帖子自动截取前 200 字符分析
- ✅ **可编辑**：AI 生成的内容可以修改后再发送
- ✅ **权限控制**：只有登录用户可见，不能对自己的帖子使用

## 🔧 故障排除

### 智赞按钮不显示

1. 确认已登录
2. 检查是否在自己的帖子下（不会显示）
3. 清除浏览器缓存并刷新

### 生成回复失败

1. **检查 API 密钥**：确保密钥正确且有效
2. **检查网络连接**：确保服务器能访问 API 端点
3. **查看错误日志**：检查 `storage/logs/flarum.log`
4. **余额不足**：确认 API 账户有足够余额

### 回复框未自动填充

1. 刷新页面重试
2. 检查浏览器控制台是否有 JavaScript 错误
3. 确认使用的是最新版本的 Flarum

## 🛠️ 开发者信息

### 文件结构

```
flarum-replaybyai/
├── js/                          # 前端代码
│   ├── src/
│   │   ├── admin/              # 后台管理界面
│   │   ├── forum/              # 论坛前端
│   │   └── common/             # 公共代码
│   └── dist/                   # 编译后的文件
├── less/                        # 样式文件
├── locale/                      # 语言包
├── src/                         # 后端 PHP 代码
│   ├── Controller/             # 控制器
│   └── Api/                    # API 相关
├── composer.json               # PHP 依赖
├── extend.php                  # 扩展配置
└── README.md                   # 说明文档
```

### 本地开发

```bash
# 监听文件变化自动编译
cd js
npm run dev
```

### 构建生产版本

```bash
cd js
npm run build
```

## 📝 更新日志

### v1.0.0 (2025-01-XX)
- 🎉 首次发布
- ✨ 智赞按钮功能
- 🤖 AI 自动生成回复
- 🔧 后台配置界面
- 🌐 中英文语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 LICENSE.md

## 🔗 相关链接

- GitHub: https://github.com/wszdb/flarum-replaybyai
- Flarum 官网: https://flarum.org
- OpenAI API: https://platform.openai.com