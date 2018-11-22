import { FILTER_ITEMS, GET_ITEM_REVIEWS } from '../actions/types';

const initialState = {
  cur_category: 'All',
  filtered_items: [],
  current_viewed_item_id: null,
  current_viewed_item_reviews: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_ITEMS:
      return {
        ...state,
        cur_category: action.cur_category,
        filtered_items: action.filtered_items
      }
    case GET_ITEM_REVIEWS:
      return {
        ...state, 
        current_viewed_item_id: action.current_viewed_item_id,
        current_viewed_item_reviews: action.current_viewed_item_reviews
      }
    default:
      return state;
  }
}