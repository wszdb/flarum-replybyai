# Flarum Reply By AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Flarum](https://img.shields.io/badge/flarum-%5E1.2.0-orange.svg)

 🤖✨It leverages AI to generate reply content with one click in the reply dialog box of forum posts, enabling higher-quality casual discussions on your forum.​
This plugin supports the integration of any large models that comply with the OpenAI API protocol, including Alibaba Tongyi Qianfan, Volcano Ark, Baidu Qianfan, Tencent Models, OpenRouter, Silicon Flow, and more. It covers a wide range of large models such as DeepSeek, Qwen3, Kimi, GLM, ChatGPT, Gemini, Grok, etc.

🤖✨Flarum Ai回贴自动生成插件，使用AI，在论坛贴子回复对话框中，一键生成回复内容，让你的论坛灌水更高质量。插件支持任意OpenAi api协议大模型接入，包括阿里百炼、火山方舟、百度千帆、腾讯、Openrouter、硅基流动等，覆盖各类大模型，如DeepSeek、Qwen3、Kimi、GLM、ChatGPT、Gemini、Grok等。

<img width="762" height="854" alt="局部截取_20251012_205046" src="https://github.com/user-attachments/assets/8923712b-60e6-486c-9582-045f00ea4f23" />

<img width="936" height="824" alt="局部截取_20251012_205420" src="https://github.com/user-attachments/assets/56d0b39c-f146-4cb8-8400-e1a19c732c9b" />


## Features

- 🎯 **AI Reply Button**: Add customizable AI reply button to every post
- 🤖 **AI-Powered**: Generate contextual replies using OpenAI-compatible APIs
- 📝 **Auto-Fill**: Automatically populate the reply box with AI-generated content
- ✏️ **Editable**: Users can modify AI-generated replies before posting
- 🔗 **Quote Support**: Automatically adds quote references for non-first-floor replies
- ⚙️ **Flexible Configuration**: Support for any OpenAI API-compatible service
- 🎨 **Customizable**: Configure button text and content length in admin panel

## Installation

```bash
composer require wszdb/flarum-replybyai
```

## Configuration

1. Navigate to Admin Panel → Extensions → Reply By AI
2. Configure the following settings:
   - **API Key**: Your OpenAI API key or compatible service key
   - **Base URL**: API endpoint (default: `https://api.openai.com/v1`)
   - **Model Name**: Model to use (e.g., `gpt-3.5-turbo`, `gpt-4`)
   - **Max Tokens**: Maximum response length (default: 200)
   - **Content Max Length**: Maximum characters to analyze from post (default: 200)
   - **Button Text**: Custom button text (default: "AI回复")
   - **System Prompt**: Instructions for AI behavior

## Usage

1. Click the AI reply button below any post
2. AI analyzes the post content (configurable character limit)
3. Generated reply appears in the reply box
4. Edit if needed, then click "Reply" to post

## Requirements

- PHP ^8.1
- Flarum ^1.2.0
- OpenAI-compatible API service

## License

MIT License. See LICENSE.md for details.

## Links

- [GitHub Repository](https://github.com/wszdb/flarum-replybyai)
- [Report Issues](https://github.com/wszdb/flarum-replybyai/issues)
- This plugin is fully automatically developed using [AiPy](https://www.aipyaipy.com). Invitation Code: XOFS.
- 本插件使用[AiPy](https://www.aipyaipy.com)全自动开发完成，邀请码：XOFS.

## Credits


Developed by [wszdb](https://github.com/wszdb)
