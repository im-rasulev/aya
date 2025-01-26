# Бот-ассистент для учителей ВКонтакте

Бот-ассистент для автоматизации рутинных процессов педагога и оказания психологической поддержки.

## Функциональные возможности

- Разработка и генерация тестовых заданий
- Подготовка структуры презентаций
- Генерация планов уроков
- Подбор учебных материалов
- Генерация сценариев мероприятий
- Психологическая поддержка

## Установка и настройка

1. Клонируйте репозиторий:
```bash
git clone [url-репозитория]
cd aya_vk_bot
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env на основе .env.example и заполните необходимые переменные окружения:
```bash
cp .env.example .env
```

4. Создайте базу данных PostgreSQL:
```bash
createdb aya_vk_bot
```

5. Запустите миграции базы данных через TypeORM.

## Запуск

Для запуска бота:
```bash
npm start
```

Для запуска тестов:
```bash
npm test
```

Для запуска тестов в режиме watch:
```bash
npm run test:watch
```

## Структура проекта

```
src/
  ├── config/          # Конфигурационные файлы (openai, database, promptSettings)
  ├── constants/       # Константы проекта (клавиатуры и другие константы)
  ├── handlers/        # Обработчики команд и сообщений
  ├── prompts/         # Шаблоны промптов для различных сценариев
  │   ├── lessonPrompts.js
  │   ├── materialPrompts.js
  │   ├── presentationPrompts.js
  │   ├── scenarioPrompts.js
  │   ├── systemPrompts.js
  │   └── testPrompts.js
  ├── services/        # Сервисы для работы с различными функциональностями
  │   ├── materialService.js
  │   ├── presentationService.js
  │   ├── psychologyService.js
  │   ├── scenarioService.js
  │   └── testService.js
  ├── store/          # Хранилище состояний пользователей
  ├── utils/          # Вспомогательные функции
  └── index.js        # Точка входа приложения
```

## Технологии

- Node.js
- VK-IO и @vk-io/hear для работы с API ВКонтакте
- OpenAI API для генерации контента
- PostgreSQL и TypeORM для работы с базой данных