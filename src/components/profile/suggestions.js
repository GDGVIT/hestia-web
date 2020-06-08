import React from 'react';
import { Card, Row, Col,Form, Input } from 'antd';
import back from '../../assets/back.png';
import { Modal, Button } from 'antd';
import {Checkbox} from 'antd';
import {withAlert} from 'react-alert';
import cancel from '../../assets/cancel.svg';

class Suggestions extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
 validateMessages = {
        required: 'This field is required!',
        types: {
          email: 'Not a validate email!'
        },
      };
    gotoFeed = () => {
        this.props.history.push("/feed");
    }
    onFinish = values => {


        this.setState(values)
        // console.log(this.state)
        // postForm('https://akina.ayushpriya.tech/api/recommend/',this.state)
        //         .then(data => {
        //             console.log(data)
        //             if(data.status == "success"){
        //                 this.props.alert.show(data.message)
        //                 this.props.history.push("/mychats")
        //             }
        //             if(data.status == "error"){
        //                 this.props.alert.show(data.message)
        //             }
        //         })
        //         .catch(error => console.error(error))
                    var object ={};
                    object["recommended_for"] = localStorage.getItem("receiver_id");
                    object["name_of_shop"] = this.state.name_of_shop.trim();
                    object["item"] = localStorage.getItem("item");
                    object["landmark"] = this.state.landmark.trim();
                    object["extra_instruction"] = this.state.extra_instruction.trim();
                    object["description_of_shop"] = this.state.description_of_shop.trim();
                    object["phone_number"] = this.state.phone_number;
                    // console.log(object)
                fetch("https://akina.ayushpriya.tech/api/recommend/", {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),  // a FormData will automatically set the 'Content-Type'
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                      })
                })
                .then(response => {
                    if(response.status === 200 || response.status===201 || response.status===202){
                        return response.json();
                        }
                    else if(response.status === 409){
                        this.props.alert.show("Shop already recommended for this item")
                        this.gotoFeed();
                    }
                    else{
                        this.props.alert.show("Something went wrong. Try again.")
                    }
                })
                .then(data=>{
                    if(data){
                        this.props.alert.show("Suggestion successful");
                        this.gotoFeed();
                    }
                })
                .catch(error=>{
                    console.error(error);
                })
            };
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
                        <Form.Item name="name_of_shop"
                            rules={[{ required: true, message: 'Name is required' }]}
                        >
                            <Input 
                                placeholder="Name of shop"
                            />
                        </Form.Item>
                        <Form.Item
                            name="landmark"
                            rules ={[{required: true, message: 'landmark is required'}]}
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
                            rules={[{required: true, message: 'Some description is required'}]}
                        >
                            <Input 
                                placeholder="Description"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone_number"
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
                                placeholder="Phone Number"
                                type="number"
                            />
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" htmlType="submit">
                                Done 
                            </Button>
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" onClick={this.gotoFeed} style={{backgroundColor:"#fff",color:"#000"}}>
                                Cancel <img src={cancel} alt="Check" style={{marginLeft:"10px"}}></img>
                            </Button>
                        </Form.Item>
                        </Form>
            </div>
        )
    }
}
export default withAlert()(Suggestions);
