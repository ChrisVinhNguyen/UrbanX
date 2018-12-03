import { 
  DISPLAY_FLASH
} from '../actions/types';

const initialState = {
  flash_message: '',
  visible: false,
  pos_or_neg: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_FLASH:
      return {
        ...state,
        flash_message: action.flash_message,
        visible: action.visible,
        pos_or_neg: action.pos_or_neg
      }
    default:
      return state;
  }
}