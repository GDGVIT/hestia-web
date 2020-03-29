import React from 'react';
import { Card, Row, Col } from 'antd';
import profile from '../assets/profile.png';
import store from '../assets/store.png';
import check from '../assets/check.png';
import Profile from './profile/profile';
import plus from '../assets/plus.png';
import Chat from '../components/chat/chats';
import { Modal, Button } from 'antd';
import { Form, Input,} from 'antd';
import Nav from './nav';



class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            requests: [ ],
            city: 'surat',
            item_name: null,
            quantity: ''
        }
    }
    gotoProfile=()=>{
        this.props.history.push("/profile");
    }
    gotoChat=()=>{
        this.props.history.push("/chat");
    }
    handleAdd=()=>{
        this.setState({
            visible: true
        })
    }
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    onFinish = values => {
        console.log(values);
        this.setState(values)
        console.log(this.state)
        postForm('https://hestia-requests.herokuapp.com/app/item_requests/',this.state.item_name,this.state.quantity,this.state.city)
                .then(data => console.log(data))
                .catch(error => console.error(error))

                function postForm(url,name,quantity,city) {
                    var object ={};
                    object["item_name"] = name;
                    object["quantity"] = quantity;
                    object["location"] = city;
                    console.log(object)
                

                return fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),  // a FormData will automatically set the 'Content-Type'
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiJhYmNkZWdoaWprZjEyMzQifQ.GqnmZCcGjtCN_bTznL5LbA_Wdt_BsBN5IpSAHmdDeu8'
                      })
                })
                .then(response => response.json())
                }
      };
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      componentDidMount(){  
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }
        // console.log("i am here");
        fetch('https://hestia-requests.herokuapp.com/app/view_all_item_requests/?location=surat', {
            headers: new Headers({
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiJhYmNkZWdoaWprZjEyMzQifQ.GqnmZCcGjtCN_bTznL5LbA_Wdt_BsBN5IpSAHmdDeu8'
            })
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
            this.setState({
                requests: data.Request,
                
            });
            // console.log(this.state)
            })
            .catch(error => console.error(error))

            

        }
    
    render(){
        const { requests } = this.state;
        // console.log(requests)
        const reqlist = requests.length ? (
            requests.map(
                request =>{
                    // console.log(request)
                    return(
                        <Card key={request.id}>
                            <Row>
                                <Col span={17}>
                                    <div className="feed-card-header">
                                        <span>
                                            <strong>{request.item_name}</strong>
                                        </span>
                                        <p>{request.quantity}</p>
                                    </div>
                                    <div className="feed-card-date">
                    <p>{request.date_time_created.slice(0,10)}</p>
                                    </div>
                                </Col>
                                <Col span={7} className="iconz">
                                    <div className="imgback">
                                        <img src={store} alt="location"></img>
                                    </div>
                                    <div className="imgback">
                                        <img onClick={this.gotoChat} src={check} alt="location"></img>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    )
                }
            )




        ) : (
            <div>Loading request..</div>
        )
        
            return(
                <div>
                    <div className="main-title">    
                    <Row>
                        <Col span={18}>
                            <h1>Requests</h1>
                        </Col>
                        <Col span={6}>
                        <img onClick={this.gotoProfile} src={profile} alt="Profile logo"></img>
                        </Col>
                    </Row>
     
                    </div>
                    <div className="main-content">
                        {reqlist}
                    </div>
                    <div className="addReq" onClick={this.handleAdd}>
                            <img src={plus} alt="add req"></img>
                    </div>
                    <Modal
                        title="Add a request"
                        visible={this.state.visible}    
                        footer={null}
                        closable={false}
                        >
                        <Form onFinish={this.onFinish}>
                        <Form.Item name="item_name">
                            <Input 
                                placeholder="Name of thing"
                            />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                        >
                            <Input 
                                placeholder="Quantity"
                            />
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" htmlType="submit">
                                Done 
                            </Button>
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" onClick={this.handleCancel}>
                                Cancel <strong> X </strong>
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>
                    <Nav />
              </div>
            );
        // })
            
    }
}

export default Feed;