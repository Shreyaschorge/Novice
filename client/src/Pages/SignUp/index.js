import React from 'react'
import "./index.scss"
import signupSVG from "images/signup.svg"

import { Row, Col, Form } from 'antd'
import { PrimaryButton } from 'components/Buttons';
import {Input, InputPassword} from "components/Input";

import useWindowDimensions from 'hooks/windowDimension';

const SignUp = () => {

  const { height, width } = useWindowDimensions();

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
        <div className="signup-inner-container-right">
          <h1>Signup</h1>
          <Form>
            <Form.Item>
              <h3>Email</h3>
              <Input placeholder='email' style={{width: "500px"}}/>
            </Form.Item>
            <Form.Item>
              <h3>Password</h3>
              <InputPassword placeholder='*******' style={{width: "500px"}}/>
            </Form.Item>
            <Form.Item>
              <h3>Confirm Password</h3>
              <InputPassword placeholder='*******' style={{width: "500px"}}/>
            </Form.Item>
            <Form.Item>
              <PrimaryButton style={{width: "500px"}}>Signup</PrimaryButton>
            </Form.Item>
              <p>Already have an account? Signin</p>
          </Form>
        </div>
      </div>
    </Col>
  </Row>
  )
}

export default SignUp
