import React from 'react'
 
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';

import logo from '../assets/group_5.png';


const Login = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
    <div className="hestia-logo">
        <img src={logo} alt="Hestialogo"></img>
    </div>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            <Button type="dashed" className="oauth">
                Login with G 
            </Button>
        </Form.Item>
        <Form.Item>
        Dont have an account? <Link to="/register">Register!</Link>
        </Form.Item>

    </Form>
    </div>

  );
};

export default Login;