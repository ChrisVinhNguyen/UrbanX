import { FILTER_ITEMS,
        GET_MY_ITEMS,
        GET_ITEM,
        NEW_ITEM,
        GET_ITEM_REVIEWS,
        DELETE_ITEM_REVIEW, 
        NEW_ITEM_REVIEW,
        EDIT_ITEM_REVIEW,
        GET_MY_TRANSACTIONS,
        NEW_TRANSACTION,
        UPDATE_TRANSACTION,
        DELETE_TRANSACTION,
        GET_MY_TRANSACTIONS_FOR_ITEM,
        SORT_ITEMS } from './types';


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
      filtered_items: response.data.filtered_items,
      original_list: response.data.filtered_items
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

export const getItemReviews = (current_viewed_item_id = current_viewed_item_id) => dispatch => {
  console.log(current_viewed_item_id);
  axios.get('/items/' + current_viewed_item_id + '/item_reviews', {
    params: {
      current_viewed_item_id: current_viewed_item_id
    }
  })
  .then(function(response){
    dispatch({
      type: GET_ITEM_REVIEWS,
      current_viewed_item_reviews: response.data.current_viewed_item_reviews
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

export const newItemReview = (item_review, current_viewed_item_id) => dispatch => {
  console.log(item_review);
  getCSRFToken();
  axios.post('/items/' + current_viewed_item_id + '/item_reviews', {
      item_review: item_review
  })
  
  .then(function(response){
    dispatch(
      getItemReviews(current_viewed_item_id)
    )
  })
  .catch(function(error){
    console.log(error);
  })
}

export const editItemReview = (item_review, current_viewed_item_id) => dispatch => {
  console.log(item_review.review_id);
  getCSRFToken();
  axios.patch('/items/' + current_viewed_item_id + '/item_reviews/' + item_review.review_id, {
      item_review: item_review
  })
  
  .then(function(response){
    dispatch(
      getItemReviews(current_viewed_item_id)
    )
  })
  .catch(function(error){
    console.log(error);
  })
}

export const deleteItemReview = (current_viewed_item_id, review_id) => dispatch => {
  console.log(review_id);
  getCSRFToken();
  axios.delete('/items/' + current_viewed_item_id + '/item_reviews/' + review_id, {
      review_id: review_id,
      item_id: current_viewed_item_id
  })
  
  .then(function(response){
    dispatch(
      getItemReviews(current_viewed_item_id)
    )
  })
  .catch(function(error){
    console.log(error);
  })
}

export const getItem = (item_id=item_id) => dispatch => {
  let that = this

  axios.get('/items/' + item_id , {})
  .then(function(response){
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
      filtered_items: response.data.filtered_items,
      original_list: response.data.filtered_items
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
    console.log("inside getMyTransactions 11111111111111111111111111111111111111111")
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

export const newTransaction = (transaction, current_user_profile_id) => dispatch => {
  let that = this
  getCSRFToken();

  axios.post('/items/'+transaction.item_id+'/transactions' , 
  {
    transaction: transaction
  })
  .then(function(response){
    console.log("inside newTransactions")
    console.log(response)
    dispatch(
      getMyTransactions(current_user_profile_id)
    )
    dispatch(
      getMyTransactionsForItem(transaction.item_id, current_user_profile_id)
    )
  })
  .catch(function(error){
    console.log(error);
  })
}

export const updateTransaction = (transaction, current_user_profile_id) => dispatch => {
  let that = this
  getCSRFToken();
  console.log(transaction)
  axios.put('/items/'+transaction.item_id+'/transactions/'+transaction.id , 
  {
    transaction: transaction
  })
  .then(function(response){
    console.log("inside updateTransactions")
    console.log(response)
    dispatch(
      getMyTransactions(current_user_profile_id)
    )
    dispatch(
      getMyTransactionsForItem(transaction.item_id, current_user_profile_id)
    )
  })
  .catch(function(error){
    console.log(error);
  })
}

export const deleteTransaction = (transaction, current_user_profile_id) => dispatch => {
  let that = this
  getCSRFToken();
  console.log(transaction)
  axios.delete('/items/'+transaction.item_id+'/transactions/'+transaction.id , 
  {
    transaction: transaction
  })
  .then(function(response){
    console.log("inside deleteTransactions")
    console.log(response)
    dispatch(
      getMyTransactions(current_user_profile_id)
    )
    dispatch(
      getMyTransactionsForItem(transaction.item_id, current_user_profile_id)
    )
  })
  .catch(function(error){
    console.log(error);
  })
}

export const getMyTransactionsForItem = (current_item_id, current_user_profile_id) => dispatch => {
  let that = this

  axios.get('/user_profiles/'+current_user_profile_id+'/my_transactions_for_item' , {
    params: {
      current_item_id: current_item_id
    }
  })
  .then(function(response){
    console.log("inside getMyTransactionsForItem")
    console.log(response)
    dispatch({
      type: GET_MY_TRANSACTIONS_FOR_ITEM,
      my_transactions_for_current_item: response.data.my_transactions_for_current_item
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

export const newItem = (item) => dispatch => {
  getCSRFToken();
  axios.post('/items',
  {
    item: item
  })
  .then(function(response){
    dispatch({
      type: NEW_ITEM
    })
  })
  .catch(function(error){
    console.log(error)
  })
}

const sortItemsR = (sorted_items, cur_sort) => {
  return{
    type: 'SORT_ITEMS',
    cur_sort: cur_sort,
    sorted_items: sorted_items
  }
}

export const sortItems = (items_list, cur_sort) => {
  return function (dispatch, getState) {
    let sorted_list;
    if (!cur_sort || cur_sort == '' || cur_sort == 'Default') {
      sorted_list = items_list;
    }

    else if (cur_sort == 'Newest') {
      sorted_list = [].concat(items_list).sort(
        (a, b) => new Date(String(b.date_posted).split('T')[0]) - new Date(String(a.date_posted).split('T')[0]));
    }

    else if (cur_sort == 'Oldest') {
      sorted_list = [].concat(items_list).sort(
        (a, b) => new Date(String(a.date_posted).split('T')[0]) - new Date(String(b.date_posted).split('T')[0]));
    }
    return dispatch(sortItemsR(sorted_list, cur_sort))
  }
}


const getCSRFToken = () => {
  const tokenDom = document.querySelector("meta[name=csrf-token]")
  if (tokenDom) {
     const csrfToken = tokenDom.content
     axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }
}
