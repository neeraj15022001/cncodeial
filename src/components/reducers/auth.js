import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOG_OUT,
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
  EDIT_USER_START,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  isLoggedIn: false,
  inProgress: false,
  error: null,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
    case SIGNUP_START:
    case EDIT_USER_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        inProgress: false,
        error: null,
      };
    case EDIT_USER_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        error: false,
        inProgress: false,
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return state;
  }
}
