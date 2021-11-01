import { UPDATE_POSTS } from '../actions/actionTypes';

export function posts(state = [], action) {
  console.log(
    `%c in reducer function`,
    'background:green; color:white',
    state,
    action
  );
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    default:
      return state;
  }
}
