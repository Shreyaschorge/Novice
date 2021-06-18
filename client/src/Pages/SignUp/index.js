import React from 'react'
import "./index.scss"
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, notification } from 'antd'
import { PrimaryButton } from 'components/Buttons';
import {Input, InputPassword} from "components/Input";
import signupSVG from "images/signup.svg";

import {signup} from "actions/auth";

import useWindowDimensions from 'hooks/windowDimension';

const SignUp = () => {
  const dispatch = useDispatch();
  const { control, errors, handleSubmit } = useForm();

  const { height } = useWindowDimensions();

  const onSubmit = (user) => {
    if(user.password !== user.cpassword){
      notification.error({
        message: "Password not matching",
        placement: "bottomRight"
      })
    } else {
      dispatch(signup(user))
    }
  };  

  return (
    <Row>
    <Col span={12}>
      <Row justify="end">
          <div className="signup-container-left" style={{height}}>
            <div className="signup-inner-container-left">

            <img src={signupSVG} alt="signupSVG" style={{height: "400px"}} />
            <h2 style={{marginTop:"30px"}}>Manage Your Students...</h2>

            </div>
          </div>
      </Row>
      </Col>
    <Col span={12}>
      <div className="signup-container-right" style={{height}}>
        <div className="signup-inner-container-right" style={{width: "500px"}}>
          <h1>Signup</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item >
              <h3>Email</h3>
              <Controller
                name="email"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={props => <Input onChange={e => props.onChange(e.target.value)} placeholder='email' style={{width: "500px"}}/>}
              />
              {errors.email && <span className="signup-required">*This field is required</span>}
            </Form.Item>
            <Form.Item>
              <h3>Password</h3>
              <Controller 
                name="password"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={props => <InputPassword onChange={e => props.onChange(e.target.value)} autoComplete="on" placeholder='*******' style={{width: "500px"}}/>}
              />
              {errors.password && <span className="signup-required">*This field is required</span>}
            </Form.Item>
            <Form.Item>
              <h3>Confirm Password</h3>
              <Controller 
                name="cpassword"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={props => <InputPassword onChange={e => props.onChange(e.target.value)} autoComplete="on" placeholder='*******' style={{width: "500px"}}/>}
              />
              {errors.cpassword && <span className="signup-required">*This field is required</span>}
            </Form.Item>
            <Form.Item>
              <PrimaryButton htmlType="submit" style={{width: "500px"}}>Signup</PrimaryButton>
            </Form.Item>
              <p>Already have an account? <Link to="signin" className="signin-link">Signin</Link></p>
          </form>
        </div>
      </div>
    </Col>
  </Row>
  )
}

export default SignUp
