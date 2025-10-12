import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import Button from 'flarum/common/components/Button';
import TextEditor from 'flarum/common/components/TextEditor';

app.initializers.add('wszdb-replybyai', () => {
  console.log('Reply By AI extension loaded');
  
  // 扩展 TextEditor 的 controlItems
  extend(TextEditor.prototype, 'controlItems', function (items) {
    console.log('TextEditor controlItems called');
    console.log('Current items:', items);
    
    const buttonText = app.forum.attribute('wszdb-replybyai.button_text') || 'AI回复';
    
    const button = (
      <Button
        className="Button Button--icon AiReplyButton"
        icon="fas fa-robot"
        onclick={this.generateAIReply.bind(this)}
        loading={this.aiReplyLoading}
        disabled={this.aiReplyLoading}
        title={buttonText}
        style="background-color: #4CAF50; color: white; z-index: 9999;"
      >
        {buttonText}
      </Button>
    );
    
    items.add('aiReply', button, 10);
    
    console.log('AI Reply button added to controlItems');
    console.log('Items after add:', items);
  });

  TextEditor.prototype.generateAIReply = async function (e: Event) {
    e.preventDefault();
    console.log('Generate AI Reply clicked');
    
    if (this.aiReplyLoading) return;
    
    this.aiReplyLoading = true;
    m.redraw();

    try {
      const discussion = app.composer.body?.attrs?.discussion;
      
      if (!discussion) {
        throw new Error('Discussion not found');
      }
      
      const posts = discussion.posts();
      let targetPost = null;
      
      if (posts && posts.length > 0) {
        for (let i = posts.length - 1; i >= 0; i--) {
          if (posts[i] && posts[i].contentType() === 'comment') {
            targetPost = posts[i];
            break;
          }
        }
      }
      
      if (!targetPost) {
        targetPost = discussion.firstPost();
      }

      if (!targetPost) {
        throw new Error('No post found to reply to');
      }

      console.log('Requesting AI reply for post:', targetPost.id());

      const response = await app.request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/replybyai/generate',
        body: {
          postId: targetPost.id()
        }
      });

      console.log('API response:', response);

      if (response.success) {
        const replyContent = response.reply;
        
        const textarea = document.querySelector('textarea.FormControl');
        
        if (textarea) {
          textarea.value = '';
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          
          if (app.composer && app.composer.editor) {
            app.composer.editor.insertAtCursor(replyContent);
            console.log('Content inserted successfully');
          } else {
            textarea.value = replyContent;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
          }
          
          textarea.focus();
          m.redraw();
        } else {
          throw new Error('Textarea not found');
        }
      } else {
        throw new Error(response.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error('AI reply generation error:', error);
      
      app.alerts.show(
        { type: 'error' },
        app.translator.trans('wszdb-replybyai.forum.reply_failed', {
          error: error.message || 'Unknown error'
        })
      );
    } finally {
      this.aiReplyLoading = false;
      m.redraw();
    }
  };

  TextEditor.prototype.aiReplyLoading = false;
});