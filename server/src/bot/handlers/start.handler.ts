import { Telegraf } from 'telegraf';

export function attachHandlers(bot: Telegraf) {
  bot.start((ctx) => {
    const webAppUrl = 'https://t.me/r_tsedenova_bot/test_tma';

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
