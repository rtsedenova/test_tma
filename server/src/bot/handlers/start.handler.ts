import { Telegraf } from 'telegraf';

export function attachHandlers(bot: Telegraf) {
  bot.start((ctx) => {
    const webAppUrl = 'https://n61o13-79-127-249-67.ru.tuna.am';

    ctx.reply(
      'Hi! Click the button below to open the mini-app:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open the application',
                web_app: { url: webAppUrl },
              },
            ],
          ],
        },
      }
    );
  });
}
