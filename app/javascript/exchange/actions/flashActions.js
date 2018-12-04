import {
  DISPLAY_FLASH,
} from './types';

const displayFlashR = (flash_message, visible, pos_or_neg) => {
  return{
    type: 'DISPLAY_FLASH',
    flash_message: flash_message,
    visible: visible,
    pos_or_neg: pos_or_neg
  }
}

export const displayFlash = (flash_message, visible, pos_or_neg) => {
  return function (dispatch, getState) {
  	let temp = "".concat(flash_message);
  	if (flash_message == '') {
  		temp = getState().flash.flash_message;
  	}

    return dispatch(displayFlashR(temp, visible, pos_or_neg))
  }
}

