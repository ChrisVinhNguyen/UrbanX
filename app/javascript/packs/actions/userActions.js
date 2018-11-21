import { FETCH_USER, NEW_USER } from './types';

import axios from 'axios';

export const fetchUser = () => dispatch => {
  let that = this
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