const API_BASE = 'http://codeial.codingninjas.com:8000/api/v2';
export const APIUrls = {
  login: () => {
    return `${API_BASE}/users/login`;
  },
  signup: () => {
    return `${API_BASE}/users/signup`;
  },
  editUser: () => {
    return `${API_BASE}/users/edit`;
  },
  posts: (page = 1, limit = 5) => {
    return `${API_BASE}/posts?page=${page}&limit=${limit}`;
  },
  userProfile: (userId) => {
    return `${API_BASE}/users/${userId}`;
  },
  userFriends: () => {
    return `${API_BASE}/friendship/fetch_user_friends`;
  },
  addFriend: (userId) => {
    return `${API_BASE}/friendship/create_friendship?user_id=${userId}`;
  },
  removeFriend: (userId) => {
    return `${API_BASE}/friendship/remove_friendship?user_id=${userId}`;
  },
  createPost: () => {
    return `${API_BASE}/posts/create`;
  },
};
