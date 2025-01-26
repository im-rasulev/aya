import { userStates } from '../store/userStates.js';
import {
    MAIN_MENU,
    MATERIALS_MENU,
    TESTS_MENU,
    PRESENTATIONS_MENU,
    LESSONS_MENU,
    SCENARIOS_MENU,
    PSYCHOLOGY_MENU
} from '../constants/keyboards.js';
import * as materialService from '../services/materialService.js';
import * as testService from '../services/testService.js';
import * as presentationService from '../services/presentationService.js';
import * as lessonService from '../services/lessonService.js';
import * as scenarioService from '../services/scenarioService.js';
import * as psychologyService from '../services/psychologyService.js';
import { splitTextIntoMessages } from '../utils/messageUtils.js';

export async function handleMessage(context) {
    let userState = userStates.get(context.senderId);
    console.log('Текущее состояние в обработчике сообщений:', JSON.stringify(userState, null, 2));

    const message = context.message;

    try {
        // Обработка команд из payload
        if (message.payload) {
            const payload = JSON.parse(message.payload);
            console.log('Получен payload:', JSON.stringify(payload, null, 2));

            switch (payload.command) {
                case 'materials':
                    console.log('Обработка команды materials');
                    const newState = {
                        action: 'in_materials',
                        materialSettings: {
                            type: 'все типы',
                            language: 'русский',
                            age: '7-18'
                        }
                    };
                    console.log('Устанавливаем новое состояние:', JSON.stringify(newState, null, 2));
                    userStates.set(context.senderId, newState);
                    await context.send({
                        message: 'Раздел материалов. Выберите действие:',
                        keyboard: MATERIALS_MENU
                    });
                    return true;

                case 'material_recommendations':
                    console.log('Обработка команды material_recommendations');
                    const updatedState = {
                        action: 'waiting_material_topic',
                        materialSettings: {
                            type: 'все типы',
                            language: 'русский',
                            age: '7-18'
                        }
                    };
                    console.log('Устанавливаем состояние для рекомендаций:', JSON.stringify(updatedState, null, 2));
                    userStates.set(context.senderId, updatedState);
                    await context.send({
                        message: 'Введите тему, по которой хотите получить методические рекомендации:'
                    });
                    return true;

                case 'describe_situation':
                    console.log('Обработка команды describe_situation');
                    userStates.set(context.senderId, {
                        action: 'waiting_for_psychology_situation',
                        psychologySettings: {
                            type: 'консультация'
                        }
                    });
                    await context.send({
                        message: 'Опишите ситуацию, которая вас беспокоит. Постарайтесь указать все важные детали, чтобы я мог дать наиболее точные рекомендации:'
                    });
                    return true;

                case 'slide_ideas':
                    console.log('Обработка команды slide_ideas');
                    userStates.set(context.senderId, {
                        action: 'waiting_slide_ideas_topic',
                        presentationSettings: {
                            age: '7-18'
                        }
                    });
                    await context.send({
                        message: 'Введите тему, для которой нужны идеи слайдов:'
                    });
                    return true;

                case 'check_homework':
                    console.log('Обработка команды check_homework');
                    userStates.set(context.senderId, {
                        action: 'waiting_homework_text',
                        homeworkSettings: {
                            type: 'проверка_дз',
                            age: '7-18',
                            duration: '5-10',
                            level: 'средний'
                        }
                    });
                    await context.send({
                        message: 'Введите текст домашнего задания для проверки:'
                    });
                    return true;

                case 'menu':
                    console.log('Обработка команды menu');
                    userStates.delete(context.senderId);
                    await context.send({
                        message: 'Главное меню:',
                        keyboard: MAIN_MENU
                    });
                    return true;

                default:
                    console.log('Получена неизвестная команда:', payload.command);
                    await context.send({
                        message: 'Неизвестная команда',
                        keyboard: MAIN_MENU
                    });
                    return true;
            }
        }

        // Проверяем состояние пользователя для обработки текстовых сообщений
        if (!userState) {
            console.log('Состояние пользователя не найдено при обработке текста');
            return false;
        }

        // Обработка ввода темы для различных разделов
        switch (userState.action) {
            case 'waiting_material_topic':
                return await handleMaterialTopic(context, message.text, userState);

            case 'waiting_test_topic':
                return await handleTestTopic(context, message.text, userState);

            case 'waiting_presentation_topic':
                return await handlePresentationTopic(context, message.text, userState);

            case 'waiting_lesson_topic':
                return await handleLessonTopic(context, message.text, userState);

            case 'waiting_thematic_topic':
                return await handleThematicEventTopic(context, message.text, userState);

            case 'waiting_extracurricular_topic':
                return await handleExtracurricularEventTopic(context, message.text, userState);

            case 'waiting_educational_topic':
                return await handleEducationalProjectTopic(context, message.text, userState);

            case 'waiting_homework_text':
                return await handleHomeworkCheck(context, message.text, userState);

            case 'waiting_slide_ideas_topic':
                return await handleSlideIdeas(context, message.text, userState);

            case 'waiting_for_psychology_situation':
                return await handlePsychologySituation(context, message.text, userState);

            default:
                return false;
        }

    } catch (error) {
        console.error('Error in message handler:', error);
        await context.send({
            message: 'Произошла ошибка при обработке сообщения. Пожалуйста, попробуйте еще раз.',
            keyboard: MAIN_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

// Обработчики для разных типов тем
async function handleMaterialTopic(context, topic, userState) {
    try {
        const settings = userState.materialSettings;
        if (!settings) {
            throw new Error('Настройки материалов не найдены');
        }

        await context.send({
            message: `Ищу материалы по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const recommendations = await materialService.getRecommendations(topic, settings);
        const parts = splitTextIntoMessages(recommendations);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: MATERIALS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleMaterialTopic:', error);
        await context.send({
            message: 'Произошла ошибка при поиске материалов. Пожалуйста, попробуйте еще раз.',
            keyboard: MATERIALS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handleTestTopic(context, topic, userState) {
    try {
        const settings = userState.testSettings;
        if (!settings) {
            throw new Error('Настройки теста не найдены');
        }

        await context.send({
            message: `Создаю тест по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const test = await testService.generateTest(topic, settings);
        const parts = splitTextIntoMessages(test);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: TESTS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleTestTopic:', error);
        await context.send({
            message: 'Произошла ошибка при создании теста. Пожалуйста, попробуйте еще раз.',
            keyboard: TESTS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handlePresentationTopic(context, topic, userState) {
    try {
        const settings = userState.presentationSettings;
        if (!settings) {
            throw new Error('Настройки презентации не найдены');
        }

        await context.send({
            message: `Создаю структуру презентации по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const presentation = await presentationService.generatePresentationStructure(topic, settings);
        const parts = splitTextIntoMessages(presentation);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: PRESENTATIONS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handlePresentationTopic:', error);
        await context.send({
            message: 'Произошла ошибка при создании презентации. Пожалуйста, попробуйте еще раз.',
            keyboard: PRESENTATIONS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handleLessonTopic(context, topic, userState) {
    try {
        const settings = userState.lessonSettings;
        if (!settings) {
            throw new Error('Настройки урока не найдены');
        }

        await context.send({
            message: `Создаю план урока по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const lesson = await lessonService.generateLessonPlan(topic, settings);
        const parts = splitTextIntoMessages(lesson);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: LESSONS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleLessonTopic:', error);
        await context.send({
            message: 'Произошла ошибка при создании плана урока. Пожалуйста, попробуйте еще раз.',
            keyboard: LESSONS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

// Добавляем новые обработчики для сценариев
async function handleThematicEventTopic(context, topic, userState) {
    try {
        const settings = userState.eventSettings;
        if (!settings) {
            throw new Error('Настройки мероприятия не найдены');
        }

        await context.send({
            message: `Создаю сценарий тематического мероприятия по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const scenario = await scenarioService.generateThematicEvent(topic, settings);
        const parts = splitTextIntoMessages(scenario);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: SCENARIOS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleThematicEventTopic:', error);
        await context.send({
            message: 'Произошла ошибка при создании сценария мероприятия. Пожалуйста, попробуйте еще раз.',
            keyboard: SCENARIOS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handleExtracurricularEventTopic(context, topic, userState) {
    try {
        const settings = userState.eventSettings;
        if (!settings) {
            throw new Error('Настройки мероприятия не найдены');
        }

        await context.send({
            message: `Создаю сценарий внеурочного мероприятия по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const scenario = await scenarioService.generateExtracurricularEvent(topic, settings);
        const parts = splitTextIntoMessages(scenario);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: SCENARIOS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleExtracurricularEventTopic:', error);
        await context.send({
            message: 'Произошла ошибка при создании сценария мероприятия. Пожалуйста, попробуйте еще раз.',
            keyboard: SCENARIOS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handleEducationalProjectTopic(context, topic, userState) {
    try {
        const settings = userState.eventSettings;
        if (!settings) {
            throw new Error('Настройки проекта не найдены');
        }

        await context.send({
            message: `Создаю сценарий образовательного проекта по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const scenario = await scenarioService.generateEducationalProject(topic, settings);
        const parts = splitTextIntoMessages(scenario);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: SCENARIOS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleEducationalProjectTopic:', error);
        await context.send({
            message: 'Произошла ошибка при создании сценария проекта. Пожалуйста, попробуйте еще раз.',
            keyboard: SCENARIOS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handleHomeworkCheck(context, homework, userState) {
    try {
        const settings = userState.homeworkSettings;
        if (!settings) {
            throw new Error('Настройки проверки домашнего задания не найдены');
        }

        await context.send({
            message: 'Проверяю домашнее задание...\nЭто может занять некоторое время. Пожалуйста, подождите.'
        });

        const result = await lessonService.checkHomework(homework, settings);
        const parts = splitTextIntoMessages(result);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: LESSONS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleHomeworkCheck:', error);
        await context.send({
            message: 'Произошла ошибка при проверке домашнего задания. Пожалуйста, попробуйте еще раз.',
            keyboard: LESSONS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handleSlideIdeas(context, topic, userState) {
    try {
        const settings = userState.presentationSettings;
        if (!settings) {
            throw new Error('Настройки презентации не найдены');
        }

        await context.send({
            message: `Генерирую идеи для слайдов по теме "${topic}"...\nЭто может занять некоторое время. Пожалуйста, подождите.`
        });

        const ideas = await presentationService.generateSlideIdeas(topic, settings);
        const parts = splitTextIntoMessages(ideas);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: PRESENTATIONS_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handleSlideIdeas:', error);
        await context.send({
            message: 'Произошла ошибка при генерации идей для слайдов. Пожалуйста, попробуйте еще раз.',
            keyboard: PRESENTATIONS_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}

async function handlePsychologySituation(context, situation, userState) {
    try {
        await context.send({
            message: 'Анализирую ситуацию...\nЭто может занять некоторое время. Пожалуйста, подождите.'
        });

        const advice = await psychologyService.generatePsychologyAdvice(situation, context.events);
        const parts = splitTextIntoMessages(advice);

        for (let i = 0; i < parts.length - 1; i++) {
            await context.send({ message: parts[i] });
        }

        await context.send({
            message: parts[parts.length - 1],
            keyboard: PSYCHOLOGY_MENU
        });

        userStates.delete(context.senderId);
        return true;
    } catch (error) {
        console.error('Error in handlePsychologySituation:', error);
        await context.send({
            message: 'Произошла ошибка при анализе ситуации. Пожалуйста, попробуйте еще раз.',
            keyboard: PSYCHOLOGY_MENU
        });
        userStates.delete(context.senderId);
        return true;
    }
}