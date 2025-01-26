import { generateCompletion } from '../config/openai.js';
import {
    PRESENTATION_STRUCTURE_PROMPT,
    SLIDE_IDEAS_PROMPT,
    PRESENTATION_PROMPT,
    PRESENTATION_TIPS_PROMPT,
    IMAGE_PROMPTS_PROMPT
} from '../prompts/presentationPrompts.js';
import {
    PRESENTATION_SYSTEM_PROMPT,
    SLIDE_IDEAS_SYSTEM_PROMPT,
    PRESENTATION_CREATOR_SYSTEM_PROMPT,
    PRESENTATION_TIPS_SYSTEM_PROMPT,
    IMAGE_PROMPTS_SYSTEM_PROMPT
} from '../prompts/systemPrompts.js';
import { PRESENTATION_SETTINGS } from '../config/promptSettings.js';

/**
 * Генерирует структуру презентации по заданной теме
 * @param {string} topic - Тема презентации
 * @param {Object} settings - Настройки презентации
 * @param {string} settings.duration - Длительность презентации в минутах
 * @param {string} settings.slidesCount - Количество слайдов
 * @param {string} settings.style - Стиль презентации (академический/креативный/минималистичный)
 * @param {string} settings.age - Возрастная группа (например, "7-9")
 * @returns {Promise<string>} Структура презентации в текстовом формате
 * @throws {Error} Если не удалось сгенерировать структуру презентации
 */
export async function generatePresentationStructure(topic, settings) {
    try {
        const response = await generateCompletion(PRESENTATION_STRUCTURE_PROMPT(topic, settings), {
            ...PRESENTATION_SETTINGS.structure,
            systemPrompt: PRESENTATION_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in generatePresentationStructure:', error);
        throw new Error('Не удалось сгенерировать структуру презентации. Пожалуйста, попробуйте еще раз.');
    }
}

/**
 * Генерирует идеи для слайдов по заданной теме
 * @param {string} topic - Тема презентации
 * @param {Object} settings - Настройки презентации
 * @param {string} settings.age - Возрастная группа
 * @returns {Promise<string>} Идеи для слайдов в текстовом формате
 * @throws {Error} Если не удалось сгенерировать идеи для слайдов
 */
export async function generateSlideIdeas(topic, settings) {
    try {
        const response = await generateCompletion(SLIDE_IDEAS_PROMPT(topic, settings), {
            ...PRESENTATION_SETTINGS.slideIdeas,
            systemPrompt: SLIDE_IDEAS_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in generateSlideIdeas:', error);
        throw new Error('Не удалось сгенерировать идеи для слайдов. Пожалуйста, попробуйте еще раз.');
    }
}

/**
 * Создает полную презентацию по заданной теме
 * @param {string} topic - Тема презентации
 * @param {Object} settings - Настройки презентации
 * @param {string} settings.duration - Длительность презентации
 * @param {string} settings.slidesCount - Количество слайдов
 * @param {string} settings.style - Стиль презентации
 * @param {string} settings.age - Возрастная группа
 * @returns {Promise<string>} Готовая презентация в текстовом формате
 * @throws {Error} Если не удалось создать презентацию
 */
export async function generatePresentation(topic, settings) {
    try {
        const response = await generateCompletion(PRESENTATION_PROMPT(topic, settings), {
            ...PRESENTATION_SETTINGS.presentation,
            systemPrompt: PRESENTATION_CREATOR_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in generatePresentation:', error);
        throw new Error('Не удалось создать презентацию');
    }
}

/**
 * Получает рекомендации по созданию презентации
 * @param {Object} settings - Настройки для рекомендаций
 * @returns {Promise<string>} Рекомендации по созданию презентации
 * @throws {Error} Если не удалось получить рекомендации
 */
export async function getPresentationTips(settings) {
    try {
        const response = await generateCompletion(PRESENTATION_TIPS_PROMPT(settings), {
            ...PRESENTATION_SETTINGS.tips,
            systemPrompt: PRESENTATION_TIPS_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in getPresentationTips:', error);
        throw new Error('Не удалось получить рекомендации по презентации');
    }
}

/**
 * Генерирует подсказки для подбора изображений к презентации
 * @param {string} topic - Тема презентации
 * @param {Object} settings - Настройки презентации
 * @returns {Promise<string>} Подсказки для подбора изображений
 * @throws {Error} Если не удалось сгенерировать подсказки
 */
export async function generateImagePrompts(topic, settings) {
    try {
        const response = await generateCompletion(IMAGE_PROMPTS_PROMPT(topic, settings), {
            ...PRESENTATION_SETTINGS.imagePrompts,
            systemPrompt: IMAGE_PROMPTS_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in generateImagePrompts:', error);
        throw new Error('Не удалось сгенерировать подсказки для изображений. Пожалуйста, попробуйте еще раз.');
    }
} 