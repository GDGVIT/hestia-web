import React from 'react';
import back from '../../assets/back.png';
import check from'../../assets/check.png';
import Profile from './profile';
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
    
    onFinishPass =(values) =>{
        console.log(values)
        return fetch("https://hestia-auth.herokuapp.com/api/user/forgotPassword", {
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
        // postForm('https://hestia-requests.herokuapp.com/app/item_requests/',this.state.item_name,this.state.quantity,this.state.city)
        //         .then(data => console.log(data))
        //         .catch(error => console.error(error))

        //         function postForm(url,name,quantity,city) {
        //             var object ={};
        //             object["item_name"] = name;
        //             object["quantity"] = quantity;
        //             object["location"] = city;
        //             console.log(object)
                
                    
        //         return fetch(url, {
        //             method: 'POST', // or 'PUT'
        //             body: JSON.stringify(object),  // a FormData will automatically set the 'Content-Type'
        //             headers: new Headers({
        //                 "Content-Type": "application/json",
        //                 'Authorization': localStorage.getItem("token")
                        
        //               })
        //         })
        //         .then(response => response.json())
        //         }
    }
    gotoProfile = () => {
        this.setState({
            goto: "profile"
        });
        
    }
        render(){
            if(this.state.goto === "profile"){
                return(
                    <Profile p={this.props} />
                );
            }else if(this.state.goto === "edit"){
        return(
            <div>
            <div className="main-title">    
                <Row>
                    <Col span={18}>
                    <div className="imgbacc">
                        <img src={back} alt="back to feed" onClick={this.gotoProfile}></img>
                    </div>
                        <h1>Edit</h1>
                    </Col>
                </Row>
    
            </div>
            <div>
            <Form name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages} className="login-form">
                <Form.Item
                    name={['user', 'name']}
                    rules={[
                    {
                        type: 'name',
                        message: 'Please input a valid email!'
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
                    name={['user', 'phone']}
                >
                    <Input
                    placeholder="Number"
                    />
                </Form.Item>
                <Form.Item>
                <Button type="primary" onClick={this.changePass}>
                    Change Password
                </Button>
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Done <img src={check} alt="Submit form"></img>
                    </Button>
                    <Button type="primary" onClick={this.gotoProfile}>
                            Cancel <strong> X </strong>
                    </Button>
                </Form.Item>
                </Form>
            </div>
                    <Modal
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
                    </Modal>
        </div>
        );
    }
    }

}
export default withAlert()(Edit)