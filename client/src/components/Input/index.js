import React from 'react';
import './index.scss';
import { Input as AntdInput } from 'antd';

export const Input = (props) => {
  return(
    <AntdInput className='inputPrimary' {...props}>
      {props.children}
    </AntdInput>
  )
}


export const TextArea = (props) => {
  return(
    <AntdInput.TextArea className='textarea' rows={3}  {...props}>
      {props.children}
    </AntdInput.TextArea>
  )
}


export const InputSearch = (props) => {
  return(
    <AntdInput.Search style={{resize: 'none'}} {...props}>
      {props.children}
    </AntdInput.Search>
  )
}

export const InputPassword = (props) => {
  return(
    <AntdInput.Password style={{resize: 'none'}} {...props}>
      {props.children}
    </AntdInput.Password>
  )
}