// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
// export const API_BASE_URL = 'http://localhost:3000/api';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Posts endpoints
export const API_POSTS = `${API_BASE_URL}/posts`;
export const API_POSTS_COUNT = `${API_POSTS}/count`;
export const API_POSTS_CREATE = `${API_POSTS}`; // POST
export const API_POSTS_LIST = `${API_POSTS}`;   // GET

// Users endpoints
export const API_USERS = `${API_BASE_URL}/users`;
export const API_USERS_LIST = `${API_USERS}`;   // GET
export const API_USER_MARK_VIEWED = (telegramId: string) => `${API_USERS}/${telegramId}/viewed`; // POST
export const API_USER_MARK_VIEWED_POST = (userId: string) => `${API_USERS}/${userId}/viewedPosts`;
export const API_USER_NEXT_UNVIEWED = (userId: string) => `${API_USERS}/${userId}/next-unviewed`;
