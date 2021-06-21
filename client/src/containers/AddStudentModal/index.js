import React, {useState} from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { Form } from 'antd';
import { Modal } from 'components/Modal';
import { Input, TextArea } from 'components/Input';
import Cascader from 'components/Cascader';
import {PrimaryButton, SecondaryButton} from "components/Buttons"

import { branches } from 'utils/branches';

import {addStudent} from "actions/student";

const AddStudentModal = (props) => {

  const dispatch = useDispatch();

  const [branch, setBranch] = useState("Not Assigned");

  const { control, errors, handleSubmit } = useForm();

  const onSubmit = (user) => {
    user.branch = branch;
    user.score = parseFloat(user.score);
    console.log(user)
    dispatch(addStudent(user));
    props.setVisible(false)
  }; 

  const onChange = (value) => {
    setBranch(...value)
  }

  return (
    <Modal {...props}
    >
      <div style={{ padding: 25 }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Form.Item>
            <Controller 
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={props => <Input  onChange={e => props.onChange(e.target.value.trim())} placeholder="Name" />}
              />
              {errors.name && <span className="required">*This field is required</span>}
          </Form.Item>
          <Form.Item>
            <Controller 
                name="email"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={props => <Input onChange={e => props.onChange(e.target.value.trim())} placeholder="Email" />}
              />
              {errors.email && <span className="required">*This field is required</span>}
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              <Controller 
                name="branch"
                control={control}
                render={props => <Cascader onChange={onChange} options={branches} placeholder="Branch"/>}
              />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              <Controller 
                name="score"
                control={control}
                defaultValue=""
                rules={{required: true}}
                htmlType="number"
                render={props => <Input onChange={e => props.onChange(e.target.value)} placeholder="Score in %"/>}
              />
              {errors.score && <span className="required">*This field is required</span>}
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Controller 
                name="address"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={props => <TextArea onChange={e => props.onChange(e.target.value.trim())} placeholder="Address" />}
              />
              {errors.address && <span className="required">*This field is required</span>}
          </Form.Item>
          <div style={{marginTop : "25px"}}>
          <SecondaryButton onClick={() => {props.setVisible(false)}} style={{marginRight : "10px"}}>Cancel</SecondaryButton>
          <PrimaryButton htmlType="submit"> Submit </PrimaryButton>
          </div>
          
        </form>
     
      </div>
     </Modal>
  )
}

export default AddStudentModal
