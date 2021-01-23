import {EVENT_DB, CREATE_DB, EDIT_DB} from './ActionTypes';
export const addEventDB = (payload) => {
  return {
    type: EVENT_DB,
    payload,
  };
};
export const createEventDB = (payload) => {
  return {
    type: CREATE_DB,
    payload,
  };
};
export const editEventDB = (payload) => {
  return {
    type: EDIT_DB,
    payload,
  };
};
