import { Telegraf } from 'telegraf';
import { handleCreatePostCommand } from './createpost.command';
import { handleTitleStep } from './createpost.title';
import { handlePhotoStep } from './createpost.photo';

export function attachCreatePostHandler(bot: Telegraf) {
  bot.command('createpost', handleCreatePostCommand);
  bot.on('text', handleTitleStep);
  bot.on('photo', handlePhotoStep);
}
