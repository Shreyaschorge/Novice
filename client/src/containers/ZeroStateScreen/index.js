import React from 'react'
import './index.scss'
import zeroStateSVG from 'images/zeroStateSVG.svg';
import { Row } from 'antd';
import { PrimaryButton } from 'components/Buttons';

const ZeroStateScreen = () => {
  return ( 
    <Row  justify="center">
      {/* <Col  span={24}> */}
        <div className="zero-state-screen">
          <h2 style={{marginTop: '30px'}}>You Don't Have Any Students Yet... </h2>
          <PrimaryButton style={{margin: '30px 60px'}}>Add Student</PrimaryButton>
          <img src={zeroStateSVG} style={{height: '350px', marginTop: '20px'}} alt="zeroStateSVG" />
        </div>
      {/* </Col> */}
    </Row>
  )
}

export default ZeroStateScreen
