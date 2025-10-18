<?php

/*
 * This file is part of wszdb/flarum-replybyai.
 *
 * Copyright (c) 2025 wszdb.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Wszdb\FlarumReplyByAi;

use Flarum\Extend;
use Wszdb\FlarumReplyByAi\Controller\GenerateReplyController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    
    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Routes('api'))
        ->post('/replybyai/generate', 'replybyai.generate', GenerateReplyController::class),

    (new Extend\Settings())
        ->default('wszdb-replybyai.api_key', '')
        ->default('wszdb-replybyai.base_url', 'https://api.openai.com/v1')
        ->default('wszdb-replybyai.model', 'gpt-3.5-turbo')
        ->default('wszdb-replybyai.max_tokens', 1024)
        ->default('wszdb-replybyai.content_max_length', 200)
        ->default('wszdb-replybyai.button_icon', 'fas fa-robot')
        ->default('wszdb-replybyai.system_prompt', 'You are a helpful assistant. Generate a thoughtful and relevant reply to the given post content. Keep the response concise and friendly.')
        ->serializeToForum('wszdb-replybyai.button_icon', 'wszdb-replybyai.button_icon'),
];
