import React from 'react'
import "./index.scss"
import signinSVG from "images/signin.svg"

import { Row, Col, Form } from 'antd'
import { PrimaryButton} from 'components/Buttons';
import {Input, InputPassword} from "components/Input";

import useWindowDimensions from 'hooks/windowDimension';

const SignIn = () => {

  const { height, width } = useWindowDimensions();

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
        <div className="signin-inner-container-right">
          <h1>Signin</h1>
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
              <PrimaryButton style={{width: "500px"}}>Signin</PrimaryButton>
            </Form.Item>
              <p>Don't have an Account? Signup</p>
          </Form>
        </div>
      </div>
    </Col>
  </Row>
  )
}

export default SignIn
