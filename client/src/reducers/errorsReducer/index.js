import { SET_ERRORS } from 'actions/constants';

const initialState = {
  errors : null,
};

const errors = (state = initialState, action) => {

  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors : action.payload
      };

    default:
      return state;
  }
};

export default errors;