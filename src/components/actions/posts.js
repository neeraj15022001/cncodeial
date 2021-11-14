import {
  ADD_POST,
  CREATE_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_POSTS,
} from './actionTypes';
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
export function addComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
      body: getFromBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(createComment(data.data.comment, postId));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}
export function createComment(comment, postId) {
  return {
    type: CREATE_COMMENT,
    comment,
    postId,
  };
}

export function addLikeToStore(postId, likeType, userId) {
  return (dispatch) => {
    const url = APIUrls.toggleLike(postId, likeType);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data after toggling like', data);
        if (data.success) {
          dispatch(toggleLike(postId, userId));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}

export function toggleLike(postId, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
  };
}
