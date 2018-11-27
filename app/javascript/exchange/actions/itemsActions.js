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
        UPDATE_TRANSACTION } from './types';


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
  })
  .catch(function(error){
    console.log(error);
  })
}

export const getMyTransactionsForItem = (item_id, current_user_profile_id) => dispatch => {
  let that = this

  console.log(transaction)
  axios.get('/items/'+transaction.item_id+'/transactions/'+transaction.id , 
  {
    transaction: transaction
  })
  .then(function(response){
    console.log("inside updateTransactions")
    console.log(response)
    dispatch(
      getMyTransactions(current_user_profile_id)
    )
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



const getCSRFToken = () => {
  const tokenDom = document.querySelector("meta[name=csrf-token]")
  if (tokenDom) {
     const csrfToken = tokenDom.content
     axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }
}
