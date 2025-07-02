import { Context } from 'telegraf';
import { setState } from '../state/createpost.state';

export async function handleCreatePostCommand(ctx: Context) {
  console.log('Received /createpost command');

  const allowedUsernames = ['renatayeoo', 'PTRLS'];

  if (!allowedUsernames.includes(ctx.from?.username || '')) {
    console.log('Unauthorized user tried to use /createpost:', ctx.from?.username);
    await ctx.reply('Unknown command');
    return;
  }

  setState(ctx.chat!.id, { step: 'awaiting_title' });
  await ctx.reply('Send the title first, then description and then the photo');
}
