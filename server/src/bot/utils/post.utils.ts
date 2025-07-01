const baseUrl = process.env.PUBLIC_URL || 'http://localhost:3000';

export function createPost(posts: any[], title: string, fileName: string) {
  const publicPath = `/uploads/${fileName}`;
  const fullUrl = `${baseUrl}${publicPath}`;
  return {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title,
    imageUrl: publicPath,
    fullImageUrl: fullUrl,
    createdAt: new Date().toISOString(),
  };
}
