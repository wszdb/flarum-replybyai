import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

export default class ReplayByAiSettings extends ExtensionPage {
  content() {
    return (
      <div className="ExtensionPage-settings">
        <div className="container">
          <div className="Form">
            {this.buildSettingComponent({
              setting: 'wszdb-replaybyai.api_key',
              type: 'text',
              label: app.translator.trans('wszdb-replaybyai.admin.settings.api_key_label'),
              help: app.translator.trans('wszdb-replaybyai.admin.settings.api_key_help'),
              placeholder: 'sk-...',
            })}
            
            {this.buildSettingComponent({
              setting: 'wszdb-replaybyai.base_url',
              type: 'text',
              label: app.translator.trans('wszdb-replaybyai.admin.settings.base_url_label'),
              help: app.translator.trans('wszdb-replaybyai.admin.settings.base_url_help'),
              placeholder: 'https://api.openai.com/v1',
            })}
            
            {this.buildSettingComponent({
              setting: 'wszdb-replaybyai.model',
              type: 'text',
              label: app.translator.trans('wszdb-replaybyai.admin.settings.model_label'),
              help: app.translator.trans('wszdb-replaybyai.admin.settings.model_help'),
              placeholder: 'gpt-3.5-turbo',
            })}
            
            {this.buildSettingComponent({
              setting: 'wszdb-replaybyai.max_tokens',
              type: 'number',
              label: app.translator.trans('wszdb-replaybyai.admin.settings.max_tokens_label'),
              help: app.translator.trans('wszdb-replaybyai.admin.settings.max_tokens_help'),
              placeholder: '1024',
            })}
            
            {this.buildSettingComponent({
              setting: 'wszdb-replaybyai.button_icon',
              type: 'text',
              label: 'Button Icon',
              help: 'FontAwesome icon class for the AI reply button (e.g., "fas fa-robot", "fas fa-magic", "fas fa-brain")',
              placeholder: 'fas fa-robot',
            })}
            
            {this.buildSettingComponent({
              setting: 'wszdb-replaybyai.system_prompt',
              type: 'textarea',
              label: app.translator.trans('wszdb-replaybyai.admin.settings.system_prompt_label'),
              help: app.translator.trans('wszdb-replaybyai.admin.settings.system_prompt_help'),
              placeholder: 'You are a helpful assistant...',
            })}
            
            <div className="Form-group">{this.submitButton()}</div>
          </div>
        </div>
      </div>
    );
  }
}
