import { Context } from 'telegraf';
import { setState } from '../state/createpost.state';

const allowedUsernames = (process.env.ALLOWED_USERS || '')
  .split(',')
  .map(username => username.trim());

export async function handleCreatePostCommand(ctx: Context) {
  console.log('Received /createpost command');

  const username = ctx.from?.username || '';

  if (!allowedUsernames.includes(username)) {
    console.log('Unauthorized user tried to use /createpost:', username);
    await ctx.reply('Unknown command');
    return;
  }

  setState(ctx.chat!.id, { step: 'awaiting_title' });
  await ctx.reply('Send the title first, then description and then the photo');
}
