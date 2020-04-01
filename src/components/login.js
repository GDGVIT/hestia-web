import React, {useEffect, useState} from 'react';
import { useAlert } from 'react-alert';
import { Form, Input, Button, Modal } from 'antd';
import {Link} from 'react-router-dom';
import google from '../assets/group.png';
import logo from '../assets/logo.png';
import check from '../assets/check.png';



const Login = (props) => {
  const [visible, changeV] = useState(false);   
  var chk = true;
  const alert = useAlert()
  const onFinish = values => {
    if(values.user.password.length < 8){
      alert.show("Wrong password")
    }
    let authcheck = false;
    console.log('Received values of form: ', values)
    let cm = {
      "email": values.user.email
    }

    fetch("https://akina.ayushpriya.tech/api/user/verifyuser", {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      body: JSON.stringify(cm), // Coordinate the body type with 'Content-Type'
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response => {
      if(response.status === 401){
        alert.show("Verify your email first");
        props.history.push("/");
      }else if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
      }else{
        switch(response.status){
          case 401: 
              console.log("You have been blocked")
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
        // console.log(data)
        // window.localStorage.setItem("email", data.email);
      })
      .catch(error => console.error(error)
      );
      fetch("https://akina.ayushpriya.tech/api/user/login", {
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
            switch(response.status){
              case 401: 
                alert.show("incorrect credentials")
                break;
              case 403:
                alert.show("incorrect credentials")
                break;
              case 404:
                console.log("incorrect email")
                break;
              default:  
                alert.show("Seems like something's wrong on our end. Please contact the developers")
            }
          }
          })
        .then(data => {
            // console.log(data)
            if(authcheck){
            window.localStorage.setItem("user_id", data.id);
            window.localStorage.setItem("token", data.Token);
            window.localStorage.setItem("name", data.name);
            window.localStorage.setItem("email", data.email);
            window.localStorage.setItem("phone", data.phone);
            props.history.push("/feed");
            }
            // props.history.push("/feed");
          })
        .catch(error => console.error(error)
        );
   }

    useEffect(() => { 
        if(localStorage.getItem("token")){
            props.history.push("/feed")
        }
      });

      const onFinishPass =(values) =>{
        console.log(values)
        return fetch("https://akina.ayushpriya.tech/api/user/forgotPassword", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
        }else{
          
          // console.log(response)
        }
        })
      .then(data => {
          alert.show("Check your email")
        })
       .catch(error => console.error(error)
       );
    }

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
            {/* <Button type="dashed" className="oauth">
                Login with <img src={google} alt="login with google"></img>
            </Button> */}
       </Form.Item>
       <Form.Item className="already">
        <a onClick={() => changeV(true)}>Forgot password?</a>
        </Form.Item>
        <Form.Item className="already">
        <Link to="/register">Don't have an account? Register!</Link>
        </Form.Item>

    </Form>
        <Modal
          title="Enter your email"
          visible={visible}    
          footer={null}
          closable={false}
          >
          <Form onFinish={onFinishPass}>
          <Form.Item name="email"
              rules={[
                  {type: 'email', message: 'Not a valid email'}
              ]}
          >
              <Input 
                  placeholder="abc@example.com"
              />
          </Form.Item>
          <Form.Item className="butn">
              <Button type="primary" htmlType="submit" onClick={() => changeV(false)}>
                  Done <img src={check} alt="Check" style={{paddingLeft:"10px",paddingBottom:"4px"}}></img>
              </Button>
              <Button type="primary" onClick={() => changeV(false)} style={{backgroundColor:"#fff",color:"#000"}}>
                  No <strong> X </strong>
              </Button>
          </Form.Item>
          
          </Form>
      </Modal>
    </div>

  );
}

export default Login;