import React, { InputHTMLAttributes, useEffect } from 'react'
import { Drawer, Button, Col, Row, Input, Form, Divider, message } from 'antd'

import { api } from '../../../services/api'
import { IUser } from '..'

interface DrawerProps extends InputHTMLAttributes<HTMLInputElement> {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  loadData: () => void
  data?: Partial<IUser>
  setSelectedUser: React.Dispatch<React.SetStateAction<{}>>
}

const DrawerComponent: React.FC<DrawerProps> = ({
  visible,
  setVisible,
  loadData,
  data,
  setSelectedUser
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data, form])

  const onClose = () => {
    form.resetFields()
    setSelectedUser({})
    setVisible(false)
  }

  const onFinishForm = (values: any) => {
    if (data?.cpf) {
      api
        .put(`/user/${values.cpf}`, values)
        .then(function () {
          message.success('Usuário atualizado com sucesso')
          loadData()
          onClose()
        })
        .catch(function (error) {
          message.error(error.response.data.msg)
        })
    } else {
      api
        .post('/user', values)
        .then(function () {
          message.success('Usuário cadastrado com sucesso')
          loadData()
          onClose()
        })
        .catch(function (error) {
          message.error(error.response.data.msg)
        })
    }
  }

  return (
    <>
      <Drawer
        title={data?.cpf ? 'Atualizar usuário' : 'Adicionar usuário'}
        placement='right'
        width={500}
        closable
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout='vertical'
          hideRequiredMark
          form={form}
          onFinish={onFinishForm}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='name'
                label='Nome'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o nome do usuário.'
                  }
                ]}
              >
                <Input placeholder='Nome' />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name='lastname'
                label='Sobrenome'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o sobrenome do usuário.'
                  }
                ]}
              >
                <Input placeholder='Sobrenome' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='phone'
                label='Telefone'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o telefone do usuário.'
                  }
                ]}
              >
                <Input style={{ width: '100%' }} type='tel' />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name='cpf'
                label='CPF'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o CPF do usuário.'
                  },
                  {
                    len: 11,
                    message: 'O CPF deve conter 11 caracteres.'
                  }
                ]}
              >
                <Input style={{ width: '100%' }} type='number' />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button type='primary' htmlType='submit' block>
                  {data?.cpf ? 'Atualizar' : 'Salvar'}
                </Button>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Button onClick={onClose} block>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default DrawerComponent
