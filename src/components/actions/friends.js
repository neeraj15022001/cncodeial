import {
  ADD_FRIEND,
  FETCH_FRIENDS_FAILED,
  FETCH_FRIENDS_START,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from './actionTypes';
import { APIUrls } from './index';
import { getAuthFromLocalStorage } from '../helpers/utils';

export function fetchFriends() {
  return (dispatch) => {
    dispatch(fetchFriendsStart());
    fetch(APIUrls.userFriends(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((friends) => {
        console.log('friends from action creator', friends);
        if (friends.success)
          dispatch(fetchFriendsSuccess(friends.data.friends));
        else dispatch(fetchFriendsFailure(friends.data.error));
      })
      .catch((err) => {
        console.log('err', err);
        dispatch(fetchFriendsFailure(err));
      });
  };
}
export function fetchFriendsStart() {
  return {
    type: FETCH_FRIENDS_START,
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function fetchFriendsFailure(error) {
  return {
    type: FETCH_FRIENDS_FAILED,
    error,
  };
}
export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
