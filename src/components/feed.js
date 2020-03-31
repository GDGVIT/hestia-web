import React from 'react';
import { Card, Row, Col } from 'antd';
import profile from '../assets/profile.png';
import store from '../assets/store.png';
import check from '../assets/check.png';
import Profile from './profile/profile';
import plus from '../assets/plus.png';
import Chat from '../components/chat/chats';
import { Modal, Button } from 'antd';
import { Form, Input, Checkbox} from 'antd';
import Nav from './nav';
import {withAlert} from "react-alert";


class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            visible1:false,
            visible2:false,
            requests: [ ],
            city: 'surat',
            item_name: null,
            quantity: '',
            token: '',
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
    handleStore = (r,i) => () => {
        this.setState({
            visible1: true,
        })
        window.localStorage.setItem("receiver_id", r);
        window.localStorage.setItem("item",i);
    }
    handleChat= (r,i) => () =>{
        this.setState({
            visible2: true
        })
        window.localStorage.setItem("receiver_id", r);
        window.localStorage.setItem("item",i);

        // window.localStorage.setItem("accept_id", ri);
    }
    suggestShop = () =>{
        this.props.history.push('/suggestions');
    }
    handleOk = e => {
        // console.log(e);
        this.setState({
          visible: false,
          visible1:false,
          visible2:false
        });
      };
    onFinish = values => {
        // console.log(values);
        this.setState(values)
        console.log(this.state)
        postForm('https://hestia-requests.herokuapp.com/api/requests/item_requests/',this.state.item_name,this.state.quantity,this.state.city)
                .then(data => this.props.alert.show("Request added"))
                .catch(error => console.error(error))

                function postForm(url,name,quantity,city) {
                    var object ={};
                    object["item_name"] = name;
                    object["quantity"] = quantity;
                    object["location"] = city;
                    // console.log(object)
                
                    
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
      };


      acceptrequest = (id) =>{
        console.log(id)
        postRequest('https://hestia-requests.herokuapp.com/api/requests/accept/', {request_id: id,location:this.state.city})
                .then(data => console.log(data)) // Result from the `response.json()` call
                .catch(error => console.error(error))

                function postRequest(url, data) {
                return fetch(url, {
                    credentials: 'same-origin', // 'include', default: 'omit'
                    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
                    headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                    }),
                })
                .then(response => response.json())
                }


      }



      createChat = () => {
        //   Accept the item
        postRequest('https://hestia-requests.herokuapp.com/api/requests/accept/', {request_id: parseInt(localStorage.getItem("accept_id")),location:this.state.city})
        .then(data => console.log(data)) // Result from the `response.json()` call
        .catch(error => console.error(error))

        function postRequest(url, data) {
        return fetch(url, {
            credentials: 'same-origin', // 'include', default: 'omit'
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
            }),
        })
        .then(response => response.json())
        }
        
          var obj ={}
          obj["request_sender"] = parseInt(localStorage.getItem("receiver_id"))
          obj["request_receiver"] = parseInt(localStorage.getItem("user_id"))
          obj["receiver"] = parseInt(localStorage.getItem("receiver_id"))
          obj["sender"] = parseInt(localStorage.getItem("user_id"))
          obj["title"] = localStorage.getItem("item")

          fetch('https://hestia-chat.herokuapp.com/api/v1/createChat',{
              method:"POST",
              headers: new Headers({
                'Authorization': localStorage.getItem("token")
              }),
              body: JSON.stringify(obj)
          })
          .then(res => res.json())
          .then(res => {
              console.log(res)
              if(res.code == 200){
                  window.localStorage.setItem("chat_name", res.chat_room.receiver_name )
                  window.localStorage.setItem("item", res.chat_room.title)
                // this.props.history.push("/chat");
              }
              if(res.status == 500){
                this.props.alert.show("Chatroom exists.");
                // this.props.history.push("/profile");
              }
          })
          .catch(err => console.log(err))
      }
      handleCancel = e => {
        // console.log(e);
        this.setState({
          visible: false,
          visible1:false,
          visible2:false
        });
      };
      onChange(e) {
        window.localStorage.setItem("acceptcheck", `${e.target.checked}`);
        // console.log(localStorage.getItem("acceptcheck"))
      }
    //   componentWillMount(){
    //     navigator.geolocation.getCurrentPosition(
    //         position => this.setState({ 
    //           latitude: position.coords.latitude, 
    //           longitude: position.coords.longitude
    //         }), 
    //         err => console.log(err)
            
    //       );
    //       console.log(this.state.latitude)
    //         fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+this.state.latitude+','+this.state.longitude+'.json?access_token=pk.eyJ1Ijoibm94MTIiLCJhIjoiY2s4Zm5obnZ0MDFwajNtcDAxanFkeXM1ayJ9.YMGj-nXopQXZfh5NKpLiCg', {
    //         })
    //         .then(response =>{
    //         console.log(response)
    //         return response.json()
    //         })
    //         .then(data => {
    //         console.log(data)
    //         this.setState({
    //             city:data.features[0].place_name
    //         })
    //         console.log(this.state)
    //         })
    //         .catch(error => console.error(error))


    //   }
      componentDidMount(){  
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }

        let token =localStorage.getItem("token");
        // this.setState({
        //     token: localStorage.getItem("token")
        // })
        console.log(this.state);
        fetch('https://hestia-requests.herokuapp.com/api/requests/view_all_item_requests/?location='+this.state.city, {
            headers: new Headers({
            'Authorization': localStorage.getItem("token")
            })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.message == "Location not provided"){
                    console.log("No location")
                } else {
                    this.setState({
                        requests: data.Request,
                    });
                }
            console.log(this.state)
            })
            .catch(error => console.error(error))

            let latitude;
            let longitude;
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                        } 
                    }
            function showPosition(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                }
                


                this.setState({
                    latitude: latitude,
                    longitude: longitude
                })



                







            
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
                                        <img onClick={this.handleChat(`${request.request_made_by}`, `${request.item_name}`)} src={check} alt="location"></img>
                                    </div>
                                    <div className="imgback"  onClick = {this.handleStore(`${request.request_made_by}`, `${request.item_name}`)}>
                                        <img src={store} alt="location"></img>
                                    </div> 
                                </Col>
                            </Row>
                        </Card>
                    )
                }
            )




        ) : (
            <div>No requests in your area</div>
        )
        
            return(
                <div>
                    <div className="main-title">    
                    <Row>
                        <Col span={18}>
                            <h1>Requests</h1>
                        </Col>
                        <Col span={6}>
                        <img onClick={this.gotoProfile} src={profile} alt="Profile logo" ></img>
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
                            <Button type="primary" htmlType="submit" onClick={this.handleOk}>
                                Done <img src={check} alt="Check" style={{paddingLeft:"10px",paddingBottom:"4px"}}></img>
                            </Button>
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" onClick={this.handleCancel}>
                                Cancel <strong> X </strong>
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>
                {/* Suggest a Shop modal */}
                <Modal
                      title="Suggest shop"
                      visible={this.state.visible1}
                      onOk={this.handleOk}
                      footer={null}
                      onCancel={this.handleCancel}
                    > 
                        <Row>
                            <Col span={24}>
                            <div className="imgModal">
                                <img src={store} alt="location"></img>
                            </div>
                            </Col>
                        </Row>
                      <h2 style={{marginTop:"20px", textAlign:"center"}}>Suggest a Shop?</h2>
                      <div style={{textAlign:"center"}}>
                        <Button type="primary" htmlType="submit" onClick={this.suggestShop} >
                            Yes <img src={check} alt="Check" style={{paddingLeft:"10px",paddingBottom:"4px"}}></img>
                        </Button>
                        <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                            No <strong> X </strong>
                        </Button>
                    </div>
                    <div style={{textAlign:"center"}}>
                            <Checkbox onChange={this.onChange} style={{marginTop:"40px"}}>Do not show this again.</Checkbox>
                    </div>                    
                    </Modal>
                    {/* You have this item? modal*/}
                    <Modal
                      title="You have this item?"
                      visible={this.state.visible2}
                      onOk={this.handleOk}
                      footer={null}
                      onCancel={this.handleCancel}
                    > 
                     <Row>
                        <Col span={24}>
                        <div className="imgModal">
                            <img src={store} alt="location"></img>
                        </div>
                        </Col>
                        </Row>
                      <h2 style={{marginTop:"20px", textAlign:"center"}}>You have this item?</h2>
                        <div style={{textAlign:"center"}}>
                            <Button type="primary" htmlType="submit" onClick={this.createChat} >
                                Yes <img src={check} alt="Check" style={{paddingLeft:"10px",paddingBottom:"4px"}}></img>
                            </Button>
                            <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                                No <strong> X </strong>
                            </Button>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <Checkbox onChange={this.onChange} style={{marginTop:"40px"}}>Do not show this again.</Checkbox>
                        </div>
                    </Modal>
                    <Nav />
              </div>
            );
        // })
            
    }
}

export default withAlert()(Feed);
