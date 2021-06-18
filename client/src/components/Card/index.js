import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import './index.scss'
import {MoreOutlined} from '@ant-design/icons'
import {Card as AntCard, Avatar, Image, Menu, Tooltip} from 'antd'
import { PrimaryButton } from 'components/Buttons';

import { deleteStudent } from 'actions/student';

import EditStudentModal from 'containers/EditStudentModal';

const Card = (props) => {

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const { name, email, imageURL, branch, id } = props.student

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    dispatch(deleteStudent(id));
  }

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item key="edit" onClick={showModal}>
          Edit
        </Menu.Item>
        <Menu.Item key="delete" onClick={handleDelete}>Delete</Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{width: 'auto'}}>
      <AntCard
        hoverable
        style={{ width: 250 }}
      >        
        <div className="card-container">
          <div className='options'>
            <Tooltip placement="bottom" title={getMenu()} color='#fff'>
              <MoreOutlined style={{fontSize : 23}}/>
            </Tooltip>
          </div>
          <Avatar
            size={100}
            src={<Image src={imageURL} />}
          />

          <h2 className="student-card-name">{name}</h2>
          <span style={{color: '#a89fc2'}}>{email}</span>
          <h3 style={{textAlign: "center"}}>{branch}</h3>
          <PrimaryButton > <Link className="card-link" to={{pathname: "/student", state: {id} }}>View Profile</Link></PrimaryButton>
        </div>
      </AntCard>
      <EditStudentModal 
        currentStudent={props.student}
        destroyOnClose={true}
        title="Edit Student"
        visible={visible}
        onCancel={handleCancel}
        setVisible={setVisible}
        footer={null}
      />  
    </div>
  )
}

export default Card
