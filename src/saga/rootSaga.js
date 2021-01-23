import {all, fork} from 'redux-saga/effects';
import {getBlocSaga, putBlocSaga, editBlocSaga} from './apiSaga.js';
export default function* rootSaga() {
  yield all([fork(getBlocSaga), fork(putBlocSaga), fork(editBlocSaga)]);
}
