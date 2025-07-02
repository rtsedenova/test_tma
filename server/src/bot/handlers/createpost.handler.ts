import { Telegraf } from 'telegraf';
import { handleCreatePostCommand } from './createpost.command';
import { handleTitleStep } from './createpost.title';
import { handlePhotoStep } from './createpost.photo';
import { handleDescriptionStep } from './createpost.description';

export function attachCreatePostHandler(bot: Telegraf) {
  bot.command('createpost', handleCreatePostCommand);
  bot.on('text', async (ctx) => {
    const state = require('../state/createpost.state').getState(ctx.chat.id);
    if (state?.step === 'awaiting_title') return handleTitleStep(ctx);
    if (state?.step === 'awaiting_description') return handleDescriptionStep(ctx);
  });
  bot.on('photo', handlePhotoStep);
}
