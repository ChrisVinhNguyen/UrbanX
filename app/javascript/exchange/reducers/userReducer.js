import { FETCH_USER, NEW_USER } from '../actions/types';

const initialState = {
  is_signed_in: false,
  user_info: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        is_signed_in: action.is_signed_in,
        user_info: action.user_info
      }
    default:
      return state;
  }
}