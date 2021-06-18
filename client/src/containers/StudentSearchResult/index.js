import React from 'react'
import "./index.scss"
import { useDispatch } from 'react-redux';
import { SET_QUERY_RESULT_TO_NULL } from "actions/constants";
import Card from 'components/Card';
import { PrimaryButton } from 'components/Buttons';
import useWindowDimensions from 'hooks/windowDimension';

const StudentSearchResult = ({students}) => {

  const dispatch = useDispatch();

  const {height} = useWindowDimensions();

  return (
    <>
    <div className="search-result-go-back" style={{display: "inlineBlock", height}}>
      <PrimaryButton onClick={() => dispatch({type: SET_QUERY_RESULT_TO_NULL})} style={{margin: "156px 20px 0px 0px"}} >Show All Students</PrimaryButton>
    </div>
    <div className='container'>
      <div className="card-list">
        {students.map((student) => {
          return <Card key={student.email} student={student}/>
        })}
      </div>
    </div>
    </>
  )
}

export default StudentSearchResult
