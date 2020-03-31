import React from 'react';
import { Card, Row, Col,Form, Input } from 'antd';
import back from '../../assets/back.png';
import { Modal, Button } from 'antd';
import {Checkbox} from 'antd';
import {withAlert} from 'react-alert';



class Suggestions extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
     validateMessages = {
        types: {
            email: 'Not a validate email!',

        }
    }
    gotoFeed = () => {
        if(this.props.p){
            this.props.p.g.history.push("/feed");
            // this.props.p.history.push("/feed");
        }else{
            this.props.history.push("/feed");
        }
        
        this.props.history.push("/feed");
    }
    onFinish = values => {


        this.setState(values)
        console.log(this.state)
        postForm('https://hestia-report.herokuapp.com/api/recommend/',this.state)
                .then(data => {
                    console.log(data)
                    if(data.status == "success"){
                        this.props.alert.show(data.message)
                        this.props.history.push("/mychats")
                    }
                    if(data.status == "error"){
                        this.props.alert.show(data.message)
                    }
                })
                .catch(error => console.error(error))

                function postForm(url,state) {
                    var object ={};
                    object["recommended_for"] = localStorage.getItem("receiver_id");
                    object["name_of_shop"] = state.name_of_shop;
                    object["item"] = localStorage.getItem("item");
                    object["landmark"] = state.landmark;
                    object["extra_instruction"] = state.extra_instruction;
                    object["description_of_shop"] = state.description_of_shop;
                    object["phone_number"] = state.phone_number;
                    console.log(object)
                return fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),  // a FormData will automatically set the 'Content-Type'
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                      })
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
                    <div className="imgbacc">
                        <img src={back} alt="back to feed" onClick={this.gotoFeed}></img>
                    </div>
                        <h1>Suggest a Shop</h1>
                    </Col>
                </Row>
                </div>
                <Form name="nest-messages" validateMessages={this.validateMessages} className="login-form" onFinish={this.onFinish}>
                        <Form.Item name="name_of_shop">
                            <Input 
                                placeholder="Name of shop"
                            />
                        </Form.Item>
                        <Form.Item
                            name="landmark"
                        >
                            <Input 
                                placeholder="Landmark"
                            />
                        </Form.Item>
                        <Form.Item
                            name="extra_instruction"
                        >
                            <Input 
                                placeholder="Instruction"
                            />
                        </Form.Item>
                        <Form.Item
                            name="description_of_shop"
                        >
                            <Input 
                                placeholder="Description"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone_number"
                        >
                            <Input 
                                placeholder="Phone Number"
                            />
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" htmlType="submit">
                                Done 
                            </Button>
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" >
                                Cancel <strong> X </strong>
                            </Button>
                        </Form.Item>
                        </Form>
            </div>
        )
    }
}
export default withAlert()(Suggestions);
