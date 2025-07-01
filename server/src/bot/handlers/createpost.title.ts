import { Context } from 'telegraf';
import { getState, setState } from '../state/createpost.state';

export async function handleTitleStep(ctx: Context) {
  const state = getState(ctx.chat!.id);
  if (!state || state.step !== 'awaiting_title') return;
  const text = (ctx.message as any).text;
  setState(ctx.chat!.id, { step: 'awaiting_photo', title: text });
  console.log(`Title received: ${text}`);
  await ctx.reply('Now send the photo');
} 