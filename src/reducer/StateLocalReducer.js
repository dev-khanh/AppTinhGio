let appState = {
  arraysBloc: [],
  isEditing: false,
};
import {UPDATE_LiST, FETCH_FAILED} from '../action/ActionTypes';
export default function stateLocalReducer(state = appState, action) {
  switch (action.type) {
    case UPDATE_LiST:
      return {
        ...state,
        arraysBloc: action.arraysBloc,
      };
    case FETCH_FAILED:
      return {
        ...state,
        isEditing: action.isEditing,
      };
  }
  return state;
}
