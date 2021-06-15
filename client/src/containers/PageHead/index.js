import React from 'react';
import './index.scss';

import {MoreOutlined, LogoutOutlined, DeleteOutlined, UserAddOutlined} from '@ant-design/icons'
import { PageHeader, Row, Statistic, Menu, Tooltip} from 'antd';

import { InputSearch } from 'components/Input';
import AddStudentModal from 'containers/AddStudentModal';

const PageHead = () => {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={showModal}>
          Add Students {" "} <UserAddOutlined />
        </Menu.Item>
        <Menu.Item>Delete All Students {" "} <DeleteOutlined /></Menu.Item>
        <Menu.Item>Logout {" "} <LogoutOutlined /></Menu.Item>
      </Menu>
    )
  }

  return (
  <>
    <PageHeader
        className="site-page-header"
        title={"Students"}
        subTitle={<InputSearch loading={false} placeholder="Search Students"/>}
        extra={[<Tooltip placement="bottom" title={getMenu()} color='#fff'>
        <MoreOutlined style={{fontSize : 27}}/>
      </Tooltip>]}
      >
      <Row>
        <Statistic
          title="Total Students"
          value={4}
        />
        <Statistic title="Avg Score" value={65.85} 
          style={{
            margin: '0 32px',
          }} />
      </Row>
      </PageHeader>

      <AddStudentModal 
        title="Add Student"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
  </>
  )
}

export default PageHead
