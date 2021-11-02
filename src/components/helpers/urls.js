const API_BASE = 'http://codeial.codingninjas.com:8000/api/v2';
export const APIUrls = {
  login: () => {
    return `${API_BASE}/users/login`;
  },
  signup: () => {
    return `${API_BASE}/users/signup`;
  },
  posts: (page, limit) => {
    return `${API_BASE}/posts?page=${page}&limit=${limit}`;
  },
};
