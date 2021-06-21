import React from 'react'
import './index.scss'
import {Menu as AntMenu} from 'antd'

export const Menu = (props) => {
  return (
    <AntMenu>
      {props.children}
    </AntMenu>
  )
}

export const MenuItem = (props) => {
  return (<AntMenu.Item>{props.children}</AntMenu.Item>)
}


