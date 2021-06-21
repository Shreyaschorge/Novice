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

import {editStudent} from "actions/student";

const EditStudentModal = (props) => {

  const dispatch = useDispatch();

  const {name, email, branch, score, address, imageURL, id} = props.currentStudent
  const [_branch, setBranch] = useState(branch);

  const { control, errors, handleSubmit } = useForm();

  const onSubmit = (user) => {
    user.branch = _branch;
    user.imageURL = imageURL;
    user.score = parseFloat(user.score);
    dispatch(editStudent(id, user));
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
                defaultValue={name}
                passRef={true}
                rules={{ required: true }}
                render={(props) => <Input defaultValue={name} onChange={e => props.onChange(e.target.value)} placeholder="name" />}
              />
              {errors.name && <span className="required">*This field is required</span>}
          </Form.Item>
          <Form.Item>
            <Controller 
                name="email"
                control={control}
                defaultValue={email}
                rules={{required: true}}
                render={(props) => <Input defaultValue={email} onChange={e => props.onChange(e.target.value)} placeholder="Email" />}
              />
              {errors.email && <span className="required">*This field is required</span>}
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              <Controller 
                name="branch"
                control={control}
                defaultValue={[branch]}
                render={(props) => <Cascader defaultValue={[branch]} onChange={onChange} options={branches} placeholder="Branch"/>}
              />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              <Controller 
                name="score"
                control={control}
                defaultValue={score}
                rules={{required: true}}
                htmlType="number"
                render={(props) => <Input defaultValue={score} onChange={e => props.onChange(e.target.value)} placeholder="Score in %" />}
              />
              {errors.score && <span className="required">*This field is required</span>}
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Controller 
                name="address"
                control={control}
                rules={{required: true}}
                defaultValue={address}
                render={(props) => <TextArea defaultValue={address} onChange={e => props.onChange(e.target.value)} placeholder="Score in %" />}
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

export default EditStudentModal
