import ShowListView from '../compoment/ShowListView';
import {connect} from 'react-redux';
import {editEventDB, addEventDB} from '../action';
import {UP_STATE_POST_USER} from '../action/ActionTypes';
import {
  formatDate,
  formatTime,
  formatDateTime,
  timeConvert,
} from '../saga/libs';
const connectState = ({stateLocalReducer, mainReducer}) => ({
  arraysBloc: stateLocalReducer.arraysBloc,
  isEditing: stateLocalReducer.isEditing,
  timekq: mainReducer.timekq,
  selectedValue: mainReducer.selectedValue,
  check: mainReducer.check,
});
const connectAPI = (dispatch) => {
  return {
    sendRename: (date, timeBD, timeKT, chooseIndex, selectedValue, check) => {
      dispatch(
        editEventDB({
          check: check,
          month: date.getMonth() + 1,
          date: formatDate(date),
          timedb: formatTime(timeBD),
          timekt: formatTime(timeKT),
          timekq: timeConvert(formatDateTime(timeBD, timeKT)),
          tien: (formatDateTime(timeBD, timeKT) * 18000) / 60,
          chooseIndex: chooseIndex,
        }),
      );
      endAndStartTimer(dispatch, selectedValue, check);
      dispatch({
        type: UP_STATE_POST_USER,
        timekq: timeConvert(formatDateTime(timeBD, timeKT)),
      });
    },
  };
};
var timer;
function endAndStartTimer(dispatch, selectedValue, check) {
  window.clearTimeout(timer);
  timer = window.setTimeout(function () {
    dispatch(addEventDB({selectedValue, check: check}));
  }, 1000);
}
const ListContainer = connect(connectState, connectAPI)(ShowListView);
export default ListContainer;
