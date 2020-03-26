import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd';
import logo from '../assets/group_5.png';
import {Link} from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!'
  },
};

const Register = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
      <div>
      <div className="hestia-logo-reg">
          <img src={logo} alt="Hestialogo"></img>
      </div>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className="login-form">
      <Form.Item
        name={['user', 'name']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
        placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input a valid email!'
          },
        ]}
      >
        <Input 
        placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        placeholder="Password"
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
      <Form.Item
        name={['user', 'num']}
        rules={[
          {
            required: true,
            message: 'Please input your Number!',
          },
        ]}
      >
        <Input
        placeholder="Number"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="dashed" className="oauth">
                Login with G 
        </Button>
      </Form.Item>
      <Form.Item>
        Already have an account? <Link to="/Login">Login</Link>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register