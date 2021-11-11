import {
  ADD_FRIEND,
  FETCH_FRIENDS_FAILED,
  FETCH_FRIENDS_START,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const initialFriendsState = {
  friends: [],
  inProgress: false,
  success: null,
  error: null,
};
export default function friends(state = initialFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_START:
      return {
        ...state,
        inProgress: true,
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.friends,
        success: true,
        inProgress: false,
      };
    case FETCH_FRIENDS_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
        success: false,
      };
    case ADD_FRIEND:
      console.log(state);
      return {
        ...state,
        friends: state.friends.concat(action.friend),
      };
    case REMOVE_FRIEND:
      const newFriendsArr = state.friends.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return {
        ...state,
        friends: newFriendsArr,
      };
    default:
      return state;
  }
}
