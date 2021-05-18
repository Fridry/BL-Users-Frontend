/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { api } from '../../services/api'

import {
  Table,
  Button,
  message,
  Space,
  Popconfirm,
  Input,
  Row,
  Col
} from 'antd'
import { Typography } from 'antd'

import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import AddUserDrawer from './AddUserDrawer'

const { Search } = Input
const { Title } = Typography

export interface IUser {
  _id?: string
  key?: string
  name: string
  lastname: string
  phone: string
  cpf: string
}

const Content = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<Partial<IUser>>({})
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const loadData = async () => {
    setLoading(true)

    const response = await api.get('/user')

    setUsers(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (cpf: string) => {
    try {
      await api.delete(`/user/${cpf}`)

      loadData()

      message.info('Usuário excluido com sucesso.')
    } catch (error) {
      message.error('Erro ao excluir usuário, tente novamente.')
    }
  }

  const onSearch = async (cpf: string) => {
    if (cpf) {
      setLoading(true)
      try {
        const response = await api.get(`/user/${cpf}`)

        const foundUser = [response.data]

        setUsers(foundUser)
      } catch (error) {
        message.error(`Usuário com o CPF ${cpf} não encontrado.`)
      }
      setLoading(false)
    } else {
      loadData()
    }
  }

  const actions = (record: IUser) => {
    return (
      <Space>
        <Button
          type='primary'
          icon={<EditOutlined />}
          style={{ background: '#ffec3d', border: 'none' }}
          title='Editar'
          onClick={() => {
            setSelectedUser(record)
            setVisible(true)
          }}
        />

        <Popconfirm
          title='Deseja excluir este registro?'
          onConfirm={() => handleDelete(record.cpf)}
        >
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            title='Excluir'
          />
        </Popconfirm>
      </Space>
    )
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: any) => text + ' ' + row.lastname,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf'
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: string, record: IUser) => actions(record)
    }
  ]

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Cadastro de usuários
      </Title>
      <Row>
        <Col span={12}>
          <Search
            placeholder='Pesquisar CPF'
            onSearch={(value) => onSearch(value)}
            allowClear
            enterButton
          />
        </Col>
        <Col span={12}>
          <Button
            onClick={() => setVisible(true)}
            icon={<PlusOutlined />}
            type='primary'
            style={{ marginBottom: 16, float: 'right' }}
          >
            Adicionar usuário
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={users}
        columns={columns}
        bordered
        size='small'
        rowKey='_id'
        loading={loading}
      />

      <AddUserDrawer
        visible={visible}
        setVisible={setVisible}
        loadData={loadData}
        data={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  )
}

export default Content
