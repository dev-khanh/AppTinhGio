let appState = {
  timekq: '',
  selectedValue: 'thang1',
  check: false,
};
import {
  UP_STATE_POST_USER,
  UPDATE_MOM,
  FETCH_CHECK,
} from '../action/ActionTypes';
export default function mainReducer(state = appState, action) {
  switch (action.type) {
    case UP_STATE_POST_USER:
      return {
        ...state,
        timekq: action.timekq,
      };
    case UPDATE_MOM:
      return {
        ...state,
        selectedValue: action.selectedValue,
      };
    case FETCH_CHECK:
      return {
        ...state,
        check: action.check,
      };
  }
  return state;
}
