import {combineReducers} from 'redux';
import {SIGNOUT} from 'actions/constants';

import auth from 'reducers/authReducer';
import students from 'reducers/studentReducer';
import errors from 'reducers/errorsReducer';

const appReducer = combineReducers({auth, students, errors})

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;