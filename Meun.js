import React from 'react';
import { Menu } from 'antd';
import { PieChartOutlined, BarChartOutlined } from '@ant-design/icons';

const AppMenu = ({ currentView, setCurrentView }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[currentView]}
      onSelect={({ key }) => setCurrentView(key)}
    >
      <Menu.Item key="sales" icon={<BarChartOutlined />}>
        产品销售数据
      </Menu.Item>
      <Menu.Item key="users" icon={<PieChartOutlined />}>
        用户增长数据
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;