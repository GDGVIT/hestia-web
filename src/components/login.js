import React from 'react'
 
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import google from '../assets/group.png';
import logo from '../assets/group_5.png';


const Login = (props) => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
    props.history.push("/feed");
  };

  return (
    <div className="loginpage">
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
                Login with <img src={google} alt="login with google"></img>
            </Button>
        </Form.Item>
        <Form.Item className="already">
        Dont have an account? <Link to="/register">Register!</Link>
        </Form.Item>

    </Form>
    </div>

  );
};

export default Login;