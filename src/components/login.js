import React, {useEffect} from 'react';
import { useAlert } from 'react-alert';
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import google from '../assets/group.png';
import logo from '../assets/group_5.png';


const Login = (props) => {
  const alert = useAlert()
  const onFinish = values => {
    if(values.user.password.length < 8){
      alert.show("Wrong password")
    }
    let authcheck = false;
    console.log('Received values of form: ', values)
    return fetch("https://hestia-auth.herokuapp.com/api/user/login", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values.user), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
          authcheck = true;
        return response.json();
        }else{
          // console.log(response)
          alert.show(response.statusText)
        }
        })
      .then(data => {
          if(authcheck){
          window.localStorage.setItem("token", data.Token);
          props.history.push("/feed");
          }
          // props.history.push("/feed");
        })
       .catch(error => console.error(error)
       );
    };

    useEffect(() => {
        if(localStorage.getItem("token")){
            props.history.push("/feed")
        }
      });

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
        name={['user', 'email']}
        rules={[
          {
            type: 'email',  
            required: true,
            message: 'Please input a valid Email!',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
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
        <Link to="/register">Don't have an account? Register!</Link>
        </Form.Item>

    </Form>
    </div>

  );
}

export default Login;