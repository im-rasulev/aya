import { generateCompletion } from '../config/openai.js';
import { LESSON_PLAN_PROMPT, HOMEWORK_CHECK_PROMPT } from '../prompts/lessonPrompts.js';
import { LESSON_PLAN_SYSTEM_PROMPT, HOMEWORK_CHECK_SYSTEM_PROMPT } from '../prompts/systemPrompts.js';
import { LESSON_SETTINGS } from '../config/promptSettings.js';

/**
 * Генерирует план урока по заданной теме
 * @param {string} topic - Тема урока
 * @param {Object} options - Настройки урока
 * @param {string} options.duration - Длительность урока в минутах
 * @param {string} options.type - Тип урока (теория/практика/комбинированный)
 * @param {string} options.format - Формат урока (очный/онлайн/смешанный)
 * @param {string} options.age - Возрастная группа
 * @returns {Promise<string>} План урока в текстовом формате
 * @throws {Error} Если не удалось создать план урока
 */
export async function generateLessonPlan(topic, options = {}) {
    try {
        const response = await generateCompletion(LESSON_PLAN_PROMPT(topic, options), {
            ...LESSON_SETTINGS.plan,
            systemPrompt: LESSON_PLAN_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error generating lesson plan:', error);
        throw new Error('Не удалось создать план урока. Пожалуйста, попробуйте позже.');
    }
}

/**
 * Проверяет домашнее задание
 * @param {string} homework - Текст домашнего задания для проверки
 * @param {Object} options - Настройки проверки
 * @param {string} options.level - Уровень проверки (базовый/средний/продвинутый)
 * @param {string} options.checkType - Тип проверки (комплексный/орфография/пунктуация)
 * @param {string} options.gradeType - Тип оценивания (балльное/процентное/уровневое)
 * @returns {Promise<string>} Результат проверки домашнего задания
 * @throws {Error} Если не удалось проверить домашнее задание
 */
export async function checkHomework(homework, options = {}) {
    try {
        const response = await generateCompletion(HOMEWORK_CHECK_PROMPT(homework, options), {
            ...LESSON_SETTINGS.homework,
            systemPrompt: HOMEWORK_CHECK_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error checking homework:', error);
        throw new Error('Не удалось проверить домашнее задание. Пожалуйста, попробуйте позже.');
    }
}
