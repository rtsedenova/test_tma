import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { attachHandlers } from './handlers/start.handler'; 
import { attachCreatePostHandler } from './handlers/createpost.handler';

config();

const bot = new Telegraf(process.env.BOT_TOKEN!); 

attachHandlers(bot);
attachCreatePostHandler(bot);

export function startBot() {
  bot.launch();
  console.log('Bot started');
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
