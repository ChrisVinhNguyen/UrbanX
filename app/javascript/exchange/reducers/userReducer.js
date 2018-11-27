import { 
  FETCH_USER, 
  SIGN_UP_USER, 
  SIGN_IN_USER, 
  SIGN_OUT_USER, 
  NEW_PROFILE, 
  FETCH_USER_REVIEWS, 
  NEW_USER_REVIEW, 
  EDIT_USER_REVIEW,
  DELETE_USER_REVIEW 
} from '../actions/types';

const initialState = {
  is_signed_in: false,
  user_info: {},
  user_reviews: [],
  user_form_backend_error: []
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
        is_signed_in: action.is_signed_in,
        user_info: action.user_info,
        user_form_backend_error: action.user_form_backend_error
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
    case FETCH_USER_REVIEWS:
      return {
        ...state,
        user_reviews: action.user_reviews
      }

    case NEW_USER_REVIEW:
      return {
        ...state,
        user_reviews: action.user_reviews
      }

    case EDIT_USER_REVIEW:
      return {
        ...state,
        user_reviews: action.user_reviews
      }
    case DELETE_USER_REVIEW:
      return {
        ...state,
        user_reviews: action.user_reviews
      }
    default:
      return state;
  }
}