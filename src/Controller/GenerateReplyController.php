<?php

namespace Wszdb\FlarumReplyByAi\Controller;

use Flarum\Http\RequestUtil;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class GenerateReplyController implements RequestHandlerInterface
{
    public function __construct(
        protected SettingsRepositoryInterface $settings
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        
        // 确保用户已登录
        $actor->assertRegistered();

        $data = $request->getParsedBody();
        $postId = $data['postId'] ?? null;

        if (!$postId) {
            return new JsonResponse([
                'error' => 'Post ID is required'
            ], 400);
        }

        try {
            // 获取帖子内容
            $post = Post::findOrFail($postId);
            $discussion = $post->discussion;
            
            // 检查用户是否有权限在此讨论中回复
            // 使用 discussion 的 reply 权限而不是 post 的
            if (!$actor->can('reply', $discussion)) {
                return new JsonResponse([
                    'error' => 'You do not have permission to reply to this discussion.'
                ], 403);
            }

            // 获取配置
            $apiKey = $this->settings->get('wszdb-replybyai.api_key');
            $baseUrl = $this->settings->get('wszdb-replybyai.base_url', 'https://api.openai.com/v1');
            $model = $this->settings->get('wszdb-replybyai.model', 'gpt-3.5-turbo');
            $maxTokens = (int) $this->settings->get('wszdb-replybyai.max_tokens', 200);
            $contentMaxLength = (int) $this->settings->get('wszdb-replybyai.content_max_length', 200);
            $systemPrompt = $this->settings->get('wszdb-replybyai.system_prompt', 
                'You are a helpful assistant. Generate a thoughtful and relevant reply to the given post content. Keep the response concise and friendly.');

            if (empty($apiKey)) {
                return new JsonResponse([
                    'error' => 'API Key not configured. Please contact administrator.'
                ], 500);
            }

            // 获取帖子内容（根据后台设置的字数限制）
            $content = $post->content;
            if (mb_strlen($content) > $contentMaxLength) {
                $content = mb_substr($content, 0, $contentMaxLength);
            }

            // 调用AI API生成回复
            $reply = $this->generateAIReply($baseUrl, $apiKey, $model, $maxTokens, $systemPrompt, $content);

            // 判断是否需要添加引用
            $isFirstPost = $post->number == 1;
            $quotePrefix = '';
            
            if (!$isFirstPost) {
                // 非首楼，添加引用标记
                $username = $post->user->username ?? 'User';
                $quotePrefix = "@{$username}#{$post->number} \n\n";
            }

            return new JsonResponse([
                'success' => true,
                'reply' => $quotePrefix . $reply,
                'isFirstPost' => $isFirstPost
            ], 200);

        } catch (\Flarum\Post\Exception\FloodingException $e) {
            return new JsonResponse([
                'error' => 'Please wait before posting again.'
            ], 429);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Failed to generate reply: ' . $e->getMessage()
            ], 500);
        }
    }

    private function generateAIReply(
        string $baseUrl, 
        string $apiKey, 
        string $model, 
        int $maxTokens, 
        string $systemPrompt, 
        string $content
    ): string {
        // 构建请求
        $url = rtrim($baseUrl, '/') . '/chat/completions';
        
        $messages = [
            [
                'role' => 'system',
                'content' => $systemPrompt
            ],
            [
                'role' => 'user',
                'content' => $content
            ]
        ];

        $requestData = [
            'model' => $model,
            'messages' => $messages,
            'max_tokens' => $maxTokens,
            'temperature' => 0.7
        ];

        // 使用cURL发送请求
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            throw new \Exception('cURL error: ' . $error);
        }

        if ($httpCode !== 200) {
            throw new \Exception('API returned HTTP ' . $httpCode . ': ' . $response);
        }

        $responseData = json_decode($response, true);

        if (!isset($responseData['choices'][0]['message']['content'])) {
            throw new \Exception('Invalid API response format');
        }

        return trim($responseData['choices'][0]['message']['content']);
    }
}