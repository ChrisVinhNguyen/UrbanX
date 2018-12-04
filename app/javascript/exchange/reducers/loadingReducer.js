import { 
  SET_IS_LOADING_HEADER_PROFILE_CONTENT,
  SET_IS_LOADING_ITEM_LIST_COMPONENT,
  SET_IS_LOADING_TRANSACTIONS,
  SET_IS_LOADING_USER_REVIEWS,
  SET_IS_LOADING_ITEM_REVIEWS,
  SET_IS_LOADING_USER_PROFILE_INFO,
  SET_IS_LOADING_ITEM_DETAILS
} from '../actions/types';

const initialState = {
  isLoadingHeaderProfileContent: true,
  isLoadingItemListComponent: true,
  isLoadingTransactions: true,
  isLoadingUserReviews: true,
  isLoadingItemReviews: true,
  isLoadingUserProfileInfo: true,
  isLoadingItemDetails: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IS_LOADING_HEADER_PROFILE_CONTENT:
      return {
        ...state,
        isLoadingHeaderProfileContent: action.isLoadingHeaderProfileContent
      }
    case SET_IS_LOADING_ITEM_LIST_COMPONENT:
      return {
        ...state,
        isLoadingItemListComponent: action.isLoadingItemListComponent
      }
    case SET_IS_LOADING_TRANSACTIONS:
      return {
        ...state,
        isLoadingTransactions: action.isLoadingTransactions
      }
    case SET_IS_LOADING_USER_REVIEWS:
      return {
        ...state,
        isLoadingUserReviews: action.isLoadingUserReviews
      }
    case SET_IS_LOADING_ITEM_REVIEWS:
      return {
        ...state,
        isLoadingItemReviews: action.isLoadingItemReviews
      }
    case SET_IS_LOADING_USER_PROFILE_INFO:
      return {
        ...state,
        isLoadingUserProfileInfo: action.isLoadingUserProfileInfo
      }
    case SET_IS_LOADING_ITEM_DETAILS:
      return {
        ...state,
        isLoadingItemDetails: action.isLoadingItemDetails
      }
    default:
      return state;
  }
}