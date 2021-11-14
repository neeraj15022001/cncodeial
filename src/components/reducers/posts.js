import {
  ADD_POST,
  CREATE_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_POSTS,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  // console.log(
  //   `%c in reducer function`,
  //   'background:green; color:white',
  //   state,
  //   action
  // );
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case CREATE_COMMENT:
      return state.map((post) => {
        if (post.id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        } else {
          return post;
        }
      });
    case UPDATE_POST_LIKE:
      console.log('state from reducer', state);
      return state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        } else {
          return post;
        }
      });
    default:
      return state;
  }
}
