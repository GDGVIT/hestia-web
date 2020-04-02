import React from 'react';
import back from '../assets/back.png';
import check from'../assets/check.png';
import {Row, Col, Form, Input, Button, Modal} from 'antd';
import {withAlert} from 'react-alert';

class Edit extends React.Component{

    constructor(props){
        super(props);
        this.state={
            goto: "edit",
            visible: false
        }
    }
    validateMessages = {
        types: {
            email: 'Not a validate email!',

          }
    }
    
    onFinishPass =() =>{
       let values={
            'email': localStorage.getItem("email")
        }
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
          this.props.alert.show(response.statusText)
        }
        })
      .then(data => {
          this.props.alert.show("Check your email")
        })
       .catch(error => console.error(error)
       );
    }
    changePass = () =>{
        this.setState({
            visible: true
        })
    }

    handleCancel = () =>{
        this.setState({
            visible: false
        })
    }

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false
        });
      };

    onFinish = (values) => {
        console.log(values)
        this.setState(values)
        console.log(this.state)
        console.log({"name": this.state.user.name,"email": this.state.user.email,"phone":this.state.user.phone})
        postRequest('https://akina.ayushpriya.tech/api/user/updateUser', {"name": this.state.user.name,"email": this.state.user.email,"phone":this.state.user.phone})
            .then(data => console.log(data)) // Result from the `response.json()` call
            .catch(error => console.error(error))

            function postRequest(url, data) {
            return fetch(url, {
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
                headers: new Headers({
                    'Content-Type': 'application/json',
                'token':localStorage.getItem("token")
                }),
            })
            .then(response => response.json())
            }





        
    }
        render(){
        return(
            <div>
            <div className="main-title">    
                <Row>
                    <Col span={18}>
                    {/* <div className="imgbacc">
                        <img src={back} alt="back to feed" onClick={this.gotoProfile}></img>
                    </div> */}
                        <h1 style={{paddingLeft:'10px'}}>Edit</h1>
                    </Col>
                </Row>
    
            </div>
            <div>
            <Form name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages} className="login-form">
                <Form.Item
                    name={['user', 'name']}
                >
                    <Input 
                    placeholder={localStorage.getItem("name")}
                    />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    rules={[
                    {
                        type: 'email',
                        message: 'Please input a valid email!'
                    },
                    ]}
                >
                    <Input 
                    placeholder={localStorage.getItem("email")}
                    />
                </Form.Item>
                <Form.Item
                    name={['user', 'phone']}
                >
                    <Input
                    placeholder={localStorage.getItem("phone")}
                    />
                </Form.Item>
                <Form.Item>
                <Button type="primary" onClick={this.onFinishPass} style={{width: "150px"}}>
                    Change Password
                </Button>
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '150px'}}>
                    Done <img src={check} alt="Submit form"></img>
                    </Button>

                </Form.Item>
                </Form>
            </div>
                    {/* <Modal
                        title="Enter your email"
                        visible={this.state.visible}    
                        footer={null}
                        closable={false}
                        >
                        <Form onFinish={this.onFinishPass}>
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
                            <Button type="primary" htmlType="submit" onClick={this.handleOk}>
                                Done <img src={check} alt="Check" style={{paddingLeft:"10px",paddingBottom:"4px"}}></img>
                            </Button>
                            <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                                No <strong> X </strong>
                            </Button>
                        </Form.Item>
                        
                        </Form>
                    </Modal> */}
        </div>
        );
    }

}
export default withAlert()(Edit)