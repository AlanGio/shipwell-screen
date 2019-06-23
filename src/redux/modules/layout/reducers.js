import { OPEN_MODAL, CLOSE_MODAL } from './constants';
import initialStates from '../initialStates';

export default function reducer(state = initialStates.layout, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        modal: {
          name: action.payload.name,
          data: action.payload.data || {},
        },
      };

    case CLOSE_MODAL:
      return initialStates.layout;

    default:
      return state;
  }
}
