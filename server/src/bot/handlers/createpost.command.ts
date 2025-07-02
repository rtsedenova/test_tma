import { Context } from 'telegraf';
import { setState } from '../state/createpost.state';

export async function handleCreatePostCommand(ctx: Context) {
  console.log('Received /createpost command');
  if (ctx.from?.username !== 'renatayeoo') {
    console.log('Unauthorized user tried to use /createpost');
    await ctx.reply('Unknown command');
    return;
  }
  setState(ctx.chat!.id, { step: 'awaiting_title' });
  await ctx.reply('Send the title first, then description and then the photo');
} 