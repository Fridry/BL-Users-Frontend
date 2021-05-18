import React, { ReactElement } from 'react'
import { Layout } from 'antd'

import Header from '../Header'
import Footer from '../Footer'

import './styles.css'

const { Content } = Layout

interface AuxProps {
  children: ReactElement | ReactElement[]
}

const Container = ({ children }: AuxProps) => {
  return (
    <Layout className='layout'>
      <Header />

      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='content'>{children}</div>
      </Content>

      <Footer />
    </Layout>
  )
}

export default Container
