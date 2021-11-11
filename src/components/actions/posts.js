import { ADD_POST, UPDATE_POSTS } from './actionTypes';
import { APIUrls, getFromBody } from './';
import { getAuthFromLocalStorage } from '../helpers/utils';
export function fetchPosts() {
  // console.log(
  //   '%c in action creator, starting fetching posts',
  //   'background: purple; color:white'
  // );
  return (dispatch) => {
    const url = APIUrls.posts(1, 15);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // console.log(
        //   '%c printing response from api',
        //   'background: purple, color:white',
        //   res.data.posts
        // );
        dispatch(updatePosts(res.data.posts));
      });
  };
}

export function updatePosts(posts) {
  // console.log('%c Updating posts', 'background: purple; color:white', posts);
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
      body: getFromBody({ content: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}
export function addPost(post) {
  return {
    type: ADD_POST,
    post: post,
  };
}
