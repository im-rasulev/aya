import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import dotenv from 'dotenv';

dotenv.config();

const PROXY_CONFIG = {
    host: process.env.PROXY_HOST,
    port: process.env.PROXY_PORT,
    auth: {
        username: process.env.PROXY_USERNAME,
        password: process.env.PROXY_PASSWORD
    }
};

const proxyUrl = `http://${PROXY_CONFIG.auth.username}:${PROXY_CONFIG.auth.password}@${PROXY_CONFIG.host}:${PROXY_CONFIG.port}`;
const httpsAgent = new HttpsProxyAgent(proxyUrl);

const OPENAI_CONFIG = {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1'
};

const openaiClient = axios.create({
    baseURL: OPENAI_CONFIG.baseURL,
    headers: {
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
    },
    httpsAgent: httpsAgent,
    proxy: false // Отключаем встроенный прокси axios, так как используем httpsAgent
});

/**
 * Генерирует текстовое завершение с помощью OpenAI API
 * @param {string} prompt - Текст запроса
 * @param {Object} options - Настройки генерации
 * @param {string} [options.model='gpt-3.5-turbo'] - Модель OpenAI
 * @param {string} [options.systemPrompt='You are a helpful assistant.'] - Системный промпт
 * @param {number} [options.temperature=0.7] - Температура генерации (0-1)
 * @param {number} [options.maxTokens=1000] - Максимальное количество токенов
 * @returns {Promise<string>} Сгенерированный текст
 * @throws {Error} Если произошла ошибка при генерации
 */
export async function generateCompletion(prompt, options = {}) {
    try {
        console.log('Generating completion...', prompt, { options });
        const response = await openaiClient.post('/chat/completions', {
            model: options.model || 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: options.systemPrompt || 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            temperature: options.temperature || 0.7,
            max_tokens: options.maxTokens || 1000
        });
        console.log('Completion generated successfully', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error.response?.data || error.message);
        throw new Error('Ошибка при генерации ответа');
    }
} 