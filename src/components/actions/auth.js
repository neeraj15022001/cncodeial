import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

export default function auth() {
  return (dispatch) => {
    const url = '';
    dispatch(updateAuthStart());
    fetch(url)
      .then((res) => res.json())
      .then((user) => dispatch(updateAuthSuccess(user)))
      .catch((err) => dispatch(updateAuthFailed(err)));
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
