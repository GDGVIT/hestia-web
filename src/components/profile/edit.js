import React, {useEffect} from 'react';
import back from '../../assets/back.png';
import check from'../../assets/check.png';
import Profile from './profile';
import {Row, Col, Form, Input, Button} from 'antd';

class Edit extends React.Component{

    constructor(props){
        super(props);
        this.state={
            goto: "edit"
        }
    }
    validateMessages = {
        types: {
            email: 'Not a validate email!',

          }
    }
    onFinish = (values) => {
        console.log(values)
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
                <Form.Item
                    name={['user', 'password1']}
                    placeholder="Password"
                >
                    <Input
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name={['user', 'password2']}
                    placeholder="Password"
                >
                    <Input
                    type="password"
                    placeholder="Password"
                    />
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
        </div>
        );
    }
    }

}
export default Edit;