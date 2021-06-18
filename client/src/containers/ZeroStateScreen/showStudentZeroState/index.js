import React from 'react'
import {useDispatch} from "react-redux"
import {SET_QUERY_RESULT_TO_NULL} from "actions/constants"
import history from '../../../history'
import './index.scss'
import zeroSearchResult from 'images/zeroSearchResult.svg';
import { Row } from 'antd';
import { PrimaryButton } from 'components/Buttons';

const ZeroStateSearchResult = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch({type: SET_QUERY_RESULT_TO_NULL})
    history.push("/home")
  }

  return ( 
    <Row  justify="center">
        <div className="zero-state-show-student">
          <h2 style={{marginTop: '30px', textAlign: 'center'}}>No results found</h2>
          <PrimaryButton onClick={handleOnClick} style={{margin: '30px 80px'}}>Go to Home</PrimaryButton>
          <img src={zeroSearchResult} style={{height: '350px', marginTop: '20px'}} alt="zeroStateSVG" />
        </div>
    </Row>
  )
}

export default ZeroStateSearchResult
