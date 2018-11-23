
import { FILTER_ITEMS, GET_MY_ITEMS, GET_ITEM, GET_MY_TRANSACTIONS} from '../actions/types';


const initialState = {
  cur_category: 'All',
  filtered_items: [],
  item_id: null,
  filtered_transactions: [],
  item_details: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_ITEMS:
      return {
        ...state,
        cur_category: action.cur_category,
        filtered_items: action.filtered_items
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
        filtered_items: action.filtered_items

      }
    case GET_MY_TRANSACTIONS:
      return {
        ...state,
        filtered_transactions: action.filtered_transactions

      }
    default:
      return state;
  }
}