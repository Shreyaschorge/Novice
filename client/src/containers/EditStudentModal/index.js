import React from 'react';
import './index.scss';
import { Form } from 'antd';
import { Modal } from 'components/Modal';
import { Input, TextArea } from 'components/Input';
import Cascader from 'components/Cascader';

const EditStudentModal = (props) => {
  const branches = [
    {
      value: 'Information Technology',
      label: 'Information Technology'
    },
    {
      value: 'Computer Science',
      label: 'Computer Science'
    },
    {
      value: 'Mechanical Engineering',
      label: 'Mechanical Engineering'
    },
    {
      value: 'Electronics and Communication',
      label: 'Electronics and Communication'
    },
    {
      value: 'Civil Engineering',
      label: 'Civil Engineering'
    },
  ]

  const onChange = (value) => {
    console.log(value)
  }

  return (
    <Modal {...props}>
      <div style={{ padding: 25 }}>
        <Form >
          <Form.Item>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="email" />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              <Cascader options={branches} onChange={onChange}/>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              <Input placeholder="score"/>
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <TextArea placeholder="address" />
          </Form.Item>
        </Form>
     
      </div>
     </Modal>
  )
}

export default EditStudentModal
