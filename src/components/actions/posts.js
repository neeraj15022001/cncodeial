import { UPDATE_POSTS } from './actionTypes';
import { APIUrls } from './';
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
