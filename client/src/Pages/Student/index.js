import React, {useEffect, useState} from 'react';
import history from '../../history';
import './index.scss';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';

import {ArrowLeftOutlined} from "@ant-design/icons"
import { Avatar, Image, Row, Col } from 'antd'
import { PrimaryButton, SecondaryButton } from 'components/Buttons';

import useWindowDimensions from 'hooks/windowDimension';
import { showStudent, deleteStudent } from 'actions/student';

import Loading from 'containers/Loading';
import EditStudentModal from 'containers/EditStudentModal';

const Student = () => {
  const {currentStudent} = useSelector(state => state.students);
  const dispatch = useDispatch();
  const location = useLocation();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  const { height } = useWindowDimensions();

  useEffect(() => {
    location.state && dispatch(showStudent(location.state.id));
  },[dispatch, location.state]);

  const handleDelete = () => {
    dispatch(deleteStudent(location.state.id));
    history.push("/home")
  }

  const getStudent = () => {
    return (
      currentStudent ? 
      (<div>
      <div className="student-go-back">
        <Link to="/home" className="student-go-back-arrow">
          <ArrowLeftOutlined />
        </Link>
      </div>
      <Row>
        <Col span={8} className="student-container">
          <div className="student-container-left" style={{height}}>
            <div className="student-inner-container-left">

            <Avatar
            size={280}
            src={<Image src={currentStudent.imageURL}/>}
            />
            <h1 style={{marginTop:"30px"}}>{currentStudent.name}</h1>

            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="student-container-right" style={{height}}>
            <div className="student-inner-container-right">
              <h2>Email</h2>
              <p>{currentStudent.email}</p>
              <h2>Branch</h2>
              <p>{currentStudent.branch}</p>
              <h2>Address</h2>
              <p>{currentStudent.address}</p>
              <h2>Scores</h2>
              <p>{currentStudent.score}</p>
              <div>
              <SecondaryButton onClick={showModal} style={{marginRight: "10px"}}>Edit</SecondaryButton>
              <PrimaryButton onClick={handleDelete}>Delete</PrimaryButton>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <EditStudentModal 
        currentStudent={currentStudent}
        destroyOnClose={true}
        title="Edit Student"
        visible={visible}
        onCancel={handleCancel}
        setVisible={setVisible}
        footer={null}
      />  
    </div>) : <Loading/>
    )
  }

  return (
    <>
      {currentStudent ? getStudent() : <Loading />}
      
    </>
  )
}

export default Student
