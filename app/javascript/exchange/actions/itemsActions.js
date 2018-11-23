
import { FILTER_ITEMS, GET_MY_ITEMS, GET_ITEM, GET_MY_TRANSACTIONS } from './types';


import axios from 'axios';

export const filterItems = (cur_category=cur_category) => dispatch => {
  let that = this

  axios.get('/items/filter', {
    params: {
      cur_category: cur_category
    }
  })
  .then(function(response){
    dispatch({
      type: FILTER_ITEMS,
      cur_category: cur_category,
      filtered_items: response.data.filtered_items
    })
  })
  .catch(function(error){
    console.log(error);
  })
}



export const getItem = (item_id=item_id) => dispatch => {
  let that = this

  axios.get('/items/'+item_id , {})
  .then(function(response){
    console.log("inside getItem")
    console.log(response)
    dispatch({
      type: GET_ITEM,
      item_id: item_id,
      item_details: response.data
    })
  })
  .catch(function(error){
    console.log(error);
  })
}
export const getMyItems = (current_user_profile_id) => dispatch => {
  let that = this
  console.log(current_user_profile_id);
  axios.get('/items/myItems', {
    params: {
      current_user_profile_id: current_user_profile_id
    }
  })
  .then(function(response){
    console.log(response)
    dispatch({
      type: GET_MY_ITEMS,
      filtered_items: response.data.filtered_items
    })
  })
  .catch(function(error){
    console.log(error);
  })

}

export const getMyTransactions = (current_user_profile_id) => dispatch => {
  let that = this

  axios.get('/user_profiles/'+current_user_profile_id+'/transactions' , {})
  .then(function(response){
    console.log("inside getMyTransactions")
    console.log(response)
    dispatch({
      type: GET_MY_TRANSACTIONS,
      filtered_transactions: response.data.filtered_transactions
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

