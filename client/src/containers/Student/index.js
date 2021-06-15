import React from 'react';
import './index.scss';

import { Avatar, Image, Row, Col } from 'antd'
import { PrimaryButton, SecondaryButton } from 'components/Buttons';

import useWindowDimensions from 'hooks/windowDimension';

const Student = () => {

  const { height, width } = useWindowDimensions();

  return (
    <div>

      <Row>
        <Col span={8} className="student-container">
          <div className="student-container-left" style={{height}}>
            <div className="student-inner-container-left">

            <Avatar
            size={280}
            src={<Image src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>}
            />
            <h1 style={{marginTop:"30px"}}>Stephane Grider</h1>

            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="student-container-right" style={{height}}>
            <div className="student-inner-container-right">
              <h2>Email</h2>
              <p>stephanegrider@gmail.com</p>
              <h2>Branch</h2>
              <p>Information Technology</p>
              <h2>Address</h2>
              <p>B/501, Balaji CHS, Old Mumbai Pune Road, Dattawadi, Karegaon, Kalwa (W), Thane 400 605</p>
              <h2>Scores</h2>
              <p>97%</p>
              <div>
              <SecondaryButton style={{marginRight: "10px"}}>Edit</SecondaryButton>
              <PrimaryButton>Delete</PrimaryButton>
              </div>
            </div>
          </div>
        </Col>
      </Row>  
    </div>
  )
}

export default Student
