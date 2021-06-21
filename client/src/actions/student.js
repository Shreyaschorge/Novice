import axios from 'axios';
import {notification} from 'antd';

import {SET_ERRORS, GET_STUDENTS, SET_CURRENT_STUDENT, SET_QUERY_RESULT} from "actions/constants";

export const addStudent = (user) => async (dispatch) => {
  try {
    await axios.post('/api/student', user);
    notification.success({
      message: "Student Added Successfully",
      placement: "bottomRight"
    })
    dispatch(getStudents());
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const getStudents = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/student');
    dispatch({
      type: GET_STUDENTS,
      payload: data
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const showStudent = (id) => async (dispatch) => {
  try{
    const {data} = await axios.get(`/api/student/${id}`);
    dispatch({
      type: SET_CURRENT_STUDENT,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const editStudent = (id, user) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/student/${id}`, user);
    dispatch({
      type: SET_CURRENT_STUDENT,
      payload: data
    })
    dispatch(getStudents())
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const searchStudent = (query) => async (dispatch) => {
  try{
    const {data} = await axios.get('/api/search', { params: { name: query } });
    dispatch({
      type: SET_QUERY_RESULT,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
} 

export const deleteStudent = (id) => async (dispatch) => {
  try{
    await axios.delete(`/api/student/${id}`);
    dispatch(getStudents());
    notification.success({
      message: "Student deleted successfully",
      placement: "bottomRight"
    })
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}

export const deleteAllStudents = () => async (dispatch) => {
  try{
    await axios.delete("/api/student");
    dispatch(getStudents());
    notification.success({
      message: "All students deleted successfully",
      placement: "bottomRight"
    })
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data.errors
    })
  }
}