import { VK } from 'vk-io';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database.js';
import { User } from './entities/User.js';
import { UserInteraction } from './entities/UserInteraction.js';
import { handleCommand } from './handlers/commandHandler.js';
import { MAIN_MENU } from './constants/keyboards.js';
import { WELCOME_MESSAGE } from './constants/messages.js';
import { userStates } from './store/userStates.js';
import { handleMessage } from './handlers/messageHandler.js';
import EventEmitter from 'events';

dotenv.config();

const vk = new VK({
    token: process.env.VK_TOKEN
});

// Инициализация базы данных
AppDataSource.initialize()
    .then(() => {
        console.log("База данных успешно подключена");
    })
    .catch((error) => console.log("Ошибка при подключении к базе данных:", error));

// Обработка сообщений
vk.updates.on('message_new', async (context) => {
    try {
        if (context.isUser && !context.isOutbox) {
            // Добавляем объект events в контекст
            context.events = new EventEmitter();

            // Обработка событий генерации
            context.events.on('generation:start', async (message) => {
                await context.send({ message });
            });

            context.events.on('generation:end', async (message) => {
                // Для end события не отправляем сообщение, так как результат будет отправлен сразу после
            });

            context.events.on('generation:error', async (message) => {
                await context.send({ message });
            });

            // Поиск или создание пользователя
            let user = await User.findOne({
                where: { vkId: context.senderId }
            });

            if (!user) {
                const [vkUser] = await vk.api.users.get({
                    user_ids: context.senderId
                });

                user = User.create({
                    vkId: context.senderId,
                    firstName: vkUser.first_name,
                    lastName: vkUser.last_name
                });
                await user.save();
            }

            // Сохранение взаимодействия
            const interaction = UserInteraction.create({
                user: user,
                interactionType: 'message',
                request: context.text
            });
            await interaction.save();

            // Обработка команд из payload кнопок
            if (context.messagePayload) {
                const handled = await handleCommand(context);
                if (handled) return;
            }

            // Если это первое сообщение или команда "начать"
            if (context.text && (context.text.toLowerCase() === 'начать' || context.text.toLowerCase() === 'start')) {
                await context.send({
                    message: WELCOME_MESSAGE,
                    keyboard: MAIN_MENU
                });
                return;
            }

            // Получаем текущее состояние пользователя
            const userState = userStates.get(context.senderId);

            // Обработка текстовых сообщений в зависимости от состояния
            if (userState) {
                const handled = await handleMessage(context);
                if (handled) return;
            }

            // Если сообщение не обработано, отправляем приветственное сообщение
            await context.send({
                message: 'Выберите действие из меню:',
                keyboard: MAIN_MENU
            });
        }
    } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
        await context.send({
            message: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
            keyboard: MAIN_MENU
        });
    }
});

// Запуск бота
async function startBot() {
    try {
        await vk.updates.start();
        console.log('Бот успешно запущен');
    } catch (error) {
        console.error('Ошибка при запуске бота:', error);
    }
}

startBot(); 