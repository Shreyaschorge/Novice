import {
  CURRENT_USER, SIGNOUT
} from "actions/constants";

const initialState = {
  currentUser : null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser : action.payload
      };

    case SIGNOUT:
      return {
        ...state,
        currentUser : null
      };

    default:
      return state;
  }
};

export default auth;
