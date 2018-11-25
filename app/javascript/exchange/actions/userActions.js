import { FETCH_USER, SIGN_UP_USER, SIGN_IN_USER, SIGN_OUT_USER } from './types';

import axios from 'axios';

export const fetchUser = () => dispatch => {
  axios.get('/is_signed_in')
  .then(function(response){
    dispatch({
      type: FETCH_USER,
      is_signed_in: response.data.is_signed_in,
      user_info: response.data.user_info
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

export const signUpUser = (userData) => dispatch => {
  getCSRFToken();
  axios.post('/users',
  {
    user: userData
  })
  .then(function(response){
    dispatch({
      type: SIGN_UP_USER
    })
  })
  .catch(function(error){
    console.log(error)
  })
}

export const signInUser = (userData) => dispatch => {
  getCSRFToken();
  axios.post('/users/sign_in',
  {
    user: userData
  })
  .then(function(response){
    dispatch({
      type: SIGN_IN_USER
    })
  })
  .catch(function(error){
    console.log(error)
  })
}

export const signOutUser = () => dispatch => {
  getCSRFToken();
  axios.delete('/users/sign_out', {})
  .then(function(response){
    dispatch({
      type: SIGN_OUT_USER
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