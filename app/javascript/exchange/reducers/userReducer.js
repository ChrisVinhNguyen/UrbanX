import { FETCH_USER, SIGN_UP_USER, SIGN_IN_USER, SIGN_OUT_USER, NEW_PROFILE } from '../actions/types';

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
    case SIGN_UP_USER:
      return {
        ...state,
        is_signed_in: true,
        user_info: {}
      }
    case SIGN_IN_USER:
      return {
        ...state,
        is_signed_in: true,
        user_info: {}
      }
    case SIGN_OUT_USER:
      return {
        ...state,
        is_signed_in: false,
        user_info: {}
      }
    case NEW_PROFILE: 
      return {
        ...state,
        profile_details: action.profile_details
      }
    default:
      return state;
  }
}