import React from 'react';
import './index.scss';
import { Cascader as AntCascader } from 'antd'

const Cascader = (props) => {

  return (
    <AntCascader {...props} style={{width: 'auto'}}/>
    // <AntCascader options={branches} onChange={onChange} style={{width: 'auto'}}/>
  )
}

export default Cascader
