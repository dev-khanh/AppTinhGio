import {takeEvery, put, call} from 'redux-saga/effects';
import {
  EVENT_DB,
  UPDATE_LiST,
  FETCH_FAILED,
  CREATE_DB,
  EDIT_DB,
} from '../action/ActionTypes';
import {fecthData, sortDate} from './libs';
export function* getBlocSaga() {
  yield takeEvery(EVENT_DB, fetchDataBlog);
}
function* fetchDataBlog({payload}) {
  try {
    var callDataRespones = yield call(function () {
      return new Promise(function (resolve, reject) {
        fecthData(payload.selectedValue, payload.check).once(
          'value',
          function () {
            fecthData(payload.selectedValue, payload.check).on(
              'value',
              function (snapshot) {
                if (snapshot.val() !== null) {
                  let addList = [];
                  var key = Object.keys(snapshot.val());
                  for (var i = 0; i < key.length; i++) {
                    addList.push(snapshot.val()[key[i]]);
                  }
                  addList.map((d, index) => {
                    d.key = key[index];
                  });
                  resolve(addList);
                }
              },
            );
          },
        );
      });
    });
    sortDate(callDataRespones);
    yield put({type: FETCH_FAILED, isEditing: true});
    yield put({type: UPDATE_LiST, arraysBloc: callDataRespones});
  } catch (e) {
    yield put({type: FETCH_FAILED, isEditing: false});
  }
}
export function* putBlocSaga() {
  yield takeEvery(CREATE_DB, createDataBlog);
}
function* createDataBlog({payload}) {
  fecthData(payload.month, payload.check)
    .push()
    .set({
      date: payload.date,
      timedb: payload.timedb,
      timekt: payload.timekt,
      timekq: payload.timekq,
      tien: payload.tien,
    })
    .then(() => console.log(' Data updated.'));
}
export function* editBlocSaga() {
  yield takeEvery(EDIT_DB, editDataBlog);
}
function* editDataBlog({payload}) {
  fecthData(payload.month, payload.check).once('value', function (snap) {
    var key = Object.keys(snap.val());
    fecthData(payload.month, payload.check)
      .child(key[payload.chooseIndex])
      .update({
        date: payload.date,
        timedb: payload.timedb,
        timekt: payload.timekt,
        timekq: payload.timekq,
        tien: payload.tien,
      });
  });
}
