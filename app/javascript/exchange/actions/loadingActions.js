import {
  SET_IS_LOADING_HEADER_PROFILE_CONTENT,
} from './types';

export const setIsLoadingHeaderProfileContent = (isLoadingHeaderProfileContent) => dispatch => {
  dispatch({
    type: 'SET_IS_LOADING_HEADER_PROFILE_CONTENT',
    isLoadingHeaderProfileContent: isLoadingHeaderProfileContent,
  })
}

