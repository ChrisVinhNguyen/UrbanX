import {
  FILTER_ITEMS,
  SEARCH_ITEMS,
  GET_MY_ITEMS,
  GET_ITEM,
  GET_MY_TRANSACTIONS,
  GET_ITEM_REVIEWS,
  NEW_ITEM_REVIEW,
  EDIT_ITEM_REVIEW,
  DELETE_ITEM_REVIEW,
  NEW_ITEM,
  NEW_TRANSACTION,
  UPDATE_TRANSACTION,
  GET_MY_TRANSACTIONS_FOR_ITEM,
  SORT_ITEMS} 
from '../actions/types';



const initialState = {
  cur_category: 'All',
  filtered_items: [],
  search_category: 'All',
  search_value: '',
  filtered_item_names_for_search: [],
  current_viewed_item_id: null,
  current_viewed_item_reviews: [],
  item_id: null,
  filtered_transactions: [],
  item_details: [], 
  my_transactions_for_current_item: [],
  cur_sort: '',
  original_list: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_ITEMS:
      return {
        ...state,
        cur_category: action.cur_category,
        filtered_items: action.filtered_items,
        original_list: action.original_list
      }
    case SEARCH_ITEMS:
      return {
        ...state,
        search_value: action.search_value,
        filtered_item_names_for_search: action.filtered_item_names_for_search,
      }
    case GET_ITEM_REVIEWS:
      return {
        ...state, 
        current_viewed_item_reviews: action.current_viewed_item_reviews
      }
    case NEW_ITEM_REVIEW:
      return {
        ...state, 
        current_viewed_item_reviews: action.current_viewed_item_reviews
      }
    case EDIT_ITEM_REVIEW:
      return {
        ...state, 
        current_viewed_item_reviews: action.current_viewed_item_reviews
      }
    case DELETE_ITEM_REVIEW:
      return {
        ...state, 
        current_viewed_item_reviews: action.current_viewed_item_reviews
      }
    case GET_ITEM:
      return {
        ...state,
        item_id: action.item_id,
        item_details: action.item_details
      }
    case GET_MY_ITEMS:
      return {
        ...state,
        filtered_items: action.filtered_items,
        original_list: action.original_list
      }
    case GET_MY_TRANSACTIONS:
      return {
        ...state,
        filtered_transactions: action.filtered_transactions
      }
    case NEW_TRANSACTION:
      return {
        ...state

      }
    case UPDATE_TRANSACTION:
      return {
        ...state

      }
    case GET_MY_TRANSACTIONS_FOR_ITEM:
      return {
        ...state,
        my_transactions_for_current_item: action.my_transactions_for_current_item
      }
    case NEW_ITEM:
      return {
        ...state,
        item_id: action.item_id,
        item_details: action.item_details
      }
    case SORT_ITEMS:
      return {
        ...state,
        cur_sort: action.cur_sort,
        filtered_items: action.sorted_items
      }
    default:
      return state;
  }
}