import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Context } from 'telegraf';

export async function downloadTelegramFile(ctx: Context, filePath: string, destFolder: string): Promise<string> {
  const fileName = `${Date.now()}_${path.basename(filePath)}`;
  const localFilePath = path.join(destFolder, fileName);
  const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
  const response = await axios.get(url, { responseType: 'stream' });

  await new Promise<void>((resolve, reject) => {
    const writer = fs.createWriteStream(localFilePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  return fileName;
}
