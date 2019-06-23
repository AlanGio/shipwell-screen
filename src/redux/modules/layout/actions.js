import { OPEN_MODAL, CLOSE_MODAL } from './constants';

export const openModal = (name, data) => dispatch =>
  dispatch({
    type: OPEN_MODAL,
    payload: {
      name,
      data,
    },
  });

export const closeModal = () => dispatch =>
  dispatch({
    type: CLOSE_MODAL,
  });
