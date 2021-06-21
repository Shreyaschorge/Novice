import React from 'react';
import './index.scss';
import { Modal as AntdModal } from 'antd';

export const Modal = (props) => {
  return(
    <AntdModal
      className={'primaryModal'}
      cancelButtonProps={{className: 'secondaryButton'}}
      {...props}
    >
      {props.children}
    </AntdModal>
  )
}