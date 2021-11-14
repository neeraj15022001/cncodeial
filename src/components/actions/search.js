import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';
import { APIUrls } from './index';
import { getAuthFromLocalStorage } from '../helpers/utils';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        }
        dispatch(searchResultsSuccess([]));
      })
      .catch((err) => {
        alert(err);
      });
  };
}
export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
