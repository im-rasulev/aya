import { Keyboard } from 'vk-io';
import {
    MAIN_MENU,
    TESTS_MENU,
    PRESENTATIONS_MENU,
    LESSONS_MENU,
    MATERIALS_MENU,
    SCENARIOS_MENU,
    PSYCHOLOGY_MENU,
    createTestMenu,
    createQuestionsCountMenu,
    createDifficultyMenu,
    createAgeMenu,
    createTestTypeMenu,
    createLessonMenu,
    createLessonDurationMenu,
    createLessonTypeMenu,
    createLessonFormatMenu,
    createPresentationMenu,
    createPresentationDurationMenu,
    createSlidesCountMenu,
    createPresentationStyleMenu,
    createMaterialMenu,
    createMaterialTypeMenu,
    createMaterialLanguageMenu,
    createEventMenu,
    createEventDurationMenu,
    createParticipantsCountMenu,
    createEventAgeMenu,
    RELAXATION_MENU,
    createHomeworkCheckMenu,
    createHomeworkLevelMenu,
    createHomeworkCheckTypeMenu,
    createHomeworkGradeTypeMenu
} from '../constants/keyboards.js';

import { translateTestType } from '../services/testService.js';
import * as testService from '../services/testService.js';
import * as psychologyService from '../services/psychologyService.js';
import * as presentationService from '../services/presentationService.js';
import { userStates } from '../store/userStates.js';
import * as lessonService from '../services/lessonService.js';
import * as materialService from '../services/materialService.js';
import * as scenarioService from '../services/scenarioService.js';
import { sendLongMessage } from '../utils/messageUtils.js';

