import { Context } from 'telegraf';
import { getState, setState } from '../state/createpost.state';

export async function handleDescriptionStep(ctx: Context) {
  const state = getState(ctx.chat!.id);
  if (!state || state.step !== 'awaiting_description') return;

  const text = (ctx.message as any).text;

  // Limit description to 120 characters
  if (text.length > 120) {
    await ctx.reply(`The description is too long (${text.length} characters). Please send no more than 120.`);
    return;
  }

  setState(ctx.chat!.id, {
    step: 'awaiting_photo',
    title: state.title,
    description: text,
  });

  console.log(`Description received: ${text}`);
  await ctx.reply('Now send the photo for the news.');
}
