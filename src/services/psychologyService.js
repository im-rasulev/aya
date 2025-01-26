import { generateCompletion } from '../config/openai.js';
import {
    PSYCHOLOGY_ADVICE_PROMPT,
    RELAXATION_TECHNIQUES_PROMPT,
    MOTIVATION_PROMPT,
    WORK_LIFE_BALANCE_PROMPT,
    DAILY_AFFIRMATIONS_PROMPT,
    PERSONALIZED_RECOMMENDATIONS_PROMPT,
    DAILY_ADVICE_PROMPT,
    SITUATION_ANALYSIS_PROMPT
} from '../prompts/psychologyPrompts.js';
import {
    PSYCHOLOGY_SYSTEM_PROMPT,
    RELAXATION_SYSTEM_PROMPT,
    MOTIVATION_SYSTEM_PROMPT,
    WORK_LIFE_BALANCE_SYSTEM_PROMPT,
    DAILY_AFFIRMATIONS_SYSTEM_PROMPT,
    PERSONALIZED_RECOMMENDATIONS_SYSTEM_PROMPT,
    DAILY_ADVICE_SYSTEM_PROMPT,
    SITUATION_ANALYSIS_SYSTEM_PROMPT
} from '../prompts/systemPrompts.js';
import { PSYCHOLOGY_SETTINGS } from '../config/promptSettings.js';

/**
 * Генерирует психологический совет на основе описанной ситуации
 * @param {string} situation - Описание ситуации
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Психологический совет
 * @throws {Error} Если не удалось сгенерировать совет
 */
export async function generatePsychologyAdvice(situation, events) {
    try {
        if (events) {
            events.emit('generation:start', 'Анализирую ситуацию...');
        }

        const response = await generateCompletion(PSYCHOLOGY_ADVICE_PROMPT(situation), {
            ...PSYCHOLOGY_SETTINGS.advice,
            systemPrompt: PSYCHOLOGY_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Психологический совет готов');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при генерации психологического совета');
        }
        console.error('Error in generatePsychologyAdvice:', error);
        throw new Error('Не удалось сгенерировать психологическую консультацию');
    }
}

/**
 * Получает техники релаксации
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Список техник релаксации
 * @throws {Error} Если не удалось получить техники релаксации
 */
export async function getRelaxationTechniques(events) {
    try {
        if (events) {
            events.emit('generation:start', 'Подбираю техники релаксации...');
        }

        const response = await generateCompletion(RELAXATION_TECHNIQUES_PROMPT(), {
            ...PSYCHOLOGY_SETTINGS.relaxation,
            systemPrompt: RELAXATION_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Техники релаксации подготовлены');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при получении техник релаксации');
        }
        console.error('Error in getRelaxationTechniques:', error);
        throw new Error('Не удалось получить техники релаксации');
    }
}

/**
 * Генерирует мотивационное послание
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Мотивационное послание
 * @throws {Error} Если не удалось сгенерировать мотивационное послание
 */
export async function generateMotivation(events) {
    try {
        if (events) {
            events.emit('generation:start', 'Создаю мотивационное послание...');
        }

        const response = await generateCompletion(MOTIVATION_PROMPT(), {
            ...PSYCHOLOGY_SETTINGS.motivation,
            systemPrompt: MOTIVATION_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Мотивационное послание готово');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при генерации мотивационного послания');
        }
        console.error('Error in generateMotivation:', error);
        throw new Error('Не удалось сгенерировать мотивационное послание');
    }
}

/**
 * Получает рекомендации по балансу работы и жизни
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Рекомендации по балансу
 * @throws {Error} Если не удалось получить рекомендации
 */
export async function getWorkLifeBalanceAdvice(events) {
    try {
        if (events) {
            events.emit('generation:start', 'Формирую рекомендации по балансу работы и жизни...');
        }

        const response = await generateCompletion(WORK_LIFE_BALANCE_PROMPT(), {
            ...PSYCHOLOGY_SETTINGS.workLifeBalance,
            systemPrompt: WORK_LIFE_BALANCE_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Рекомендации по балансу готовы');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при получении рекомендаций по балансу');
        }
        console.error('Error in getWorkLifeBalanceAdvice:', error);
        throw new Error('Не удалось получить рекомендации по балансу');
    }
}

/**
 * Получает ежедневные аффирмации
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Список аффирмаций
 * @throws {Error} Если не удалось получить аффирмации
 */
export async function getDailyAffirmations(events) {
    try {
        if (events) {
            events.emit('generation:start', 'Создаю аффирмации дня...');
        }

        const response = await generateCompletion(DAILY_AFFIRMATIONS_PROMPT(), {
            ...PSYCHOLOGY_SETTINGS.dailyAffirmations,
            systemPrompt: DAILY_AFFIRMATIONS_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Аффирмации дня готовы');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при получении аффирмаций');
        }
        console.error('Error in getDailyAffirmations:', error);
        throw new Error('Не удалось получить аффирмации');
    }
}

/**
 * Получает персонализированные рекомендации
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Персонализированные рекомендации
 * @throws {Error} Если не удалось получить рекомендации
 */
export async function getPersonalizedRecommendations(events) {
    try {
        if (events) {
            events.emit('generation:start', 'Подбираю рекомендации...');
        }

        const response = await generateCompletion(PERSONALIZED_RECOMMENDATIONS_PROMPT(), {
            ...PSYCHOLOGY_SETTINGS.personalizedRecommendations,
            systemPrompt: PERSONALIZED_RECOMMENDATIONS_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Персональные рекомендации готовы');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при получении персональных рекомендаций');
        }
        console.error('Error in getPersonalizedRecommendations:', error);
        throw new Error('Не удалось получить рекомендации');
    }
}

/**
 * Получает совет дня
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Совет дня
 * @throws {Error} Если не удалось получить совет дня
 */
export async function getDailyAdvice(events) {
    try {
        if (events) {
            events.emit('generation:start', 'Генерация совета дня...');
        }

        const response = await generateCompletion(DAILY_ADVICE_PROMPT(), {
            ...PSYCHOLOGY_SETTINGS.dailyAdvice,
            systemPrompt: DAILY_ADVICE_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Совет дня сгенерирован');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при генерации совета дня');
        }
        console.error('Error in getDailyAdvice:', error);
        throw new Error('Не удалось получить совет дня');
    }
}

/**
 * Анализирует психологическую ситуацию
 * @param {string} situation - Описание ситуации для анализа
 * @param {EventEmitter} events - Объект для отправки событий о прогрессе
 * @returns {Promise<string>} Результат анализа ситуации
 * @throws {Error} Если не удалось проанализировать ситуацию
 */
export async function analyzeSituation(situation, events) {
    try {
        if (events) {
            events.emit('generation:start', 'Анализирую ситуацию...');
        }

        const response = await generateCompletion(SITUATION_ANALYSIS_PROMPT(situation), {
            ...PSYCHOLOGY_SETTINGS.situationAnalysis,
            systemPrompt: SITUATION_ANALYSIS_SYSTEM_PROMPT
        });

        if (events) {
            events.emit('generation:end', 'Анализ ситуации завершен');
        }

        return response;
    } catch (error) {
        if (events) {
            events.emit('generation:error', 'Ошибка при анализе ситуации');
        }
        console.error('Error in analyzeSituation:', error);
        throw new Error('Не удалось проанализировать ситуацию');
    }
} 