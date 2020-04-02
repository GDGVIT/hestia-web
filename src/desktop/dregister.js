import React, {useEffect} from 'react'
import { Form, Input, Button } from 'antd';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
import { useAlert } from 'react-alert';
import { ReCaptcha } from 'react-recaptcha-v3';

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

const Register = (props) => {
  var ct = null;
  const verifyCallback = (recaptchaToken) => {
      ct = recaptchaToken;
      console.log(recaptchaToken, "<= your recaptcha token")
  }
  const alert = useAlert()  
  let authcheck = false;

  const onFinish = values => {
    console.log(values.user)
    fetch("https://akina.ayushpriya.tech/api/user/register", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values.user), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'g-recaptcha-response': ct
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
          authcheck = true;
        return response.json();
        }else{
          switch(response.status){
            case 400: 
                alert.show("Account already exists")
              break;
            case 403:
              alert.show("You have been blocked")
              break;
            case 404:
              alert.show("No user exists with that email")
              break;
            default:  
              alert.show("Seems like something's wrong on our end. Please contact the developers")
          }
        }
        })
      .then(data => {
        console.log(data)
        if(authcheck){
          alert.show(data.Verify)
          props.history.push("/dlogin")
        }
        })
       .catch(error => console.error(error)
       );
    };

    useEffect(() => {
        if(localStorage.getItem("token")){
            props.history.push("/main")
        }
      });


    
  return (
      <div className="loginpage dreglog">
      <div className="hestia-logo">
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
        name={['user', 'password']}
        placeholder="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            min: 8,
            message: "Password has to be atleast 8 characters!"
          }
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name={['user', 'phone']}
        rules={[
          {
            required: true,
            message: 'Please input your Number!',
          },
          {
            min: 10,
            max: 10,
            message: "Phone number has to be 10 digits!"
          }
        ]}
      >
        <Input
        placeholder="Number"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        {/* <Button type="dashed" className="oauth">
                Register with <img src={google} alt="login with google"></img>
        </Button> */}
      </Form.Item>
      <Form.Item className="already">
        <Link to="/Login">Already have an account? Login</Link>
      </Form.Item>
      <Form.Item>
      <ReCaptcha
            sitekey="6LdiB-UUAAAAACYC2AlMS9hrw18fQA4FK7-s0LDw"
            action='/register'
            verifyCallback={verifyCallback}
        />
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register