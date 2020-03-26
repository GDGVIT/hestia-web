import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
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
    email: 'Not a validate email!',
    number: 'Not a validate number!',
  },
  number: {
    range: 'Must be 10 digits!',
  },
};

const Register = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
      <div>
      <div>
          <img src={logo} alt="Hestialogo"></img>
      </div>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name={['user', 'number']}
        label="Number"
        rules={[
          {
            type: 'number',
            min: 1000000000,
            max: 10000000000,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
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