# 🛠️ 开发者指南

## 开发环境设置

### 必需工具

- PHP >= 8.1
- Composer
- Node.js >= 14.x
- npm 或 pnpm
- Git

### 推荐工具

- VSCode + PHP Intelephense
- VSCode + ESLint + Prettier
- Postman (API 测试)

## 本地开发

### 1. 克隆项目

```bash
git clone https://github.com/wszdb/flarum-replaybyai.git
cd flarum-replaybyai
```

### 2. 安装依赖

```bash
# PHP 依赖
composer install

# JavaScript 依赖
cd js
npm install
```

### 3. 开发模式

```bash
# 监听文件变化自动编译
cd js
npm run dev
```

### 4. 链接到 Flarum

```bash
# 创建符号链接
ln -s /path/to/flarum-replaybyai /path/to/flarum/extensions/flarum-replaybyai

# 或在 composer.json 中添加本地仓库
{
  "repositories": [
    {
      "type": "path",
      "url": "/path/to/flarum-replaybyai"
    }
  ]
}
```

## 代码结构详解

### 后端 API 控制器

**位置**: `src/Controller/GenerateReplyController.php`

```php
<?php
namespace Wszdb\FlarumReplayByAi\Controller;

class GenerateReplyController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        // 1. 验证用户权限
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        
        // 2. 获取请求参数
        $data = $request->getParsedBody();
        $postId = $data['postId'];
        
        // 3. 获取帖子内容
        $post = Post::findOrFail($postId);
        
        // 4. 调用 AI API
        $reply = $this->generateAIReply(...);
        
        // 5. 返回结果
        return new JsonResponse(['reply' => $reply]);
    }
}
```

### 前端按钮组件

**位置**: `js/src/forum/components/SmartReplyButton.tsx`

```typescript
export default class SmartReplyButton extends Component {
  async handleClick(e: Event) {
    // 1. 防止重复点击
    if (this.loading) return;
    
    // 2. 调用 API
    const response = await app.request({...});
    
    // 3. 填充回复框
    this.openReplyBoxWithContent(post, response.reply);
    
    // 4. 显示提示
    app.alerts.show({...});
  }
}
```

## 添加新功能

### 示例：添加回复历史记录

#### 1. 创建数据库迁移

```php
// migrations/2025_01_01_000000_create_reply_history_table.php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('reply_history', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_id');
            $table->integer('user_id');
            $table->text('content');
            $table->timestamps();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('reply_history');
    }
];
```

#### 2. 创建模型

```php
// src/Model/ReplyHistory.php
namespace Wszdb\FlarumReplayByAi\Model;

use Flarum\Database\AbstractModel;

class ReplyHistory extends AbstractModel
{
    protected $table = 'reply_history';
}
```

#### 3. 更新控制器

```php
// 保存历史记录
ReplyHistory::create([
    'post_id' => $postId,
    'user_id' => $actor->id,
    'content' => $reply
]);
```

#### 4. 添加前端界面

```typescript
// js/src/forum/components/ReplyHistoryModal.tsx
export default class ReplyHistoryModal extends Modal {
  // 显示历史记录
}
```

## API 开发

### 添加新端点

**1. 在 `extend.php` 注册路由**

```php
(new Extend\Routes('api'))
    ->post('/replaybyai/history', 'replaybyai.history', HistoryController::class)
```

**2. 创建控制器**

```php
// src/Controller/HistoryController.php
class HistoryController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        // 实现逻辑
    }
}
```

**3. 前端调用**

```typescript
const response = await app.request({
  method: 'POST',
  url: app.forum.attribute('apiUrl') + '/replaybyai/history'
});
```

## 前端开发

### 扩展现有组件

```typescript
import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
  items.add('replayHistory', <ReplyHistoryWidget />);
});
```

### 创建新组件

```typescript
import Component from 'flarum/common/Component';

export default class MyComponent extends Component {
  view() {
    return <div>Hello World</div>;
  }
}
```

## 样式开发

### 添加新样式

```less
// less/forum.less
.MyNewComponent {
  background: #fff;
  padding: 20px;
  
  &:hover {
    background: #f5f5f5;
  }
}
```

### 使用 Flarum 变量

```less
.MyComponent {
  color: @primary-color;
  background: @body-bg;
}
```

## 国际化

### 添加翻译键

```yaml
# locale/en.yml
wszdb-replaybyai:
  forum:
    new_feature: "New Feature"
    new_button: "Click Me"
```

### 使用翻译

```typescript
// TypeScript
app.translator.trans('wszdb-replaybyai.forum.new_feature')

// PHP
$translator->trans('wszdb-replaybyai.forum.new_feature')
```

## 测试

### 手动测试清单

- [ ] 智赞按钮显示正常
- [ ] 点击后正确生成回复
- [ ] 回复框自动填充
- [ ] 引用格式正确
- [ ] 权限控制有效
- [ ] 错误提示友好
- [ ] 多语言切换正常
- [ ] 移动端适配良好

### 测试不同场景

1. **首楼回复**：不应有引用
2. **非首楼回复**：应有 @用户名#楼层号
3. **长内容**：应截取前 200 字符
4. **API 错误**：应显示友好错误信息
5. **未登录**：按钮不显示
6. **自己的帖子**：按钮不显示

## 调试技巧

### 后端调试

```php
// 添加日志
$log = resolve('log');
$log->info('Debug info', ['data' => $data]);

// 查看日志
tail -f storage/logs/flarum.log
```

### 前端调试

```typescript
// 控制台输出
console.log('Debug:', data);

// 使用浏览器开发工具
// F12 → Console/Network
```

### 常见问题

**Q: 前端修改不生效？**
```bash
# 清除缓存
php flarum cache:clear

# 重新构建
cd js && npm run build
```

**Q: 样式不生效？**
```bash
# 强制刷新浏览器
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

## 发布流程

### 1. 更新版本号

```json
// composer.json
{
  "version": "1.1.0"
}

// js/package.json
{
  "version": "1.1.0"
}
```

### 2. 更新 CHANGELOG

```markdown
## [1.1.0] - 2025-01-XX
### Added
- 新功能描述
```

### 3. 构建生产版本

```bash
cd js
npm run build
```

### 4. 提交代码

```bash
git add .
git commit -m "Release v1.1.0"
git tag v1.1.0
git push origin main --tags
```

### 5. 发布到 Packagist

- 在 GitHub 创建 Release
- Packagist 会自动同步

## 代码规范

### PHP (PSR-12)

```php
<?php

namespace Wszdb\FlarumReplayByAi;

class Example
{
    public function method(): void
    {
        // 代码
    }
}
```

### TypeScript (Prettier)

```typescript
export default class Example extends Component {
  view() {
    return <div>Content</div>;
  }
}
```

## 资源链接

- [Flarum 文档](https://docs.flarum.org)
- [Flarum API 参考](https://api.docs.flarum.org)
- [TypeScript 手册](https://www.typescriptlang.org/docs)
- [Less 文档](http://lesscss.org)

## 获取帮助

- GitHub Issues: https://github.com/wszdb/flarum-replaybyai/issues
- Flarum 社区: https://discuss.flarum.org

---

Happy Coding! 🚀