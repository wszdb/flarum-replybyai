# Flarum Reply By AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Flarum](https://img.shields.io/badge/flarum-%5E1.2.0-orange.svg)

AI-powered smart reply button for Flarum. Generate intelligent replies with one click! 🤖✨

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

## Credits

Developed by [wszdb](https://github.com/wszdb)