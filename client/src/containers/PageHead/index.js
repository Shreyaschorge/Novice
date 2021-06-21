import React from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';

import {MoreOutlined, LogoutOutlined, DeleteOutlined, UserAddOutlined} from '@ant-design/icons'
import { PageHeader, Row, Statistic, Menu, Tooltip, Popconfirm} from 'antd';

import { signout } from 'actions/auth';
import { deleteAllStudents, searchStudent } from 'actions/student';

import { InputSearch } from 'components/Input';

const PageHead = ({showModal}) => {

  const {students} = useSelector(state => state.students);
  const dispatch = useDispatch()

  const handleDeleteAll = () => {
    dispatch(deleteAllStudents())
  }

  const onSignout = () => {
    dispatch(signout())
  }

  const getDeleteButton = () => {
    if(students){
      if(students.length !== 0){
        return (<Popconfirm title="Are You Sure..?" placement = "left" onConfirm={handleDeleteAll}>
        <Menu.Item key="delete all students">
          Delete All Students {" "} 
          <DeleteOutlined />
        </Menu.Item>
        </Popconfirm>)
      } else return <></>
    }
  }

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item key="addStudent" onClick={showModal}>
          Add Students {" "} <UserAddOutlined />
        </Menu.Item>
        {getDeleteButton()}
        
        <Menu.Item key="logout" onClick={onSignout}>Logout {" "} <LogoutOutlined /></Menu.Item>
      </Menu>
    )
  }

  const getAvgScore = () => {
    if(students){
      let score = 0;
      students.forEach(element => {
        score = score + element.score;
      });
      return students.length === 0 ? 0 : (score/students.length).toFixed(2);
    }
  }

  const getTotalStudents = () => {
    if(students){
      return students.length
    }
  }

  const onSearch = (val) => {
    if(val.length > 0) dispatch(searchStudent(val.trim()))
  }

  return (
  <>
    <PageHeader
        className="site-page-header"
        title={"Novice"}
        subTitle={<InputSearch loading={false} onSearch={onSearch} placeholder="Search by Name"/>}
        extra={[<Tooltip key="menu" placement="bottom" title={getMenu()} color='#fff'>
        <MoreOutlined style={{fontSize : 27}}/>
      </Tooltip>]}
      >
      <Row>
        <Statistic
          key="Total Student"
          title="Total Students"
          value={getTotalStudents()}
        />
        <Statistic key="Avg Score" title="Avg Score" value={getAvgScore()} 
          style={{
            margin: '0 32px',
          }} />
      </Row>
      </PageHeader>
  </>
  )
}

export default PageHead
