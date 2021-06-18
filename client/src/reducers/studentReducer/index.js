import {
  GET_STUDENTS,
  SET_CURRENT_STUDENT,
  SET_QUERY_RESULT,
  SET_QUERY_RESULT_TO_NULL
} from "actions/constants";

const initialState = {
  students : null,
  currentStudent: null,
  searchResult: null
};

const students = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students : action.payload
      };
    case SET_CURRENT_STUDENT:
      return {
        ...state,
        currentStudent: action.payload
      }
    case SET_QUERY_RESULT:
      return {
        ...state,
        searchResult: action.payload
      }
    case SET_QUERY_RESULT_TO_NULL:
      return{
        ...state,
        searchResult: null
      }
    default:
      return state;
  }
};

export default students;
