import { generateCompletion } from '../config/openai.js';
import { TEST_GENERATION_PROMPT, TEST_CHECK_PROMPT } from '../prompts/testPrompts.js';
import { TEST_GENERATION_SYSTEM_PROMPT, TEST_CHECK_SYSTEM_PROMPT } from '../prompts/systemPrompts.js';

// Константы для типов тестов
export const TEST_TYPES = {
    MULTIPLE_CHOICE: 'multiple_choice',
    OPEN_ENDED: 'open_ended',
    TRUE_FALSE: 'true_false'
};

// Вспомогательная функция для перевода типа теста
export function translateTestType(type) {
    const types = {
        [TEST_TYPES.MULTIPLE_CHOICE]: 'Множественный выбор',
        [TEST_TYPES.OPEN_ENDED]: 'Открытый ответ',
        [TEST_TYPES.TRUE_FALSE]: 'Верно/Неверно'
    };
    return types[type] || types[TEST_TYPES.MULTIPLE_CHOICE];
}

// Вспомогательная функция для получения формата вопроса
function getQuestionFormat(type) {
    const formats = {
        [TEST_TYPES.MULTIPLE_CHOICE]: `Вопрос: [текст вопроса]
Варианты ответов:
A) [вариант]
B) [вариант]
C) [вариант]
D) [вариант]
Правильный ответ: [буква]
Пояснение: [почему этот ответ правильный]`,

        [TEST_TYPES.OPEN_ENDED]: `Вопрос: [текст вопроса]
Ответ: [правильный ответ]
Пояснение: [объяснение ответа]
Альтернативные формулировки ответа: [возможные варианты]`,

        [TEST_TYPES.TRUE_FALSE]: `Утверждение: [текст утверждения]
Ответ: [Верно/Неверно]
Пояснение: [почему утверждение верно или неверно]`
    };
    return formats[type] || formats[TEST_TYPES.MULTIPLE_CHOICE];
}

// Основная функция генерации теста
export async function generateTest(topic, settings) {
    try {
        const response = await generateCompletion(TEST_GENERATION_PROMPT(topic, settings), {
            temperature: 0.7,
            maxTokens: 2500,
            systemPrompt: TEST_GENERATION_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in generateTest:', error);
        throw new Error('Не удалось создать тест. Пожалуйста, попробуйте еще раз.');
    }
}

// Получение списка доступных типов тестов
export async function getTestTypes() {
    return Object.entries(TEST_TYPES).map(([key, value]) => ({
        id: value,
        name: translateTestType(value),
        description: getQuestionFormat(value)
    }));
}

export async function checkTest(answers, settings) {
    try {
        const response = await generateCompletion(TEST_CHECK_PROMPT(answers, settings), {
            temperature: 0.7,
            maxTokens: 2000,
            systemPrompt: TEST_CHECK_SYSTEM_PROMPT
        });

        return response;
    } catch (error) {
        console.error('Error in checkTest:', error);
        throw new Error('Не удалось проверить тест. Пожалуйста, попробуйте еще раз.');
    }
} 