import axios from 'axios';
import history from '../history';
import { notification } from 'antd';
import {currentuser} from "utils/currentUser";

import { CURRENT_USER, SET_ERRORS, SIGNOUT } from 'actions/constants';

// -------------------------------------------------------
    // /api => /api
// -------------------------------------------------------

export const signup = (user) => async (dispatch) => {
  try {
    
    const {data} = await axios.post("/api/signup", user);
    currentuser.set = data;
    dispatch({
      type: CURRENT_USER,
      payload: data
    });
    notification.success({
      message: "Account created successfully",
      placement: "bottomRight"
    });
    history.push("/home");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const signin = (user) => async (dispatch) => {
  try{
    const {data} = await axios.post("/api/signin", user);
    currentuser.set = data;
    dispatch({
      type: CURRENT_USER,
      payload: data
    });
    notification.success({
      message: "Signed in successfully",
      placement: "bottomRight"
    });
    history.push("/home");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const signout = () => async (dispatch) => {
  try {
    await axios.get("/api/signout");
    currentuser.remove();
    dispatch({
      type: SIGNOUT
    })
    notification.success({
      message: "Signout out successfully",
      placement: "bottomRight"
    })
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}