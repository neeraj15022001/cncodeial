import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from './actionTypes';
import { APIUrls, getFromBody } from './';

export function login(email, password) {
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
      .then((data) => {
        if (data.success) {
          dispatch(updateAuthSuccess(data.data.user));
          return;
        }
        dispatch(updateAuthFailed(data.message));
      })
      .catch((err) => dispatch(updateAuthFailed(err)));
  };
}
export function signup(email, password, confirm, username) {
  return (dispatch) => {
    const url = APIUrls.signup();
    dispatch(signupStart());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFromBody({
        email,
        password,
        confirm_password: confirm,
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('tokem', data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      })
      .catch((err) => dispatch(signupFailed(err)));
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

export function signupStart() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error: error,
  };
}
