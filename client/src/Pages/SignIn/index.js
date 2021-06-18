import React from 'react'
import "./index.scss"
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from 'antd'
import { PrimaryButton} from 'components/Buttons';
import {Input, InputPassword} from "components/Input";
import signinSVG from "images/signin.svg"

import {signin} from "actions/auth";

import useWindowDimensions from 'hooks/windowDimension';

const SignIn = () => {
  const dispatch = useDispatch();
  const { control, errors, handleSubmit } = useForm();

  const { height } = useWindowDimensions();

  const onSubmit = (user) => {
    dispatch(signin(user))
  }; 

  return (
    <Row>
    <Col span={12}>
      <Row justify="end">
          <div className="signin-container-left" style={{height}}>
            <div className="signin-inner-container-left">

            <img src={signinSVG} alt="signinSVG" style={{height: "300px"}} />
            <h2 style={{marginTop:"30px"}}>Manage Your Students...</h2>

            </div>
          </div>
      </Row>
      </Col>
    <Col span={12}>
      <div className="signin-container-right" style={{height}}>
        <div className="signin-inner-container-right" style={{width: "500px"}}>
          <h1>Signin</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item>
              <h3>Email</h3>
              <Controller 
                name="email"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={props => <Input onChange={e => props.onChange(e.target.value)} placeholder='email' style={{width: "500px"}}/>}
              />
              {errors.email && <span className="signin-required">*This field is required</span>}
            </Form.Item>
            <Form.Item>
              <h3>Password</h3>
              <Controller 
                style={{display: "block"}}
                name="password"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={props => 
                  <InputPassword onChange={e => props.onChange(e.target.value)} autoComplete="on" placeholder='*******' style={{width: "500px"}}/>
                }
              />
               {errors.password && <span className="signin-required">*This field is required</span>}
            </Form.Item>
            <Form.Item>
              <PrimaryButton htmlType="submit" style={{width: "500px"}}>Signin</PrimaryButton>
            </Form.Item>
              <p>Don't have an account? <Link to="/signup" className="signup-link">Signup</Link></p>
          </form>
        </div>
      </div>
    </Col>
  </Row>
  )
}

export default SignIn
