import React, { useState } from 'react';
import { Layout } from 'antd';
import Menu from './components/Meun.js';
import ChartContainer from './components/ChartContainer';
import './App.css';

const { Header, Content, Sider } = Layout;

function App() {
  const [currentView, setCurrentView] = useState('sales');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu currentView={currentView} setCurrentView={setCurrentView} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <ChartContainer chartType={currentView} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;


