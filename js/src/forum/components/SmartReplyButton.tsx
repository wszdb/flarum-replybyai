import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Post from 'flarum/common/models/Post';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';

export default class SmartReplyButton extends Component {
  loading = false;

  view() {
    const post = this.attrs.post as Post;
    
    // 从后台设置获取按钮文案
    const buttonText = app.forum.attribute('wszdb-replybyai.button_text') || 
                       app.translator.trans('wszdb-replybyai.forum.smart_reply');

    return (
      <Button
        className="Button Button--link SmartReplyButton"
        icon="fas fa-robot"
        onclick={this.handleClick.bind(this)}
        loading={this.loading}
        disabled={this.loading}
      >
        {buttonText}
      </Button>
    );
  }

  async handleClick(e: Event) {
    e.preventDefault();

    const post = this.attrs.post as Post;
    
    // 防止重复点击
    if (this.loading) return;

    this.loading = true;
    m.redraw();

    try {
      // 调用API生成回复
      const response = await app.request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/replybyai/generate',
        body: {
          postId: post.id()
        }
      });

      if (response.success) {
        // 获取生成的回复内容
        const replyContent = response.reply;

        // 打开回复框并填充内容
        this.openReplyBoxWithContent(post, replyContent);

        // 显示成功提示
        app.alerts.show(
          {
            type: 'success'
          },
          app.translator.trans('wszdb-replybyai.forum.reply_generated')
        );
      } else {
        throw new Error(response.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Smart reply error:', error);
      
      app.alerts.show(
        {
          type: 'error'
        },
        app.translator.trans('wszdb-replybyai.forum.reply_failed', {
          error: error.message || 'Unknown error'
        })
      );
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  openReplyBoxWithContent(post: Post, content: string) {
    const discussion = post.discussion();
    
    if (!discussion) {
      console.error('Discussion not found');
      return;
    }

    // 先打开回复框
    app.composer.load(ReplyComposer, {
      user: app.session.user,
      discussion: discussion
    });

    // 多次尝试插入内容，直到成功
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInsertContent = () => {
      attempts++;
      
      const composer = app.composer.component;
      
      // 尝试多种方式获取编辑器
      let editor = null;
      
      if (composer) {
        // 方式1: 直接从 composer.editor
        editor = composer.editor;
        
        // 方式2: 从 composer.attrs
        if (!editor && composer.attrs) {
          editor = composer.attrs.editor;
        }
        
        // 方式3: 从 composer.composer
        if (!editor && composer.composer) {
          editor = composer.composer.editor;
        }
      }
      
      if (editor) {
        // 找到编辑器了！
        console.log('Editor found, inserting content...');
        
        // 清空并插入内容
        if (typeof editor.setValue === 'function') {
          editor.setValue(content);
        } else if (typeof editor.insertAtCursor === 'function') {
          editor.insertAtCursor(content);
        } else {
          // 直接设置值
          editor.value = content;
        }
        
        // 聚焦
        if (typeof editor.focus === 'function') {
          editor.focus();
        }
        
        console.log('Content inserted successfully');
        m.redraw();
      } else {
        // 还没找到编辑器
        if (attempts < maxAttempts) {
          console.log(`Editor not found, retry ${attempts}/${maxAttempts}...`);
          setTimeout(tryInsertContent, 100);
        } else {
          console.error('Editor not found after', maxAttempts, 'attempts');
          console.log('Composer structure:', composer);
        }
      }
    };
    
    // 开始尝试
    setTimeout(tryInsertContent, 100);
  }
}