// Функция для создания клавиатуры с кнопкой "Назад"
function createBackKeyboard(targetCommand) {
    return Keyboard.builder()
        .textButton({
            label: '◀️ Назад',
            payload: { command: targetCommand },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

export async function handleCommand(context) {
    const command = context.messagePayload?.command;

    // Проверка на неверный формат команды
    if (context.messagePayload && !command) {
        await context.send({
            message: 'Неверный формат команды',
            keyboard: MAIN_MENU
        });
        return true;
    }

    if (!command) return false;

    try {
        switch (command) {
            // Обработка ошибочных команд
            case 'create_test_without_settings':
            case 'create_lesson_without_settings':
            case 'create_presentation_without_settings':
            case 'search_materials_without_settings':
                await context.send({
                    message: 'Пожалуйста, сначала выберите настройки',
                    keyboard: MAIN_MENU
                });
                break;

            case 'continue_test':
                const testState = userStates.get(context.senderId);
                if (!testState?.testSettings ||
                    !testState.testSettings.difficulty ||
                    !testState.testSettings.age ||
                    !testState.testSettings.questionsCount) {
                    await context.send({
                        message: 'Пожалуйста, заполните все настройки теста',
                        keyboard: createTestMenu(testState?.testSettings || {})
                    });
                }
                break;

            case 'continue_lesson':
                const lessonStateCheck = userStates.get(context.senderId);
                if (!lessonStateCheck?.lessonSettings ||
                    !lessonStateCheck.lessonSettings.format ||
                    !lessonStateCheck.lessonSettings.type ||
                    !lessonStateCheck.lessonSettings.duration) {
                    await context.send({
                        message: 'Пожалуйста, заполните все настройки урока',
                        keyboard: createLessonMenu(lessonStateCheck?.lessonSettings || {})
                    });
                }
                break;

            case 'continue_presentation':
                const presentationStateCheck = userStates.get(context.senderId);
                if (!presentationStateCheck?.presentationSettings ||
                    !presentationStateCheck.presentationSettings.duration ||
                    !presentationStateCheck.presentationSettings.style) {
                    await context.send({
                        message: 'Пожалуйста, заполните все настройки презентации',
                        keyboard: createPresentationMenu(presentationStateCheck?.presentationSettings || {})
                    });
                }
                break;

            case 'continue_material_search':
                const materialStateCheck = userStates.get(context.senderId);
                if (!materialStateCheck?.materialSettings ||
                    !materialStateCheck.materialSettings.type ||
                    !materialStateCheck.materialSettings.language) {
                    await context.send({
                        message: 'Пожалуйста, заполните все настройки поиска материалов',
                        keyboard: createMaterialMenu(materialStateCheck?.materialSettings || {})
                    });
                }
                break;

            case 'unknown_command':
                await context.send({
                    message: 'Неизвестная команда',
                    keyboard: MAIN_MENU
                });
                break;

            // Существующие команды...
            case 'menu':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Главное меню. Выберите раздел:',
                    keyboard: MAIN_MENU
                });
                break;

            // Тесты
            case 'tests':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Раздел тестов. Что бы вы хотели сделать?',
                    keyboard: TESTS_MENU
                });
                break;

            case 'create_test':
                userStates.set(context.senderId, {
                    action: 'create_test',
                    testSettings: {
                        questionsCount: 5,
                        difficulty: 'легкий',
                        age: '7-9',
                        testType: 'multiple_choice'
                    }
                });
                await context.send({
                    message: 'Настройка параметров теста. Выберите параметры или нажмите "Продолжить" с настройками по умолчанию:',
                    keyboard: createTestMenu({
                        questionsCount: 5,
                        difficulty: 'легкий',
                        age: '7-9',
                        testType: 'multiple_choice'
                    })
                });
                break;

            case 'create_test_menu':
                const currentSettings = userStates.get(context.senderId)?.testSettings;
                if (!currentSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание теста заново.',
                        keyboard: TESTS_MENU
                    });
                    break;
                }
                await context.send({
                    message: 'Настройка параметров теста. Выберите параметры или нажмите "Продолжить":',
                    keyboard: createTestMenu(currentSettings)
                });
                break;

            case 'create_presentation_menu':
                const currentPresentationSettings = userStates.get(context.senderId)?.presentationSettings;
                if (!currentPresentationSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание презентации заново.',
                        keyboard: PRESENTATIONS_MENU
                    });
                    break;
                }
                await context.send({
                    message: 'Настройка параметров презентации. Выберите параметры или нажмите "Продолжить":',
                    keyboard: createPresentationMenu(currentPresentationSettings)
                });
                break;

            case 'select_questions_count':
                const currentCount = userStates.get(context.senderId)?.testSettings?.questionsCount || 5;
                await context.send({
                    message: 'Выберите количество вопросов для теста:',
                    keyboard: createQuestionsCountMenu(currentCount)
                });
                break;

            case 'select_difficulty':
                const currentDifficulty = userStates.get(context.senderId)?.testSettings?.difficulty || 'легкий';
                await context.send({
                    message: 'Выберите сложность теста:',
                    keyboard: createDifficultyMenu(currentDifficulty)
                });
                break;

            case 'select_age':
                const currentAge = userStates.get(context.senderId)?.testSettings?.age || '7-9';
                const currentAction = userStates.get(context.senderId)?.action || 'create_test';
                await context.send({
                    message: 'Выберите возрастную категорию:',
                    keyboard: createAgeMenu(currentAge, currentAction)
                });
                break;

            case 'set_questions_count':
                const count = context.messagePayload.count;
                let userState = userStates.get(context.senderId);
                console.log('До обновления количества вопросов:', userState);
                if (!userState || !userState.testSettings) {
                    userState = {
                        action: 'create_test',
                        testSettings: {
                            questionsCount: count,
                            difficulty: 'легкий',
                            age: '7-9'
                        }
                    };
                } else {
                    userState.testSettings.questionsCount = count;
                }
                userStates.set(context.senderId, userState);
                console.log('После обновления количества вопросов:', userStates.get(context.senderId));
                await context.send({
                    message: `Количество вопросов установлено: ${count}`,
                    keyboard: createTestMenu(userState.testSettings)
                });
                break;

            case 'set_difficulty':
                const difficulty = context.messagePayload.difficulty;
                let userState2 = userStates.get(context.senderId);
                console.log('До обновления сложности:', userState2);
                if (!userState2 || !userState2.testSettings) {
                    userState2 = {
                        action: 'create_test',
                        testSettings: {
                            questionsCount: 5,
                            difficulty: difficulty,
                            age: '7-9'
                        }
                    };
                } else {
                    userState2.testSettings.difficulty = difficulty;
                }
                userStates.set(context.senderId, userState2);
                console.log('После обновления сложности:', userStates.get(context.senderId));
                await context.send({
                    message: `Сложность установлена: ${difficulty}`,
                    keyboard: createTestMenu(userState2.testSettings)
                });
                break;

            case 'set_age':
                const age = context.messagePayload.age;
                let userState3 = userStates.get(context.senderId);
                console.log('До обновления возраста:', userState3);

                // Определяем тип действия из текущего состояния или из payload
                const actionType = userState3?.action || context.messagePayload.actionType || 'create_test';
                console.log('Action type:', actionType);

                if (!userState3) {
                    userState3 = { action: actionType };
                }

                // Обновляем соответствующие настройки в зависимости от типа действия
                if (actionType === 'create_test' && (!userState3.testSettings)) {
                    userState3.testSettings = {
                        questionsCount: 5,
                        difficulty: 'легкий',
                        age: age
                    };
                } else if (actionType === 'create_lesson' && (!userState3.lessonSettings)) {
                    userState3.lessonSettings = {
                        duration: '45',
                        type: 'теория',
                        format: 'очный',
                        age: age
                    };
                } else if (actionType === 'search_materials' && (!userState3.materialSettings)) {
                    userState3.materialSettings = {
                        type: 'учебники',
                        language: 'русский',
                        age: age
                    };
                } else if (actionType === 'create_presentation' && (!userState3.presentationSettings)) {
                    userState3.presentationSettings = {
                        duration: 20,
                        slidesCount: 10,
                        style: 'академический',
                        age: age
                    };
                }

                // Обновляем возраст в существующих настройках
                if (actionType === 'create_test' && userState3.testSettings) {
                    userState3.testSettings.age = age;
                } else if (actionType === 'create_lesson' && userState3.lessonSettings) {
                    userState3.lessonSettings.age = age;
                } else if (actionType === 'search_materials' && userState3.materialSettings) {
                    userState3.materialSettings.age = age;
                } else if (actionType === 'create_presentation' && userState3.presentationSettings) {
                    userState3.presentationSettings.age = age;
                }

                userStates.set(context.senderId, userState3);
                console.log('После обновления возраста:', userStates.get(context.senderId));

                // Отправляем соответствующую клавиатуру
                let keyboard;
                if (actionType === 'create_test') {
                    keyboard = createTestMenu(userState3.testSettings);
                } else if (actionType === 'create_lesson') {
                    keyboard = createLessonMenu(userState3.lessonSettings);
                } else if (actionType === 'search_materials') {
                    keyboard = createMaterialMenu(userState3.materialSettings);
                } else if (actionType === 'create_presentation') {
                    keyboard = createPresentationMenu(userState3.presentationSettings);
                }

                await context.send({
                    message: `Возрастная категория установлена: ${age} лет`,
                    keyboard: keyboard
                });
                break;

            case 'confirm_test_settings':
                const finalState = userStates.get(context.senderId);
                if (!finalState || !finalState.testSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание теста заново.',
                        keyboard: TESTS_MENU
                    });
                    break;
                }
                const newState = {
                    action: 'waiting_test_topic',
                    testSettings: {
                        questionsCount: finalState.testSettings.questionsCount,
                        difficulty: finalState.testSettings.difficulty,
                        age: finalState.testSettings.age,
                        testType: finalState.testSettings.testType || 'multiple_choice'
                    }
                };
                userStates.set(context.senderId, newState);
                await context.send({
                    message: 'Пожалуйста, введите тему теста:',
                    keyboard: createBackKeyboard('tests')
                });
                break;

            case 'confirm_presentation_settings':
                const finalPresentationState = userStates.get(context.senderId);
                if (!finalPresentationState || !finalPresentationState.presentationSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание презентации заново.',
                        keyboard: PRESENTATIONS_MENU
                    });
                    break;
                }
                const newPresentationState = {
                    action: 'waiting_presentation_topic',
                    presentationSettings: {
                        duration: finalPresentationState.presentationSettings.duration,
                        slidesCount: finalPresentationState.presentationSettings.slidesCount,
                        style: finalPresentationState.presentationSettings.style,
                        age: finalPresentationState.presentationSettings.age
                    }
                };
                userStates.set(context.senderId, newPresentationState);
                await context.send({
                    message: 'Пожалуйста, введите тему презентации:',
                    keyboard: createBackKeyboard('presentations')
                });
                break;

            case 'test_types':
                const testTypes = await testService.getTestTypes();
                await context.send({
                    message: testTypes,
                    keyboard: TESTS_MENU
                });
                break;

            // Презентации
            case 'presentations':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Раздел презентаций. Что бы вы хотели сделать?',
                    keyboard: PRESENTATIONS_MENU
                });
                break;

            case 'slide_ideas':
                userStates.set(context.senderId, {
                    action: 'waiting_slide_ideas_topic'
                });
                await context.send({
                    message: 'Пожалуйста, введите тему для генерации идей слайдов:',
                    keyboard: createBackKeyboard('presentations')
                });
                break;

            case 'create_presentation':
                userStates.set(context.senderId, {
                    action: 'create_presentation',
                    presentationSettings: {
                        duration: 20,
                        slidesCount: 10,
                        style: 'академический',
                        age: '7-9'
                    }
                });
                await context.send({
                    message: 'Настройка параметров презентации. Выберите параметры или нажмите "Продолжить" с настройками по умолчанию:',
                    keyboard: createPresentationMenu({
                        duration: 20,
                        slidesCount: 10,
                        style: 'академический',
                        age: '7-9'
                    })
                });
                break;

            case 'back_to_presentation_settings':
                const currentPresentationState = userStates.get(context.senderId);
                if (!currentPresentationState?.presentationSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание презентации заново.',
                        keyboard: PRESENTATIONS_MENU
                    });
                    break;
                }
                await context.send({
                    message: 'Вернемся к настройкам презентации:',
                    keyboard: createPresentationMenu(currentPresentationState.presentationSettings)
                });
                break;

            case 'select_presentation_duration':
                const presentationDuration = userStates.get(context.senderId)?.presentationSettings?.duration || 20;
                await context.send({
                    message: 'Выберите длительность презентации (в минутах):',
                    keyboard: createPresentationDurationMenu(presentationDuration)
                });
                break;

            case 'select_slides_count':
                const currentSlides = userStates.get(context.senderId)?.presentationSettings?.slidesCount || 10;
                await context.send({
                    message: 'Выберите количество слайдов:',
                    keyboard: createSlidesCountMenu(currentSlides)
                });
                break;

            case 'select_presentation_style':
                const currentStyle = userStates.get(context.senderId)?.presentationSettings?.style || 'академический';
                await context.send({
                    message: 'Выберите стиль презентации:',
                    keyboard: createPresentationStyleMenu(currentStyle)
                });
                break;

            case 'select_presentation_age':
                const currentPresentationAge = userStates.get(context.senderId)?.presentationSettings?.age || '7-9';
                await context.send({
                    message: 'Выберите возрастную группу:',
                    keyboard: createAgeMenu(currentPresentationAge, 'create_presentation')
                });
                break;

            case 'set_presentation_duration':
                const newDuration = context.messagePayload.duration;
                let presentationState = userStates.get(context.senderId);
                if (presentationState && presentationState.presentationSettings) {
                    presentationState.presentationSettings.duration = newDuration;
                    userStates.set(context.senderId, presentationState);
                }
                await context.send({
                    message: `Длительность презентации установлена: ${newDuration} минут`,
                    keyboard: createPresentationMenu(presentationState?.presentationSettings || {})
                });
                break;

            case 'set_slides_count':
                const slides = context.messagePayload.count;
                let presentationState2 = userStates.get(context.senderId);
                if (presentationState2 && presentationState2.presentationSettings) {
                    presentationState2.presentationSettings.slidesCount = slides;
                    userStates.set(context.senderId, presentationState2);
                }
                await context.send({
                    message: `Количество слайдов установлено: ${slides}`,
                    keyboard: createPresentationMenu(presentationState2?.presentationSettings || {})
                });
                break;

            case 'set_presentation_age':
                const presentationAge = context.messagePayload.age;
                let presentationAgeState = userStates.get(context.senderId);
                if (!presentationAgeState || !presentationAgeState.presentationSettings) {
                    presentationAgeState = {
                        action: 'create_presentation',
                        presentationSettings: {
                            duration: 20,
                            slidesCount: 10,
                            style: 'академический',
                            age: presentationAge
                        }
                    };
                } else {
                    presentationAgeState.presentationSettings.age = presentationAge;
                }
                userStates.set(context.senderId, presentationAgeState);
                await context.send({
                    message: `Возрастная группа установлена: ${presentationAge} лет`,
                    keyboard: createPresentationMenu(presentationAgeState.presentationSettings)
                });
                break;

            case 'set_presentation_style':
                const style = context.messagePayload.style;
                let presentationState3 = userStates.get(context.senderId);
                if (presentationState3 && presentationState3.presentationSettings) {
                    presentationState3.presentationSettings.style = style;
                    userStates.set(context.senderId, presentationState3);
                }
                await context.send({
                    message: `Стиль презентации установлен: ${style}`,
                    keyboard: createPresentationMenu(presentationState3?.presentationSettings || {})
                });
                break;

            // Уроки
            case 'lessons':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Раздел уроков. Выберите действие:',
                    keyboard: LESSONS_MENU
                });
                break;

            case 'create_lesson':
                userStates.set(context.senderId, {
                    action: 'create_lesson',
                    lessonSettings: {
                        duration: '45',
                        type: 'теория',
                        format: 'очный',
                        age: '7-9'
                    }
                });
                await context.send({
                    message: 'Настройка параметров урока. Выберите параметры или нажмите "Продолжить" с настройками по умолчанию:',
                    keyboard: createLessonMenu({
                        duration: '45',
                        type: 'теория',
                        format: 'очный',
                        age: '7-9'
                    })
                });
                break;

            case 'create_lesson_menu':
                const currentLessonSettings = userStates.get(context.senderId)?.lessonSettings;
                if (!currentLessonSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание урока заново.',
                        keyboard: LESSONS_MENU
                    });
                    break;
                }
                await context.send({
                    message: 'Настройка параметров урока. Выберите параметры или нажмите "Продолжить":',
                    keyboard: createLessonMenu(currentLessonSettings)
                });
                break;

            case 'select_lesson_duration':
                const currentDuration = userStates.get(context.senderId)?.lessonSettings?.duration || '45';
                await context.send({
                    message: 'Выберите длительность урока:',
                    keyboard: createLessonDurationMenu(currentDuration)
                });
                break;

            case 'select_lesson_type':
                const currentLessonType = userStates.get(context.senderId)?.lessonSettings?.type || 'теория';
                await context.send({
                    message: 'Выберите тип урока:',
                    keyboard: createLessonTypeMenu(currentLessonType)
                });
                break;

            case 'select_lesson_format':
                const currentFormat = userStates.get(context.senderId)?.lessonSettings?.format || 'очный';
                await context.send({
                    message: 'Выберите формат урока:',
                    keyboard: createLessonFormatMenu(currentFormat)
                });
                break;

            case 'set_lesson_duration':
                const duration = context.messagePayload.duration;
                let lessonState = userStates.get(context.senderId);
                if (!lessonState || !lessonState.lessonSettings) {
                    lessonState = {
                        action: 'create_lesson',
                        lessonSettings: {
                            duration: duration,
                            type: 'теория',
                            format: 'очный',
                            age: '7-9'
                        }
                    };
                } else {
                    lessonState.lessonSettings.duration = duration;
                }
                userStates.set(context.senderId, lessonState);
                await context.send({
                    message: `Длительность урока установлена: ${duration} минут`,
                    keyboard: createLessonMenu(lessonState.lessonSettings)
                });
                break;

            case 'set_lesson_type':
                const lessonType = context.messagePayload.type;
                let lessonState2 = userStates.get(context.senderId);
                if (!lessonState2 || !lessonState2.lessonSettings) {
                    lessonState2 = {
                        action: 'create_lesson',
                        lessonSettings: {
                            duration: '45',
                            type: lessonType,
                            format: 'очный',
                            age: '7-9'
                        }
                    };
                } else {
                    lessonState2.lessonSettings.type = lessonType;
                }
                userStates.set(context.senderId, lessonState2);
                await context.send({
                    message: `Тип урока установлен: ${lessonType}`,
                    keyboard: createLessonMenu(lessonState2.lessonSettings)
                });
                break;

            case 'set_lesson_format':
                const format = context.messagePayload.format;
                let lessonState3 = userStates.get(context.senderId);
                if (!lessonState3 || !lessonState3.lessonSettings) {
                    lessonState3 = {
                        action: 'create_lesson',
                        lessonSettings: {
                            duration: '45',
                            type: 'теория',
                            format: format,
                            age: '7-9'
                        }
                    };
                } else {
                    lessonState3.lessonSettings.format = format;
                }
                userStates.set(context.senderId, lessonState3);
                await context.send({
                    message: `Формат урока установлен: ${format}`,
                    keyboard: createLessonMenu(lessonState3.lessonSettings)
                });
                break;

            case 'confirm_lesson_settings':
                const finalLessonState = userStates.get(context.senderId);
                if (!finalLessonState || !finalLessonState.lessonSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание урока заново.',
                        keyboard: LESSONS_MENU
                    });
                    break;
                }
                const newLessonState = {
                    action: 'waiting_lesson_topic',
                    lessonSettings: {
                        duration: finalLessonState.lessonSettings.duration,
                        type: finalLessonState.lessonSettings.type,
                        format: finalLessonState.lessonSettings.format,
                        age: finalLessonState.lessonSettings.age
                    }
                };
                userStates.set(context.senderId, newLessonState);
                await context.send({
                    message: 'Пожалуйста, введите тему урока:',
                    keyboard: createBackKeyboard('lessons')
                });
                break;

            // Материалы
            case 'materials':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Раздел материалов. Что бы вы хотели найти?',
                    keyboard: MATERIALS_MENU
                });
                break;

            case 'search_materials':
                const initialMaterialState = {
                    action: 'search_materials',
                    materialSettings: {
                        type: 'учебники',
                        language: 'русский',
                        age: '7-9'
                    }
                };
                userStates.set(context.senderId, initialMaterialState);
                await context.send({
                    message: 'Настройка параметров поиска материалов. Выберите параметры или нажмите "Продолжить" с настройками по умолчанию:',
                    keyboard: createMaterialMenu(initialMaterialState.materialSettings)
                });
                break;

            case 'create_material_menu':
                const currentMaterialSettings = userStates.get(context.senderId)?.materialSettings;
                if (!currentMaterialSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните поиск материалов заново.',
                        keyboard: MATERIALS_MENU
                    });
                    break;
                }

                // Убедимся, что action установлен правильно
                const updatedMaterialState = {
                    action: 'search_materials',
                    materialSettings: currentMaterialSettings
                };
                userStates.set(context.senderId, updatedMaterialState);

                await context.send({
                    message: 'Настройка параметров поиска материалов. Выберите параметры или нажмите "Продолжить":',
                    keyboard: createMaterialMenu(currentMaterialSettings)
                });
                break;

            case 'select_material_type':
                const currentMaterialType = userStates.get(context.senderId)?.materialSettings?.type || 'учебники';
                await context.send({
                    message: 'Выберите тип материалов:',
                    keyboard: createMaterialTypeMenu(currentMaterialType)
                });
                break;

            case 'select_material_language':
                const currentMaterialLanguage = userStates.get(context.senderId)?.materialSettings?.language || 'русский';
                await context.send({
                    message: 'Выберите язык материалов:',
                    keyboard: createMaterialLanguageMenu(currentMaterialLanguage)
                });
                break;

            case 'set_material_type':
                const materialType = context.messagePayload.type;
                let materialState = userStates.get(context.senderId);
                if (!materialState || !materialState.materialSettings) {
                    materialState = {
                        action: 'search_materials',
                        materialSettings: {
                            type: materialType,
                            language: 'русский',
                            age: '7-9'
                        }
                    };
                } else {
                    materialState.materialSettings.type = materialType;
                }
                userStates.set(context.senderId, materialState);
                await context.send({
                    message: `Тип материалов установлен: ${materialType}`,
                    keyboard: createMaterialMenu(materialState.materialSettings)
                });
                break;

            case 'set_material_language':
                const materialLanguage = context.messagePayload.language;
                let materialState2 = userStates.get(context.senderId);
                if (!materialState2 || !materialState2.materialSettings) {
                    materialState2 = {
                        action: 'search_materials',
                        materialSettings: {
                            type: 'учебники',
                            language: materialLanguage,
                            age: '7-9'
                        }
                    };
                } else {
                    materialState2.materialSettings.language = materialLanguage;
                }
                userStates.set(context.senderId, materialState2);
                await context.send({
                    message: `Язык материалов установлен: ${materialLanguage}`,
                    keyboard: createMaterialMenu(materialState2.materialSettings)
                });
                break;

            case 'confirm_material_settings':
                const finalMaterialState = userStates.get(context.senderId);
                if (!finalMaterialState || !finalMaterialState.materialSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните поиск материалов заново.',
                        keyboard: MATERIALS_MENU
                    });
                    break;
                }
                const newMaterialState = {
                    action: 'waiting_material_topic',
                    materialSettings: {
                        type: finalMaterialState.materialSettings.type,
                        language: finalMaterialState.materialSettings.language,
                        age: finalMaterialState.materialSettings.age
                    }
                };
                userStates.set(context.senderId, newMaterialState);
                await context.send({
                    message: 'Пожалуйста, введите тему для поиска материалов:',
                    keyboard: createBackKeyboard('materials')
                });
                break;

            // Сценарии
            case 'scenarios':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Раздел сценариев. Выберите тип мероприятия:',
                    keyboard: SCENARIOS_MENU
                });
                break;

            case 'thematic_events_settings':
                const thematicEventState = userStates.get(context.senderId);
                if (!thematicEventState) {
                    userStates.set(context.senderId, {
                        action: 'create_thematic_event',
                        eventSettings: {
                            duration: '30',
                            participantsCount: '10-15',
                            age: '7-9'
                        }
                    });
                }
                await context.send({
                    message: 'Настройка параметров тематического мероприятия:',
                    keyboard: createEventMenu(thematicEventState?.eventSettings || {
                        duration: '30',
                        participantsCount: '10-15',
                        age: '7-9'
                    }, 'thematic')
                });
                break;

            case 'extracurricular_events_settings':
                userStates.set(context.senderId, {
                    action: 'create_extracurricular_event',
                    eventType: 'extracurricular',
                    eventSettings: {
                        duration: 60,
                        participantsCount: '15-20',
                        age: '7-9'
                    }
                });
                await context.send({
                    message: 'Настройка параметров внеурочного мероприятия:',
                    keyboard: createEventMenu({
                        duration: 60,
                        participantsCount: '15-20',
                        age: '7-9'
                    }, 'extracurricular')
                });
                break;

            case 'educational_projects_settings':
                const currentEducationalSettings = userStates.get(context.senderId)?.eventSettings || {
                    duration: 60,
                    participantsCount: '15-20',
                    age: '7-9'
                };

                userStates.set(context.senderId, {
                    action: 'create_educational_project',
                    eventType: 'educational',
                    eventSettings: currentEducationalSettings
                });

                await context.send({
                    message: 'Настройка параметров образовательного проекта:',
                    keyboard: createEventMenu(currentEducationalSettings, 'educational')
                });
                break;

            case 'select_event_duration':
                const eventTypeForDuration = context.messagePayload.eventType;
                const currentEventDuration = userStates.get(context.senderId)?.eventSettings?.duration || 60;
                await context.send({
                    message: 'Выберите длительность мероприятия:',
                    keyboard: createEventDurationMenu(currentEventDuration, eventTypeForDuration)
                });
                break;

            case 'select_event_participants':
                const eventTypeForParticipants = context.messagePayload.eventType;
                const currentParticipants = userStates.get(context.senderId)?.eventSettings?.participantsCount || '15-20';
                await context.send({
                    message: 'Выберите количество участников:',
                    keyboard: createParticipantsCountMenu(currentParticipants, eventTypeForParticipants)
                });
                break;

            case 'set_event_duration':
                const eventDuration = context.messagePayload.duration;
                const eventTypeForDurationSet = context.messagePayload.eventType;
                let eventState = userStates.get(context.senderId);
                if (!eventState || !eventState.eventSettings) {
                    eventState = {
                        action: `create_${eventTypeForDurationSet}_event`,
                        eventType: eventTypeForDurationSet,
                        eventSettings: {
                            duration: eventDuration,
                            participantsCount: '15-20',
                            age: '7-9'
                        }
                    };
                } else {
                    eventState.eventSettings.duration = eventDuration;
                }
                userStates.set(context.senderId, eventState);
                await context.send({
                    message: `Длительность мероприятия установлена: ${eventDuration} минут`,
                    keyboard: createEventMenu(eventState.eventSettings, eventTypeForDurationSet)
                });
                break;

            case 'set_event_participants':
                const participants = context.messagePayload.count;
                const eventTypeForParticipantsSet = context.messagePayload.eventType;
                let participantsState = userStates.get(context.senderId);
                if (!participantsState || !participantsState.eventSettings) {
                    participantsState = {
                        action: `create_${eventTypeForParticipantsSet}_event`,
                        eventType: eventTypeForParticipantsSet,
                        eventSettings: {
                            duration: 60,
                            participantsCount: participants,
                            age: '7-9'
                        }
                    };
                } else {
                    participantsState.eventSettings.participantsCount = participants;
                }
                userStates.set(context.senderId, participantsState);
                await context.send({
                    message: `Количество участников установлено: ${participants}`,
                    keyboard: createEventMenu(participantsState.eventSettings, eventTypeForParticipantsSet)
                });
                break;

            // Психологическая поддержка
            case 'psychology':
                userStates.delete(context.senderId);
                await context.send({
                    message: 'Раздел психологической поддержки. Чем могу помочь?',
                    keyboard: PSYCHOLOGY_MENU
                });
                break;

            case 'relaxation_techniques':
                await context.send({
                    message: 'Выберите тип техники релаксации:',
                    keyboard: RELAXATION_MENU
                });
                break;

            case 'breathing_exercises':
                try {
                    await context.send({
                        message: 'Генерирую комплекс дыхательных упражнений...'
                    });
                    const breathingTechniques = await psychologyService.getRelaxationTechniques(context.events);
                    await sendLongMessage(context, breathingTechniques);
                    await context.send({
                        message: 'Выберите другую технику или вернитесь в основное меню:',
                        keyboard: RELAXATION_MENU
                    });
                } catch (error) {
                    console.error('Error in breathing_exercises:', error);
                    await context.send({
                        message: 'Произошла ошибка при получении дыхательных упражнений. Пожалуйста, попробуйте еще раз.',
                        keyboard: RELAXATION_MENU
                    });
                }
                break;

            case 'meditation_techniques':
                try {

                    const meditationTechniques = await psychologyService.getRelaxationTechniques(context.events);
                    await sendLongMessage(context, meditationTechniques);
                    await context.send({
                        message: 'Выберите другую технику или вернитесь в основное меню:',
                        keyboard: RELAXATION_MENU
                    });
                } catch (error) {
                    console.error('Error in meditation_techniques:', error);
                    await context.send({
                        message: 'Произошла ошибка при получении медитативных практик. Пожалуйста, попробуйте еще раз.',
                        keyboard: RELAXATION_MENU
                    });
                }
                break;

            case 'sound_practices':
                // Удаляем этот case, так как он больше не используется
                break;

            case 'daily_advice':
                try {
                    const advice = await psychologyService.getDailyAdvice(context.events);
                    await sendLongMessage(context, advice);
                    await context.send({
                        message: 'Надеюсь, этот совет будет полезен для вас сегодня.',
                        keyboard: PSYCHOLOGY_MENU
                    });
                } catch (error) {
                    console.error('Error in daily_advice:', error);
                    await context.send({
                        message: 'Произошла ошибка при получении совета дня. Пожалуйста, попробуйте еще раз.',
                        keyboard: PSYCHOLOGY_MENU
                    });
                }
                break;

            case 'describe_situation':
                userStates.set(context.senderId, {
                    action: 'waiting_for_psychology_situation'
                });
                await context.send({
                    message: 'Опишите ситуацию, которая вас беспокоит. Я постараюсь помочь вам разобраться и найти решение.',
                    keyboard: createBackKeyboard('psychology')
                });
                break;

            case 'get_recommendations':
                try {
                    const recommendations = await psychologyService.getPersonalizedRecommendations(context.events);
                    await sendLongMessage(context, recommendations);
                    await context.send({
                        message: 'Здесь собраны полезные материалы: книги, видео, подкасты и статьи. Выберите то, что вам интересно.',
                        keyboard: PSYCHOLOGY_MENU
                    });
                } catch (error) {
                    console.error('Error in get_recommendations:', error);
                    await context.send({
                        message: 'Произошла ошибка при получении рекомендаций. Пожалуйста, попробуйте еще раз.',
                        keyboard: PSYCHOLOGY_MENU
                    });
                }
                break;

            case 'burnout_prevention':
                try {
                    const burnoutAdvice = await psychologyService.getBurnoutPreventionAdvice(context.events);
                    await sendLongMessage(context, burnoutAdvice);
                    await context.send({
                        message: 'Следуйте этим рекомендациям для профилактики профессионального выгорания.',
                        keyboard: PSYCHOLOGY_MENU
                    });
                } catch (error) {
                    console.error('Error in burnout_prevention:', error);
                    await context.send({
                        message: 'Произошла ошибка при получении рекомендаций. Пожалуйста, попробуйте еще раз.',
                        keyboard: PSYCHOLOGY_MENU
                    });
                }
                break;

            case 'select_test_type':
                const userStateForType = userStates.get(context.senderId);
                const currentType = userStateForType?.testSettings?.testType || 'multiple_choice';
                await context.send({
                    message: 'Выберите тип теста:',
                    keyboard: createTestTypeMenu(currentType)
                });
                break;

            case 'set_test_type':
                const testType = context.messagePayload.type;
                let userState4 = userStates.get(context.senderId);
                console.log('До обновления типа теста:', userState4);
                if (!userState4 || !userState4.testSettings) {
                    userState4 = {
                        action: 'create_test',
                        testSettings: {
                            questionsCount: 5,
                            difficulty: 'легкий',
                            age: '7-9',
                            testType: testType
                        }
                    };
                } else {
                    userState4.testSettings.testType = testType;
                }
                userStates.set(context.senderId, userState4);
                console.log('После обновления типа теста:', userStates.get(context.senderId));
                await context.send({
                    message: `Тип теста установлен: ${translateTestType(testType)}`,
                    keyboard: createTestMenu(userState4.testSettings)
                });
                break;

            case 'extracurricular_events':
                userStates.set(context.senderId, {
                    action: 'create_extracurricular',
                    eventSettings: {
                        duration: 45,
                        participantsCount: '15-20',
                        age: '7-9',
                        eventType: 'extracurricular'
                    }
                });
                await context.send({
                    message: 'Настройка параметров внеурочного мероприятия. Выберите параметры или нажмите "Продолжить" с настройками по умолчанию:',
                    keyboard: createEventMenu({
                        duration: 45,
                        participantsCount: '15-20',
                        age: '7-9',
                        eventType: 'extracurricular'
                    }, 'extracurricular')
                });
                break;

            case 'educational_projects':
                userStates.set(context.senderId, {
                    action: 'create_educational_project',
                    eventSettings: {
                        duration: 60,
                        participantsCount: '15-20',
                        age: '7-9'
                    }
                });
                await context.send({
                    message: 'Настройка параметров образовательного проекта. Выберите параметры или нажмите "Продолжить" с настройками по умолчанию:',
                    keyboard: createEventMenu({
                        duration: 60,
                        participantsCount: '15-20',
                        age: '7-9'
                    }, 'educational_project')
                });
                break;

            case 'continue_extracurricular':
                const extracurricularState = userStates.get(context.senderId);
                if (!extracurricularState?.eventSettings ||
                    !extracurricularState.eventSettings.duration ||
                    !extracurricularState.eventSettings.participantsCount ||
                    !extracurricularState.eventSettings.age) {
                    await context.send({
                        message: 'Пожалуйста, заполните все настройки мероприятия',
                        keyboard: createEventMenu(extracurricularState?.eventSettings || {}, 'extracurricular')
                    });
                } else {
                    extracurricularState.action = 'waiting_extracurricular_topic';
                    userStates.set(context.senderId, extracurricularState);
                    await context.send({
                        message: 'Введите тему внеурочного мероприятия:',
                        keyboard: createBackKeyboard('scenarios')
                    });
                }
                break;

            case 'continue_educational_project':
                const projectState = userStates.get(context.senderId);
                if (!projectState?.eventSettings ||
                    !projectState.eventSettings.duration ||
                    !projectState.eventSettings.participantsCount ||
                    !projectState.eventSettings.age) {
                    await context.send({
                        message: 'Пожалуйста, заполните все настройки проекта',
                        keyboard: createEventMenu(projectState?.eventSettings || {}, 'educational_project')
                    });
                } else {
                    projectState.action = 'waiting_educational_project_topic';
                    userStates.set(context.senderId, projectState);
                    await context.send({
                        message: 'Введите тему образовательного проекта:',
                        keyboard: createBackKeyboard('scenarios')
                    });
                }
                break;

            case 'confirm_thematic_settings':
            case 'confirm_extracurricular_settings':
            case 'confirm_educational_settings':
                const scenarioEventState = userStates.get(context.senderId);
                if (!scenarioEventState || !scenarioEventState.eventSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните создание мероприятия заново.',
                        keyboard: SCENARIOS_MENU
                    });
                    break;
                }
                const newScenarioState = {
                    action: command === 'confirm_thematic_settings' ? 'waiting_thematic_topic' :
                        command === 'confirm_extracurricular_settings' ? 'waiting_extracurricular_topic' :
                            'waiting_educational_topic',
                    eventSettings: {
                        duration: scenarioEventState.eventSettings.duration,
                        participantsCount: scenarioEventState.eventSettings.participantsCount,
                        age: scenarioEventState.eventSettings.age
                    }
                };
                userStates.set(context.senderId, newScenarioState);
                await context.send({
                    message: `Пожалуйста, введите тему ${command === 'confirm_thematic_settings' ? 'тематического мероприятия' :
                        command === 'confirm_extracurricular_settings' ? 'внеурочного мероприятия' :
                            'образовательного проекта'}:`,
                    keyboard: createBackKeyboard('scenarios')
                });
                break;

            case 'select_event_age':
                const eventTypeForAge = context.messagePayload.eventType;
                const currentEventAge = userStates.get(context.senderId)?.eventSettings?.age || '7-9';
                await context.send({
                    message: 'Выберите возрастную группу:',
                    keyboard: createEventAgeMenu(currentEventAge, eventTypeForAge)
                });
                break;

            case 'set_event_age':
                const eventAge = context.messagePayload.age;
                const eventTypeForAgeSet = context.messagePayload.eventType;
                let ageState = userStates.get(context.senderId);
                if (!ageState || !ageState.eventSettings) {
                    ageState = {
                        action: `create_${eventTypeForAgeSet}_event`,
                        eventType: eventTypeForAgeSet,
                        eventSettings: {
                            duration: 60,
                            participantsCount: '15-20',
                            age: eventAge
                        }
                    };
                } else {
                    ageState.eventSettings.age = eventAge;
                }
                userStates.set(context.senderId, ageState);
                await context.send({
                    message: `Возрастная группа установлена: ${eventAge} лет`,
                    keyboard: createEventMenu(ageState.eventSettings, eventTypeForAgeSet)
                });
                break;

            case 'check_homework':
                userStates.set(context.senderId, {
                    action: 'check_homework',
                    homeworkSettings: {
                        level: 'базовый',
                        checkType: 'комплексный',
                        gradeType: 'балльное',
                        subject: 'общий'
                    }
                });
                await context.send({
                    message: 'Настройка параметров проверки домашнего задания:',
                    keyboard: createHomeworkCheckMenu({
                        level: 'базовый',
                        checkType: 'комплексный',
                        gradeType: 'балльное'
                    })
                });
                break;

            case 'select_homework_level':
                const currentLevel = userStates.get(context.senderId)?.homeworkSettings?.level || 'базовый';
                await context.send({
                    message: 'Выберите уровень подготовки:',
                    keyboard: createHomeworkLevelMenu(currentLevel)
                });
                break;

            case 'select_homework_check_type':
                const currentCheckType = userStates.get(context.senderId)?.homeworkSettings?.checkType || 'комплексный';
                await context.send({
                    message: 'Выберите тип проверки:',
                    keyboard: createHomeworkCheckTypeMenu(currentCheckType)
                });
                break;

            case 'select_homework_grade_type':
                const currentGradeType = userStates.get(context.senderId)?.homeworkSettings?.gradeType || 'балльное';
                await context.send({
                    message: 'Выберите тип оценивания:',
                    keyboard: createHomeworkGradeTypeMenu(currentGradeType)
                });
                break;

            case 'set_homework_level':
                const level = context.messagePayload.level;
                let homeworkState = userStates.get(context.senderId);
                if (!homeworkState || !homeworkState.homeworkSettings) {
                    homeworkState = {
                        action: 'check_homework',
                        homeworkSettings: {
                            level,
                            checkType: 'комплексный',
                            gradeType: 'балльное'
                        }
                    };
                } else {
                    homeworkState.homeworkSettings.level = level;
                }
                userStates.set(context.senderId, homeworkState);
                await context.send({
                    message: `Уровень подготовки установлен: ${level}`,
                    keyboard: createHomeworkCheckMenu(homeworkState.homeworkSettings)
                });
                break;

            case 'set_homework_check_type':
                const checkType = context.messagePayload.type;
                let homeworkState2 = userStates.get(context.senderId);
                if (!homeworkState2 || !homeworkState2.homeworkSettings) {
                    homeworkState2 = {
                        action: 'check_homework',
                        homeworkSettings: {
                            level: 'базовый',
                            checkType,
                            gradeType: 'балльное'
                        }
                    };
                } else {
                    homeworkState2.homeworkSettings.checkType = checkType;
                }
                userStates.set(context.senderId, homeworkState2);
                await context.send({
                    message: `Тип проверки установлен: ${checkType}`,
                    keyboard: createHomeworkCheckMenu(homeworkState2.homeworkSettings)
                });
                break;

            case 'set_homework_grade_type':
                const gradeType = context.messagePayload.type;
                let homeworkState3 = userStates.get(context.senderId);
                if (!homeworkState3 || !homeworkState3.homeworkSettings) {
                    homeworkState3 = {
                        action: 'check_homework',
                        homeworkSettings: {
                            level: 'базовый',
                            checkType: 'комплексный',
                            gradeType
                        }
                    };
                } else {
                    homeworkState3.homeworkSettings.gradeType = gradeType;
                }
                userStates.set(context.senderId, homeworkState3);
                await context.send({
                    message: `Тип оценивания установлен: ${gradeType}`,
                    keyboard: createHomeworkCheckMenu(homeworkState3.homeworkSettings)
                });
                break;

            case 'confirm_homework_settings':
                const finalHomeworkState = userStates.get(context.senderId);
                if (!finalHomeworkState || !finalHomeworkState.homeworkSettings) {
                    await context.send({
                        message: 'Произошла ошибка. Пожалуйста, начните проверку заново.',
                        keyboard: LESSONS_MENU
                    });
                    break;
                }
                userStates.set(context.senderId, {
                    ...finalHomeworkState,
                    action: 'waiting_homework_text'
                });
                await context.send({
                    message: 'Отправьте текст домашнего задания для проверки:',
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: '◀️ Отмена',
                            payload: { command: 'lessons' },
                            color: Keyboard.SECONDARY_COLOR
                        })
                        .oneTime()
                });
                break;

            default:
                await context.send({
                    message: 'Неизвестная команда',
                    keyboard: MAIN_MENU
                });
                break;
        }
        return true;
    } catch (error) {
        console.error('Error in command handler:', error);
        await context.send({
            message: 'Произошла ошибка при обработке команды. Пожалуйста, попробуйте еще раз.',
            keyboard: MAIN_MENU
        });
        return true;
    }
} 