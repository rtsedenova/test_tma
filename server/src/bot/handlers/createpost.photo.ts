import { Context } from 'telegraf';
import path from 'path';
import { getState, clearState } from '../state/createpost.state';
import { downloadTelegramFile } from '../utils/telegram.utils';
import { readJSON, writeJSON } from '../utils/file.utils';
import { createPost } from '../utils/post.utils';

const postsPath = path.join(__dirname, '../../data/posts.json');
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
  const posts = readJSON<any[]>(postsPath);
  const newPost = createPost(posts, state.title!, fileName);
  posts.push(newPost);
  writeJSON(postsPath, posts);

  console.log(`Post created: ${JSON.stringify(newPost)}`);
  await ctx.reply(`Post created!\nTitle: ${newPost.title}\nImage: ${newPost.fullImageUrl}`);
  clearState(ctx.chat!.id);
} 