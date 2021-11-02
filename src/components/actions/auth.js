import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';
import { APIUrls, getFromBody } from './';

export default function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    dispatch(updateAuthStart());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFromBody({ email, password }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.success) {
          dispatch(updateAuthSuccess(user));
          return;
        }
        dispatch(updateAuthFailed(user.message));
      })
      .catch((err) => dispatch(updateAuthFailed(err)));
  };
}

export function updateAuthStart() {
  return {
    type: LOGIN_START,
  };
}

export function updateAuthSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

export function updateAuthFailed(error) {
  return {
    type: LOGIN_FAILED,
    error: error,
  };
}
