import { generateCompletion } from '../config/openai.js';
import { MATERIAL_SEARCH_PROMPT, MATERIAL_RECOMMENDATIONS_PROMPT } from '../prompts/materialPrompts.js';
import { MATERIAL_SEARCH_SYSTEM_PROMPT, MATERIAL_RECOMMENDATIONS_SYSTEM_PROMPT } from '../prompts/systemPrompts.js';
import { MATERIAL_SETTINGS } from '../config/promptSettings.js';

/**
 * Получает рекомендации по учебным материалам
 * @param {string} topic - Тема для поиска материалов
 * @param {Object} settings - Настройки поиска
 * @param {string} settings.type - Тип материалов (учебники/статьи/видео/интерактив)
 * @param {string} settings.language - Язык материалов (русский/английский)
 * @param {string} settings.age - Возрастная группа
 * @param {string} type - Тип запроса (search/recommendations)
 * @returns {Promise<string>} Рекомендации по материалам
 * @throws {Error} Если не удалось получить рекомендации
 */
export async function getMaterialRecommendations(topic, settings, type = 'recommendations') {
    try {
        const prompts = {
            search: MATERIAL_SEARCH_PROMPT,
            recommendations: MATERIAL_RECOMMENDATIONS_PROMPT
        };

        const systemPrompts = {
            search: MATERIAL_SEARCH_SYSTEM_PROMPT,
            recommendations: MATERIAL_RECOMMENDATIONS_SYSTEM_PROMPT
        };

        const response = await generateCompletion(prompts[type](topic, settings), {
            ...MATERIAL_SETTINGS[type],
            systemPrompt: systemPrompts[type]
        });

        return response;
    } catch (error) {
        console.error(`Error in getMaterialRecommendations (${type}):`, error);
        throw new Error(type === 'search' ?
            'Не удалось найти материалы по заданным параметрам' :
            'Не удалось получить рекомендации');
    }
}

/**
 * Поиск учебных материалов по заданным параметрам
 * @param {string} topic - Тема для поиска
 * @param {Object} settings - Настройки поиска
 * @returns {Promise<string>} Результаты поиска материалов
 * @throws {Error} Если не удалось найти материалы
 */
export const searchMaterials = (topic, settings) => getMaterialRecommendations(topic, settings, 'search');

/**
 * Получает рекомендации по учебным материалам
 * @param {string} topic - Тема для рекомендаций
 * @param {Object} settings - Настройки для рекомендаций
 * @returns {Promise<string>} Рекомендации по материалам
 * @throws {Error} Если не удалось получить рекомендации
 */
export const getRecommendations = (topic, settings) => getMaterialRecommendations(topic, settings, 'recommendations'); 