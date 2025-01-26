import { Keyboard } from 'vk-io';

export const MAIN_MENU = Keyboard.builder()
    .textButton({
        label: '📝 Тесты',
        payload: { command: 'tests' }
    })
    .textButton({
        label: '📊 Презентации',
        payload: { command: 'presentations' }
    })
    .row()
    .textButton({
        label: '📚 Уроки',
        payload: { command: 'lessons' }
    })
    .textButton({
        label: '📖 Материалы',
        payload: { command: 'materials' }
    })
    .row()
    .textButton({
        label: '🎭 Сценарии',
        payload: { command: 'scenarios' }
    })
    .textButton({
        label: '🧘‍♀️ Психолог',
        payload: { command: 'psychology' }
    })
    .oneTime();

export const BACK_TO_MENU = Keyboard.builder()
    .textButton({
        label: '◀️ Назад в меню',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для раздела тестов
export const TESTS_MENU = Keyboard.builder()
    .textButton({
        label: 'Создать тест',
        payload: { command: 'create_test' }
    })
    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для раздела презентаций
export const PRESENTATIONS_MENU = Keyboard.builder()
    .textButton({
        label: '📊 Создать структуру',
        payload: { command: 'create_presentation' }
    })
    .row()
    .textButton({
        label: '💡 Идеи для слайдов',
        payload: { command: 'slide_ideas' }
    })
    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для раздела уроков
export const LESSONS_MENU = Keyboard.builder()
    .textButton({
        label: '📝 Создать план урока',
        payload: { command: 'create_lesson' }
    })
    .textButton({
        label: '✅ Проверить ДЗ',
        payload: { command: 'check_homework' }
    })
    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для раздела материалов
export const MATERIALS_MENU = Keyboard.builder()
    .textButton({
        label: '🔍 Поиск материалов',
        payload: { command: 'search_materials' }
    })
    .row()
    .textButton({
        label: '📚 Рекомендации',
        payload: { command: 'get_recommendations' }
    })
    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для раздела сценариев
export const SCENARIOS_MENU = Keyboard.builder()
    .textButton({
        label: 'Тематические мероприятия',
        payload: { command: 'thematic_events_settings' }
    })
    .row()
    .textButton({
        label: 'Внеурочные мероприятия',
        payload: { command: 'extracurricular_events_settings' }
    })
    .row()
    .textButton({
        label: 'Образовательные проекты',
        payload: { command: 'educational_projects_settings' }
    })
    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для раздела психологической поддержки
export const PSYCHOLOGY_MENU = Keyboard.builder()
    .textButton({
        label: '💫 Совет дня',
        payload: { command: 'daily_advice' }
    })
    .row()
    .textButton({
        label: '🗣 Описать ситуацию',
        payload: { command: 'describe_situation' }
    })
    .row()
    .textButton({
        label: '🧘‍♀️ Техники релаксации',
        payload: { command: 'relaxation_techniques' }
    })

    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'menu' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Клавиатура для выбора техники релаксации
export const RELAXATION_MENU = Keyboard.builder()
    .textButton({
        label: '🫁 Дыхательная гимнастика',
        payload: { command: 'breathing_exercises' }
    })
    .row()
    .textButton({
        label: '🧘‍♀️ Медитации',
        payload: { command: 'meditation_techniques' }
    })
    .row()
    .textButton({
        label: '◀️ Назад',
        payload: { command: 'psychology' },
        color: Keyboard.SECONDARY_COLOR
    })
    .oneTime();

// Функция для создания клавиатуры с вопросами на основе текущего выбора
export function createQuestionsCountMenu(currentCount) {
    return Keyboard.builder()
        .textButton({
            label: `${currentCount === 5 ? '✓' : ''} 5 вопросов`,
            payload: { command: 'set_questions_count', count: 5 }
        })
        .textButton({
            label: `${currentCount === 10 ? '✓' : ''} 10 вопросов`,
            payload: { command: 'set_questions_count', count: 10 }
        })
        .row()
        .textButton({
            label: `${currentCount === 15 ? '✓' : ''} 15 вопросов`,
            payload: { command: 'set_questions_count', count: 15 }
        })
        .textButton({
            label: `${currentCount === 20 ? '✓' : ''} 20 вопросов`,
            payload: { command: 'set_questions_count', count: 20 }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_test_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры сложности на основе текущего выбора
export function createDifficultyMenu(currentDifficulty) {
    return Keyboard.builder()
        .textButton({
            label: `${currentDifficulty === 'легкий' ? '✓' : ''} 🟢 Легкий`,
            payload: { command: 'set_difficulty', difficulty: 'легкий' }
        })
        .textButton({
            label: `${currentDifficulty === 'средний' ? '✓' : ''} 🟡 Средний`,
            payload: { command: 'set_difficulty', difficulty: 'средний' }
        })
        .textButton({
            label: `${currentDifficulty === 'сложный' ? '✓' : ''} 🔴 Сложный`,
            payload: { command: 'set_difficulty', difficulty: 'сложный' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_test_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры возраста на основе текущего выбора
export function createAgeMenu(currentAge, actionType = 'create_test') {
    const backCommand = {
        'create_test': 'create_test_menu',
        'create_lesson': 'create_lesson_menu',
        'search_materials': 'create_material_menu',
        'create_presentation': 'create_presentation_menu'
    }[actionType] || 'create_test_menu';

    return Keyboard.builder()
        .textButton({
            label: `${currentAge === '7-9' ? '✓' : ''} 7-9 лет`,
            payload: { command: 'set_age', age: '7-9', actionType }
        })
        .textButton({
            label: `${currentAge === '10-12' ? '✓' : ''} 10-12 лет`,
            payload: { command: 'set_age', age: '10-12', actionType }
        })
        .row()
        .textButton({
            label: `${currentAge === '13-15' ? '✓' : ''} 13-15 лет`,
            payload: { command: 'set_age', age: '13-15', actionType }
        })
        .textButton({
            label: `${currentAge === '16-17' ? '✓' : ''} 16-17 лет`,
            payload: { command: 'set_age', age: '16-17', actionType }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: backCommand }
        })
        .oneTime();
}

// Функция для создания главного меню теста с текущими настройками
export function createTestMenu(settings = {}) {
    return Keyboard.builder()
        .textButton({
            label: `Количество вопросов: ${settings.questionsCount || 5}`,
            payload: {
                command: 'select_questions_count'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Сложность: ${settings.difficulty || 'легкий'}`,
            payload: {
                command: 'select_difficulty'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Возраст: ${settings.age || '7-9'} лет`,
            payload: {
                command: 'select_age'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Тип теста: ${settings.testType ? translateTestType(settings.testType) : 'Множественный выбор'}`,
            payload: {
                command: 'select_test_type'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: 'Продолжить',
            payload: {
                command: 'confirm_test_settings'
            },
            color: Keyboard.PRIMARY_COLOR
        })
        .textButton({
            label: '◀️ Назад',
            payload: {
                command: 'tests'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

function translateTestType(type) {
    const types = {
        'multiple_choice': 'Множественный выбор',
        'open_ended': 'Открытый ответ',
        'true_false': 'Верно/Неверно'
    };
    return types[type] || 'Множественный выбор';
}

export function createTestTypeMenu(currentType) {
    return Keyboard.builder()
        .textButton({
            label: currentType === 'multiple_choice' ? '✓ 📝 Множественный выбор' : '📝 Множественный выбор',
            payload: {
                command: 'set_test_type',
                type: 'multiple_choice'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: currentType === 'open_ended' ? '✓ ✍️ Открытый ответ' : '✍️ Открытый ответ',
            payload: {
                command: 'set_test_type',
                type: 'open_ended'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: currentType === 'true_false' ? '✓ ⚖️ Верно/Неверно' : '⚖️ Верно/Неверно',
            payload: {
                command: 'set_test_type',
                type: 'true_false'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: {
                command: 'create_test_menu'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания клавиатуры длительности урока
export function createLessonDurationMenu(currentDuration) {
    return Keyboard.builder()
        .textButton({
            label: `${currentDuration === '30' ? '✓' : ''} 30 минут`,
            payload: { command: 'set_lesson_duration', duration: '30' }
        })
        .textButton({
            label: `${currentDuration === '45' ? '✓' : ''} 45 минут`,
            payload: { command: 'set_lesson_duration', duration: '45' }
        })
        .row()
        .textButton({
            label: `${currentDuration === '60' ? '✓' : ''} 60 минут`,
            payload: { command: 'set_lesson_duration', duration: '60' }
        })
        .textButton({
            label: `${currentDuration === '90' ? '✓' : ''} 90 минут`,
            payload: { command: 'set_lesson_duration', duration: '90' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_lesson_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры типа урока
export function createLessonTypeMenu(currentType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentType === 'теория' ? '✓' : ''} Теория`,
            payload: { command: 'set_lesson_type', type: 'теория' }
        })
        .textButton({
            label: `${currentType === 'практика' ? '✓' : ''} Практика`,
            payload: { command: 'set_lesson_type', type: 'практика' }
        })
        .row()
        .textButton({
            label: `${currentType === 'комбинированный' ? '✓' : ''} Комбинированный`,
            payload: { command: 'set_lesson_type', type: 'комбинированный' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_lesson_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры формата урока
export function createLessonFormatMenu(currentFormat) {
    return Keyboard.builder()
        .textButton({
            label: `${currentFormat === 'очный' ? '✓' : ''} Очный`,
            payload: { command: 'set_lesson_format', format: 'очный' }
        })
        .textButton({
            label: `${currentFormat === 'онлайн' ? '✓' : ''} Онлайн`,
            payload: { command: 'set_lesson_format', format: 'онлайн' }
        })
        .row()
        .textButton({
            label: `${currentFormat === 'смешанный' ? '✓' : ''} Смешанный`,
            payload: { command: 'set_lesson_format', format: 'смешанный' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_lesson_menu' }
        })
        .oneTime();
}

// Функция для создания главного меню урока с текущими настройками
export function createLessonMenu(settings = {}) {
    return Keyboard.builder()
        .textButton({
            label: `Длительность: ${settings.duration || '45'} минут`,
            payload: {
                command: 'select_lesson_duration'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Тип: ${settings.type || 'теория'}`,
            payload: {
                command: 'select_lesson_type'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Формат: ${settings.format || 'очный'}`,
            payload: {
                command: 'select_lesson_format'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Возраст: ${settings.age || '7-9'} лет`,
            payload: {
                command: 'select_age',
                actionType: 'search_materials'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: 'Продолжить',
            payload: {
                command: 'confirm_lesson_settings'
            },
            color: Keyboard.PRIMARY_COLOR
        })
        .textButton({
            label: '◀️ Назад',
            payload: {
                command: 'lessons'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания клавиатуры длительности презентации
export function createPresentationDurationMenu(currentDuration) {
    return Keyboard.builder()
        .textButton({
            label: `${currentDuration === '15' ? '✓' : ''} ⏱️ 15 минут`,
            payload: { command: 'set_presentation_duration', duration: '15' }
        })
        .textButton({
            label: `${currentDuration === '30' ? '✓' : ''} ⏱️ 30 минут`,
            payload: { command: 'set_presentation_duration', duration: '30' }
        })
        .row()
        .textButton({
            label: `${currentDuration === '45' ? '✓' : ''} ⏱️ 45 минут`,
            payload: { command: 'set_presentation_duration', duration: '45' }
        })
        .textButton({
            label: `${currentDuration === '60' ? '✓' : ''} ⏱️ 60 минут`,
            payload: { command: 'set_presentation_duration', duration: '60' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_presentation_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры количества слайдов
export function createSlidesCountMenu(currentCount) {
    return Keyboard.builder()
        .textButton({
            label: `${currentCount === '10' ? '✓' : ''} 📊 10 слайдов`,
            payload: { command: 'set_slides_count', count: '10' }
        })
        .textButton({
            label: `${currentCount === '15' ? '✓' : ''} 📊 15 слайдов`,
            payload: { command: 'set_slides_count', count: '15' }
        })
        .row()
        .textButton({
            label: `${currentCount === '20' ? '✓' : ''} 📊 20 слайдов`,
            payload: { command: 'set_slides_count', count: '20' }
        })
        .textButton({
            label: `${currentCount === '25' ? '✓' : ''} 📊 25 слайдов`,
            payload: { command: 'set_slides_count', count: '25' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_presentation_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры стиля презентации
export function createPresentationStyleMenu(currentStyle) {
    return Keyboard.builder()
        .textButton({
            label: `${currentStyle === 'академический' ? '✓' : ''} 🎓 Академический`,
            payload: { command: 'set_presentation_style', style: 'академический' }
        })
        .textButton({
            label: `${currentStyle === 'креативный' ? '✓' : ''} 🎨 Креативный`,
            payload: { command: 'set_presentation_style', style: 'креативный' }
        })
        .row()
        .textButton({
            label: `${currentStyle === 'минималистичный' ? '✓' : ''} ⚪ Минималистичный`,
            payload: { command: 'set_presentation_style', style: 'минималистичный' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_presentation_menu' }
        })
        .oneTime();
}

// Функция для создания главного меню презентации с текущими настройками
export function createPresentationMenu(settings = {}) {
    return Keyboard.builder()
        .textButton({
            label: `⏱️ Длительность: ${settings.duration || '30'} минут`,
            payload: {
                command: 'select_presentation_duration'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `📊 Количество слайдов: ${settings.slidesCount || '15'}`,
            payload: {
                command: 'select_slides_count'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `🎨 Стиль: ${settings.style || 'академический'}`,
            payload: {
                command: 'select_presentation_style'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `👥 Возраст: ${settings.age || '7-9'} лет`,
            payload: {
                command: 'select_age',
                actionType: 'create_presentation'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: '✅ Продолжить',
            payload: {
                command: 'confirm_presentation_settings'
            },
            color: Keyboard.PRIMARY_COLOR
        })
        .textButton({
            label: '◀️ Назад',
            payload: {
                command: 'presentations'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания клавиатуры типа материалов
export function createMaterialTypeMenu(currentType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentType === 'учебники' ? '✓' : ''} 📚 Учебники`,
            payload: { command: 'set_material_type', type: 'учебники' }
        })
        .textButton({
            label: `${currentType === 'статьи' ? '✓' : ''} 📰 Статьи`,
            payload: { command: 'set_material_type', type: 'статьи' }
        })
        .row()
        .textButton({
            label: `${currentType === 'видео' ? '✓' : ''} 🎥 Видео`,
            payload: { command: 'set_material_type', type: 'видео' }
        })
        .textButton({
            label: `${currentType === 'интерактив' ? '✓' : ''} 🎮 Интерактив`,
            payload: { command: 'set_material_type', type: 'интерактив' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_material_menu' }
        })
        .oneTime();
}

// Функция для создания клавиатуры языка материалов
export function createMaterialLanguageMenu(currentLanguage) {
    return Keyboard.builder()
        .textButton({
            label: `${currentLanguage === 'русский' ? '✓' : ''} 🇷🇺 Русский`,
            payload: { command: 'set_material_language', language: 'русский' }
        })
        .textButton({
            label: `${currentLanguage === 'английский' ? '✓' : ''} 🇬🇧 Английский`,
            payload: { command: 'set_material_language', language: 'английский' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'create_material_menu' }
        })
        .oneTime();
}

// Функция для создания главного меню материалов с текущими настройками
export function createMaterialMenu(settings = {}) {
    return Keyboard.builder()
        .textButton({
            label: `Тип: ${settings.type || 'учебники'}`,
            payload: {
                command: 'select_material_type'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Язык: ${settings.language || 'русский'}`,
            payload: {
                command: 'select_material_language'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Возраст: ${settings.age || '7-9'} лет`,
            payload: {
                command: 'select_age',
                actionType: 'search_materials'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: 'Продолжить',
            payload: {
                command: 'confirm_material_settings'
            },
            color: Keyboard.PRIMARY_COLOR
        })
        .textButton({
            label: '◀️ Назад',
            payload: {
                command: 'materials'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания клавиатуры длительности мероприятия
export function createEventDurationMenu(currentDuration, eventType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentDuration === 30 ? '✓' : ''} 30 минут`,
            payload: { command: `set_event_duration`, duration: 30, eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .textButton({
            label: `${currentDuration === 45 ? '✓' : ''} 45 минут`,
            payload: { command: `set_event_duration`, duration: 45, eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `${currentDuration === 60 ? '✓' : ''} 60 минут`,
            payload: { command: `set_event_duration`, duration: 60, eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .textButton({
            label: `${currentDuration === 90 ? '✓' : ''} 90 минут`,
            payload: { command: `set_event_duration`, duration: 90, eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: `${eventType}_events_settings` },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания клавиатуры количества участников
export function createParticipantsCountMenu(currentCount, eventType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentCount === '10-15' ? '✓' : ''} 10-15`,
            payload: { command: `set_event_participants`, count: '10-15', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .textButton({
            label: `${currentCount === '15-20' ? '✓' : ''} 15-20`,
            payload: { command: `set_event_participants`, count: '15-20', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `${currentCount === '20-25' ? '✓' : ''} 20-25`,
            payload: { command: `set_event_participants`, count: '20-25', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .textButton({
            label: `${currentCount === '25-30' ? '✓' : ''} 25-30`,
            payload: { command: `set_event_participants`, count: '25-30', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: `${eventType}_events_settings` },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания меню мероприятия с текущими настройками
export function createEventMenu(settings, eventType) {
    const keyboard = Keyboard.builder()
        .textButton({
            label: `Длительность: ${settings.duration || '30'} минут`,
            payload: { command: 'select_event_duration', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Участники: ${settings.participantsCount || '10-15'}`,
            payload: { command: 'select_event_participants', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `Возраст: ${settings.age || '7-9'} лет`,
            payload: { command: 'select_event_age', eventType },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: 'Продолжить',
            payload: {
                command: eventType === 'thematic' ? 'confirm_thematic_settings' :
                    eventType === 'extracurricular' ? 'confirm_extracurricular_settings' :
                        'confirm_educational_settings'
            },
            color: Keyboard.PRIMARY_COLOR
        })
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'scenarios' },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();

    return keyboard;
}

// Функция для создания меню выбора возраста для мероприятий
export function createEventAgeMenu(currentAge, eventType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentAge === '7-9' ? '✓' : ''} 7-9 лет`,
            payload: { command: 'set_event_age', age: '7-9', eventType }
        })
        .textButton({
            label: `${currentAge === '10-12' ? '✓' : ''} 10-12 лет`,
            payload: { command: 'set_event_age', age: '10-12', eventType }
        })
        .row()
        .textButton({
            label: `${currentAge === '13-15' ? '✓' : ''} 13-15 лет`,
            payload: { command: 'set_event_age', age: '13-15', eventType }
        })
        .textButton({
            label: `${currentAge === '16-17' ? '✓' : ''} 16-17 лет`,
            payload: { command: 'set_event_age', age: '16-17', eventType }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: `${eventType}_events_settings` },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

// Функция для создания клавиатуры проверки домашнего задания
export function createHomeworkCheckMenu(settings = {}) {
    return Keyboard.builder()
        .textButton({
            label: `📊 Уровень: ${settings.level || 'базовый'}`,
            payload: {
                command: 'select_homework_level'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `🔍 Тип проверки: ${settings.checkType || 'комплексный'}`,
            payload: {
                command: 'select_homework_check_type'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: `📝 Оценивание: ${settings.gradeType || 'балльное'}`,
            payload: {
                command: 'select_homework_grade_type'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .row()
        .textButton({
            label: '✅ Проверить',
            payload: {
                command: 'confirm_homework_settings'
            },
            color: Keyboard.PRIMARY_COLOR
        })
        .textButton({
            label: '◀️ Назад',
            payload: {
                command: 'lessons'
            },
            color: Keyboard.SECONDARY_COLOR
        })
        .oneTime();
}

export function createHomeworkLevelMenu(currentLevel) {
    return Keyboard.builder()
        .textButton({
            label: `${currentLevel === 'базовый' ? '✓' : ''} Базовый`,
            payload: { command: 'set_homework_level', level: 'базовый' }
        })
        .textButton({
            label: `${currentLevel === 'средний' ? '✓' : ''} Средний`,
            payload: { command: 'set_homework_level', level: 'средний' }
        })
        .row()
        .textButton({
            label: `${currentLevel === 'продвинутый' ? '✓' : ''} Продвинутый`,
            payload: { command: 'set_homework_level', level: 'продвинутый' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'check_homework' }
        })
        .oneTime();
}

export function createHomeworkCheckTypeMenu(currentType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentType === 'комплексный' ? '✓' : ''} Комплексный анализ`,
            payload: { command: 'set_homework_check_type', type: 'комплексный' }
        })
        .row()
        .textButton({
            label: `${currentType === 'орфография' ? '✓' : ''} Орфография`,
            payload: { command: 'set_homework_check_type', type: 'орфография' }
        })
        .textButton({
            label: `${currentType === 'пунктуация' ? '✓' : ''} Пунктуация`,
            payload: { command: 'set_homework_check_type', type: 'пунктуация' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'check_homework' }
        })
        .oneTime();
}

export function createHomeworkGradeTypeMenu(currentType) {
    return Keyboard.builder()
        .textButton({
            label: `${currentType === 'балльное' ? '✓' : ''} Балльное (1-5)`,
            payload: { command: 'set_homework_grade_type', type: 'балльное' }
        })
        .row()
        .textButton({
            label: `${currentType === 'процентное' ? '✓' : ''} Процентное (0-100%)`,
            payload: { command: 'set_homework_grade_type', type: 'процентное' }
        })
        .row()
        .textButton({
            label: `${currentType === 'уровневое' ? '✓' : ''} Уровневое (A-F)`,
            payload: { command: 'set_homework_grade_type', type: 'уровневое' }
        })
        .row()
        .textButton({
            label: '◀️ Назад',
            payload: { command: 'check_homework' }
        })
        .oneTime();
} 