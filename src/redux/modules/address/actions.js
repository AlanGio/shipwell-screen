import api from '../../api';
import { action } from '../..';
import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_ERROR,
  EDIT_ADDRESS_REQUEST,
  EDIT_ADDRESS_SUCCESS,
  EDIT_ADDRESS_ERROR,
  COMPLETE_ADDRESS,
  DELETE_ADDRESS,
} from './constants';

export const getAddress = payload => dispatch =>
  dispatch({
    type: GET_ADDRESS_REQUEST,
    meta: api.address
      .getAddress(payload)
      .then(response =>
        dispatch({
          type: GET_ADDRESS_SUCCESS,
          payload: {
            ...payload,
            ...response.data,
          },
        })
      )
      .catch(error =>
        dispatch({
          type: GET_ADDRESS_ERROR,
          payload: error.response.data,
        })
      ),
  });

export const editAddress = payload => dispatch =>
  dispatch({
    type: EDIT_ADDRESS_REQUEST,
    meta: api.address
      .getAddress(payload)
      .then(response => {
        dispatch({
          type: EDIT_ADDRESS_SUCCESS,
          payload: {
            ...payload,
            ...response.data,
          },
        });

        dispatch(action.layout.closeModal());
      })
      .catch(error =>
        dispatch({
          type: EDIT_ADDRESS_ERROR,
          payload: error.response.data,
        })
      ),
  });

export const completeAddress = payload => dispatch =>
  dispatch({
    type: COMPLETE_ADDRESS,
    payload: {
      address_index: payload.address_index,
      completed: payload.completed,
    },
  });

export const deleteAddress = payload => dispatch =>
  dispatch({
    type: DELETE_ADDRESS,
    payload: {
      address_index: payload.address_index,
    },
  });
