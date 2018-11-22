import { FILTER_ITEMS } from '../actions/types';

const initialState = {
  cur_category: 'All',
  filtered_items: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_ITEMS:
      return {
        ...state,
        cur_category: action.cur_category,
        filtered_items: action.filtered_items
      }
    default:
      return state;
  }
}