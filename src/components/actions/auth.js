import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';
import { APIUrls, getFromBody } from './';

export default function auth(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    dispatch(updateAuthStart());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFromBody({ email, password }),
    });
    // .then((res) => res.json())
    // .then((user) => dispatch(updateAuthSuccess(user)))
    // .catch((err) => dispatch(updateAuthFailed(err)));
  };
}

export function updateAuthStart() {
  return {
    action: LOGIN_START,
  };
}

export function updateAuthSuccess(user) {
  return {
    action: LOGIN_SUCCESS,
    user: user,
  };
}

export function updateAuthFailed(error) {
  return {
    action: LOGIN_FAILED,
    error: error,
  };
}
