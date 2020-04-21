import React from 'react';
import { Card, Row, Col, Drawer } from 'antd';
import store from '../assets/store.png';
import check from '../assets/check.png';
import plus from '../assets/plus.png';
import Chat from './chat';
import Suggestions from './suggestions';
import { Modal, Button } from 'antd';
import { Form, Input, Checkbox} from 'antd';
import {withAlert} from "react-alert";
import baseurl from "../url"
import cancel from "../assets/cancel.svg";
import Loader1 from '../loader'

class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            visible1:false,
            visible2:false,
            requests: [ ],
            city: '',
            item_name: null,
            quantity: '',
            token: '',
            visiblechat1:false,
            visiblesug: false,
            custom_location:'',
            loading: false
        }
    }
    onClose=()=>{
        this.setState({
            visiblechat1: false,
            visiblesug: false
        })
    }
    gotoChat=()=>{
        // this.props.history.push("/chat");
        this.setState({
            visiblechat1: true
        })
    }
    handleAdd=()=>{
        this.setState({
            visible: true
        })
    }
    handleStore = (r,i) => () => {
        window.localStorage.setItem("receiver_id", r);
        window.localStorage.setItem("item",i);
        if(localStorage.getItem("Sugcheck")){
            this.suggestShop();
        }else{
            this.setState({
                visible1: true
            })
        }
    }
    handleChat= (r,i,ri) => () =>{
        window.localStorage.setItem("receiver_id", r);
        window.localStorage.setItem("item",i);
        window.localStorage.setItem("accept_id", ri);
        if(localStorage.getItem("acceptcheck")){
            this.createChat();
        }else{
            this.setState({
                visible2: true
            })
        }
    }
    suggestShop = () =>{
        this.setState({
            visiblesug: true,
            visible1: false
        })
    }
    handleOk = e => {
        // console.log(e);
        this.setState({
          visible1:false,
          visible2:false
        });
      };
      onFinish = values => {
        // console.log(values);
        this.setState(values)
        this.state.item_name.trim();
        this.state.quantity.trim();
        this.state.description.trim();
        this.state.city.trim();
        console.log(this.state.custom_location)
        if (this.state.custom_location === ''){
        postForm('https://hestia-requests.herokuapp.com/api/requests/item_requests/',this.state.item_name,this.state.quantity,this.state.city,this.state.description, this.props)
                // .then(res => console.log(res))
                .then(data => {
                    console.log(data)
                    if(data){
                        console.log(data)
                        this.props.alert.show("Request added")
                        this.setState({
                            visible: false
                        })
                    }
                })
                .catch(error => console.error(error))

                function postForm(url,name,quantity,city,description, tempprops) {
                    var object ={};
                    object["item_name"] = name;
                    object["quantity"] = quantity;
                    object["location"] = city;
                    object["description"] = description;
                    // console.log(object)
                
                    
                return fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),  // a FormData will automatically set the 'Content-Type'
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                        
                      })
                })
                .then(response => {
                    if(response.status === 400){
                        tempprops.alert.show("invalid request")
                    }else{
                        return response.json();
                    }
                })

            }


            }
            else{
                postForm('https://hestia-requests.herokuapp.com/api/requests/item_requests/',this.state.item_name,this.state.quantity,this.state.custom_location,this.state.description, this.props)
                // .then(res => console.log(res))
                .then(data => {
                    console.log(data)
                    if(data){
                        console.log(data)
                        this.props.alert.show("Request added")
                        this.setState({
                            visible: false
                        })
                    }
                })
                .catch(error => console.error(error))
                function postForm(url,name,quantity,city,description, tempprops) {
                    var object ={};
                    object["item_name"] = name;
                    object["quantity"] = quantity;
                    object["location"] = city;
                    object["description"] = description;
                    // console.log(object)
                
                    
                return fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(object),  // a FormData will automatically set the 'Content-Type'
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token")
                        
                      })
                })
                .then(response => {
                    if(response.status === 400){
                        tempprops.alert.show("invalid request")
                    }else{
                        return response.json();
                    }
                })
                }
            }
                
      };


    //   acceptrequest = (id) =>{
    //     console.log(id)
    //     postRequest('https://hestia-requests.herokuapp.com/api/requests/accept/', {request_id: id,location:this.state.city})
    //             .then(data => console.log(data)) // Result from the `response.json()` call
    //             .catch(error => console.error(error))

    //             function postRequest(url, data) {
    //             return fetch(url, {
    //                 credentials: 'same-origin', // 'include', default: 'omit'
    //                 method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    //                 body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    //                 headers: new Headers({
    //                 'Content-Type': 'application/json',
    //                 'Authorization': localStorage.getItem("token")
    //                 }),
    //             })
    //             .then(response => response.json())
    //             }


    //   }



      createChat = () => {
        // console.log(parseInt(localStorage.getItem("accept_id")))
        postRequest('https://hestia-requests.herokuapp.com/api/requests/accept/', {request_id: parseInt(localStorage.getItem("accept_id")),location:this.state.city})
        .then(data => console.log("data")) // Result from the `response.json()` call
        .catch(error => console.error(error))
        //   Accept the item
        postRequest('https://akina.ayushpriya.tech/api/v1/createChat', {request_id: parseInt(localStorage.getItem("accept_id")),location:this.state.city})
        .then(data => console.log("data")) // Result from the `response.json()` call
        .catch(error => console.error(error))

        function postRequest(url, data) {
        return fetch(url, {

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

          fetch('https://akina.ayushpriya.tech/api/v1/createChat',{
              method:"POST",
              headers: new Headers({
                'Authorization': localStorage.getItem("token")
              }),
              body: JSON.stringify(obj)
          })
          .then(res => res.json())
          .then(res => {
            //   console.log(res)
              if(res.code == 200){
                  window.localStorage.setItem("chat_name", res.chat_room.sender_name )
                  window.localStorage.setItem("item", res.chat_room.title)
                  window.localStorage.setItem("chat_desc", res.chat_room.req_desc)
                this.setState({
                    visiblechat1: true
                })
              }
              if(res.status == 500){
                this.props.alert.show("Chat with person exists.");
              }
          })
          .catch(err => console.log("err"))
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
      onChangeSug(e) {
        window.localStorage.setItem("Sugcheck", `${e.target.checked}`);
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
            


    //   }
    componentDidMount(){  
        if ("geolocation" in navigator) {
            console.log("Available");
          } else {
            console.log("Not Available");
          }
          this.setState({
              loading: true
          })

          var long = '';
          var lat = '';
          navigator.geolocation.getCurrentPosition((position)=> {
            //   console.log('hap')
            // console.log("latitude",position.coords.latitude)
            // console.log("longitude",position.coords.longitude)
             long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long,lat)
            window.localStorage.setItem("latitude",position.coords.latitude);
            window.localStorage.setItem("longitude",position.coords.longitude);


            fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+long+'&localityLanguage=en', {
            
            })
            .then(response =>{
            // console.log(response)
            return response.json()
            })
            .then(data => {
                // console.log(data)
                if(data.status===400){
                    this.props.alert.show("Couldn't get location. Reload and try again")
                }
                console.log(data.localityInfo)
                let str = data.localityInfo.administrative[2].name
                let s = str.split(" ")[0];
                    // console.log(s)
                this.setState({        
                    city:s
                })
                    
                if (this.state.custom_location==''){   
                    fetch('https://hestia-requests.herokuapp.com/api/requests/view_all_item_requests/?location='+s
                    
                     , {
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                    })
                    })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if(data.message == "Location not provided"){
                            // console.log("No location")
                        } else {
                            this.setState({
                                requests: data.Request,
                                loading: false
                            });
                        }
                    // console.log(this.state)
                    })
                    .catch(error => console.error(error))
                }
                else{
                    fetch('https://hestia-requests.herokuapp.com/api/requests/view_all_item_requests/?location='+this.state.city
                    
                     , {
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                    })
                    })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if(data.message == "Location not provided"){
                            // console.log("No location")
                        } else {
                            this.setState({
                                requests: data.Request,
                                loading: false
                            });
                        }
                    // console.log(this.state)
                    })
                    .catch(error => console.error(error))
                }
    
            // console.log(this.state)
            })
            
          }, function(err){
              if(err){
                alert("Couldn't access location. You will not be able to use the full features of this app without providing location access")
              }
                // console.log(err)
        });
        
        // console.log(this.state);
        
            
                
            
        }      
            
    render(){
        const {loading} = this.state;
        const { requests } = this.state;
        const mssg = loading?(''):('No requests in your area')
        // console.log(requests)
        const reqlist = requests.length ? (
            requests.map(
                request =>{
                    if(request.description == null){
                        request.description = "NA"
                    }
                    if(request.description.length > 50){
                        request.description = request.description.slice(0,50)+ "..."
                    }
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
                                        <p style ={{width:"100%", marginBottom:"10px"}}>{request.description}</p>
                                    </div>
                                    <div className="feed-card-date">
                                        <p>{request.date_time_created.slice(0,10)}</p>
                                    </div>
                                </Col>
                                <Col span={7} className="iconz tru">
                                <div className="imgback" onClick={this.handleChat(`${request.request_made_by}`, `${request.item_name}`,`${request.id}`)}>
                                        <img  src={check} alt="location"></img>
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
            <div>{mssg}</div>
        )
        
            return(
                <div>
                    <div className="main-title">    
                    <Row>
                        <Col span={18}>
                            <h1>Requests</h1>
                        </Col>
                        <div className="addReqD" onClick={this.handleAdd}>
                            <img src={plus} alt="add req"></img>
                        </div>
                    </Row>
     
                    </div>
                    <div className="main-content">
                        {loading && <Loader1 />}
                        {reqlist}
                    </div>
 
                    <Modal
                        title="Add a request"
                        visible={this.state.visible}    
                        footer={null}
                        closable={false}
                        className="addrequest"
                        centered
                        width="350px"
                        >
                        <Form onFinish={this.onFinish}>
                        <Form.Item name="item_name" rules={[{
                            max: 250, message:"Max 250 characters"
                        }]}>
                            <Input 
                                placeholder="Name of thing"
                            />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            rules={[{
                            max: 250, message:"Max 250 characters"
                        }]}
                        >
                            <Input 
                                placeholder="Quantity"
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{
                            max: 250, message:"Max 250 characters"
                        }]}
                        >
                            <Input 
                                placeholder="Description (optional)"
                            />
                        </Form.Item>
                        <Form.Item name="custom_location" rules={[{
                            max: 250, message:"Max 250 characters"
                        }]}>
                            <Input 
                                placeholder="Location (optional)"
                            />
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" htmlType="submit">
                                Done <img src={check} alt="Check" style={{marginLeft:"10px"}}></img>
                            </Button>
                        </Form.Item>
                        <Form.Item className="butn">
                            <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                                Close <img src={cancel} alt="Check" style={{marginLeft:"10px"}}></img>
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
                      className="suggestshop"
                      centered
                      width="350px"
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
                            Yes <img src={check} alt="Check" style={{marginLeft:"10px"}}></img>
                        </Button>
                        <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                            No <img src={cancel} alt="Check" style={{marginLeft:"10px"}}></img>
                        </Button>
                    </div>
                    <div style={{textAlign:"center"}}>
                            <Checkbox onChange={this.onChangeSug} style={{marginTop:"40px"}}>Do not show this again.</Checkbox>
                    </div>                    
                    </Modal>
                    {/* You have this item? modal*/}
                    <Modal
                      title="You have this item?"
                      visible={this.state.visible2}
                      onOk={this.handleOk}
                      footer={null}
                      onCancel={this.handleCancel}
                      className="itemconfirm"
                      centered
                      width="350px"
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
                                Yes <img src={check} alt="Check" style={{marginLeft:"10px"}}></img>
                            </Button>
                            <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                                No <img src={cancel} alt="Check" style={{marginLeft:"10px"}}></img>
                            </Button>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <Checkbox onChange={this.onChange} style={{marginTop:"40px"}}>Do not show this again.</Checkbox>
                        </div>
                    </Modal>
                    <Drawer
                        placement="left"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visiblechat1}
                        width="400px"
                        zIndex="1001"
                    >
                        <Chat />
                    </Drawer>
                    <Drawer
                        placement="left"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visiblesug}
                        width="400px"
                        zIndex="1001"
                    >
                        <Suggestions />
                    </Drawer>
              </div>
            );
        // })
            
    }
}

export default withAlert()(Feed);
