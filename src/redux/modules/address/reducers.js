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

import initialStates from '../initialStates';

export default function reducer(state = initialStates.address, action) {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EDIT_ADDRESS_REQUEST:
      return {
        ...state,
        editLoading: true,
        editError: null,
      };

    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [
          ...state.items,
          {
            name: action.payload.name,
            address: action.payload.geocoded_address,
          },
        ],
      };

    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item, i) =>
          i === action.payload.address_index
            ? {
                name: action.payload.name,
                address: action.payload.geocoded_address,
              }
            : item
        ),
      };

    case GET_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EDIT_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        editError: action.payload,
      };

    case COMPLETE_ADDRESS:
      return {
        ...state,
        items: state.items.map((item, i) =>
          i === action.payload.address_index
            ? { ...item, completed: action.payload.completed }
            : item
        ),
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        items: state.items.filter(
          (item, i) => i !== action.payload.address_index
        ),
      };

    default:
      return state;
  }
}
