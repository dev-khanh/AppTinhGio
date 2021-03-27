import {connect} from 'react-redux';
import MainNavigation from '../compoment/MainNavigation';
import {addEventDB, createEventDB} from '../action';
import {
  UP_STATE_POST_USER,
  UPDATE_MOM,
  UPDATE_LiST,
  FETCH_FAILED,
  FETCH_CHECK,
} from '../action/ActionTypes';
import {
  formatDate,
  formatTime,
  formatDateTimeTatoll,
  timeConvert,
} from '../saga/libs';

const connectState = ({mainReducer, stateLocalReducer}) => ({
  selectChooseMonth: mainReducer.selectChooseMonth,
  timekq: mainReducer.timekq,
  selectedValue: mainReducer.selectedValue,
  arraysBloc: stateLocalReducer.arraysBloc,
  isEditing: stateLocalReducer.isEditing,
});
const connectAPI = (dispatch) => {
  return {
    sendRename: (date, timeBD, timeKT) => {
      dispatch(
        createEventDB({
          check: false,
          month: date.getMonth() + 1,
          date: formatDate(date),
          timedb: formatTime(timeBD),
          timekt: formatTime(timeKT),
          timekq: timeConvert(formatDateTimeTatoll(timeBD, timeKT)),
          tien: (formatDateTimeTatoll(timeBD, timeKT) * 20000) / 60,
        }),
      );
      dispatch({
        type: UP_STATE_POST_USER,
        timekq: timeConvert(formatDateTimeTatoll(timeBD, timeKT)),
      });
    },
    setSelectedValue: (selectMom) => {
      dispatch({
        type: UPDATE_MOM,
        selectedValue: selectMom,
      });
      dispatch({
        type: FETCH_FAILED,
        isEditing: false,
      });
    },
    setArraysBloc: () => {
      dispatch({
        type: UPDATE_LiST,
        arraysBloc: [],
      });
    },
    readFile: (selectedValue) => {
      dispatch(addEventDB({selectedValue, check: false}));
    },
    sendScreen: (check) => {
      dispatch({
        type: FETCH_CHECK,
        check,
      });
    },
  };
};
const HomeContainer = connect(connectState, connectAPI)(MainNavigation);
export default HomeContainer;
