import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_START,
  USER_PROFILE_FAILED,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthFromLocalStorage } from '../helpers/utils';
export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILED,
    error,
  };
}

export function UserProfileStart() {
  return {
    type: USER_PROFILE_START,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(UserProfileStart());
    fetch(APIUrls.userProfile(userId), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
        } else {
          dispatch(userProfileFailure(data.data.error));
        }
      })
      .catch((error) => dispatch(userProfileFailure(error)));
  };
}
