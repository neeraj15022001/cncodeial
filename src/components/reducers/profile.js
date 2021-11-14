import {
  USER_PROFILE_FAILED,
  USER_PROFILE_START,
  USER_PROFILE_SUCCESS,
} from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};
export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_START:
      return {
        ...state,
        inProgress: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
      };
    case USER_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return state;
  }
}
