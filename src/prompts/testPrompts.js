export const TEST_GENERATION_PROMPT = (topic, settings) => {
    const { difficulty, age, questionsCount, testType } = settings;

    return `Создай тест по теме "${topic}" со следующими параметрами:
- Уровень сложности: ${difficulty}
- Возраст учеников: ${age} лет
- Количество вопросов: РОВНО ${questionsCount} вопросов (не больше и не меньше)
- Тип теста: ${testType}

ВАЖНО: Тест должен содержать РОВНО ${questionsCount} вопросов!

Формат вывода:
=== Информация о тесте ===
[Общее описание и цели теста]

=== Вопросы ===
[Пронумерованные вопросы с вариантами ответов]

=== Ответы и пояснения ===
[Правильные ответы с объяснениями]`;
};

export const TEST_CHECK_PROMPT = (answers, settings) => {
    const { testType, criteria } = settings;

    return `Проверь ответы на тест со следующими параметрами:
- Тип теста: ${testType}
- Критерии оценки: ${criteria}

Ответы для проверки:
${answers}

Формат вывода:
=== Результаты проверки ===
[Общий анализ ответов]

=== Детальный разбор ===
[Анализ каждого ответа с пояснениями]

=== Рекомендации ===
[Советы по улучшению результатов]`;
}; 