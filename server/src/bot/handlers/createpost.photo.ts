import { Context } from 'telegraf';
import path from 'path';
import { getState, clearState } from '../state/createpost.state';
import { downloadTelegramFile } from '../utils/telegram.utils';
import { addPost } from '../../posts/posts.service';

const uploadsDir = path.join(__dirname, '../../../public/uploads');

export async function handlePhotoStep(ctx: Context) {
  const state = getState(ctx.chat!.id);
  if (!state || state.step !== 'awaiting_photo') return;

  const photoArray = (ctx.message as any).photo;
  const photo = Array.isArray(photoArray) ? photoArray[photoArray.length - 1] : null;
  const fileId = photo?.file_id;
  if (!fileId) {
    console.log('Photo not found in message');
    return ctx.reply('Photo not found. Please try again.');
  }

  const file = await ctx.telegram.getFile(fileId);
  if (!file.file_path) {
    console.log('Failed to get file path from Telegram');
    return ctx.reply('Failed to get file path.');
  }

  const fileName = await downloadTelegramFile(ctx, file.file_path, uploadsDir);
  const baseUrl = process.env.PUBLIC_URL || 'http://localhost:3000';
  const publicPath = `/uploads/${fileName}`;
  const fullUrl = `${baseUrl}${publicPath}`;
  const newPost = addPost({
    title: state.title!,
    description: state.description || '',
    imageUrl: publicPath,
    fullImageUrl: fullUrl,
  });

  console.log(`Post created: ${JSON.stringify(newPost)}`);
  await ctx.reply(`Post created!\nTitle: ${newPost.title}\nDescription: ${newPost.description}\nImage: ${newPost.fullImageUrl}`);
  clearState(ctx.chat!.id);
} 