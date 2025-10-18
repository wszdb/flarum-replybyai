import app from 'flarum/admin/app';

app.initializers.add('wszdb-replybyai', () => {
  app.extensionData
    .for('wszdb-replybyai')
    .registerSetting({
      setting: 'wszdb-replybyai.api_key',
      type: 'text',
      label: app.translator.trans('wszdb-replybyai.admin.settings.api_key_label'),
      help: app.translator.trans('wszdb-replybyai.admin.settings.api_key_help'),
      placeholder: 'sk-...',
    })
    .registerSetting({
      setting: 'wszdb-replybyai.base_url',
      type: 'text',
      label: app.translator.trans('wszdb-replybyai.admin.settings.base_url_label'),
      help: app.translator.trans('wszdb-replybyai.admin.settings.base_url_help'),
      placeholder: 'https://api.openai.com/v1',
    })
    .registerSetting({
      setting: 'wszdb-replybyai.model',
      type: 'text',
      label: app.translator.trans('wszdb-replybyai.admin.settings.model_label'),
      help: app.translator.trans('wszdb-replybyai.admin.settings.model_help'),
      placeholder: 'gpt-3.5-turbo',
    })
    .registerSetting({
      setting: 'wszdb-replybyai.max_tokens',
      type: 'number',
      label: app.translator.trans('wszdb-replybyai.admin.settings.max_tokens_label'),
      help: app.translator.trans('wszdb-replybyai.admin.settings.max_tokens_help'),
      placeholder: '1024',
    })
    .registerSetting({
      setting: 'wszdb-replybyai.content_max_length',
      type: 'number',
      label: app.translator.trans('wszdb-replybyai.admin.settings.content_max_length_label'),
      help: app.translator.trans('wszdb-replybyai.admin.settings.content_max_length_help'),
      placeholder: '200',
    })
    .registerSetting({
      setting: 'wszdb-replybyai.button_icon',
      type: 'text',
      label: 'Button Icon',
      help: 'FontAwesome icon class for the AI reply button (e.g., "fas fa-robot", "fas fa-magic", "fas fa-brain")',
      placeholder: 'fas fa-robot',
    })
    .registerSetting({
      setting: 'wszdb-replybyai.system_prompt',
      type: 'textarea',
      label: app.translator.trans('wszdb-replybyai.admin.settings.system_prompt_label'),
      help: app.translator.trans('wszdb-replybyai.admin.settings.system_prompt_help'),
      placeholder: 'You are a helpful assistant...',
    });
});
