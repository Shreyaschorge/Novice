import React from 'react'
import './index.scss'
import {MoreOutlined} from '@ant-design/icons'
import {Card as AntCard, Avatar, Image, Menu, Tooltip} from 'antd'
import { PrimaryButton } from 'components/Buttons';

const Card = () => {

  const { Meta } = AntCard;

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          Edit
        </Menu.Item>
        <Menu.Item>Delete</Menu.Item>
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
            src={<Image src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />}
          />

          <h2>Stephane Grider</h2>
          <span style={{color: '#a89fc2'}}>stephanegrider@gmail.com</span>
          <h3>IT</h3>
          <PrimaryButton>View Profile</PrimaryButton>
        </div>
      </AntCard>
    </div>
  )
}

export default Card
