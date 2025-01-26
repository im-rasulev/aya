/**
 * Разделяет длинный текст на части для отправки сообщений
 * @param {string} text - Текст для разделения
 * @param {number} maxLength - Максимальная длина одной части
 * @returns {string[]} Массив частей текста
 */
export function splitTextIntoMessages(text, maxLength = 4000) {
    if (!text) return [];

    const parts = [];
    let currentText = text;

    while (currentText.length > 0) {
        if (currentText.length <= maxLength) {
            parts.push(currentText);
            break;
        }

        let splitIndex = currentText.lastIndexOf('\n', maxLength);
        if (splitIndex === -1) {
            splitIndex = maxLength;
        }

        parts.push(currentText.substring(0, splitIndex));
        currentText = currentText.substring(splitIndex + 1);
    }

    return parts;
}

/**
 * Отправляет длинное сообщение, разбивая его на части
 * @param {Object} context - Контекст сообщения
 * @param {string} text - Текст для отправки
 * @param {number} maxLength - Максимальная длина одной части
 * @returns {Promise<void>}
 */
export async function sendLongMessage(context, text, maxLength = 4000) {
    if (!text) return;

    const parts = splitTextIntoMessages(text, maxLength);

    for (let i = 0; i < parts.length; i++) {
        await context.send({ message: parts[i] });
    }
} 