import { Layout, Menu } from 'antd'

import './styles.css'

const { Header } = Layout

const HeaderComponent = () => {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
        <Menu.Item key='1'>Home</Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderComponent
