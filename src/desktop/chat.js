import React from 'react'
import Messages from './messages';
import { Card, Row, Col, Drawer } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import report from '../assets/Report.svg';
import backbutton from '../assets/backbutton.png';
import './chat.css';
import {withAlert} from "react-alert";
// import Report from './report';
import Report from '../assets/Report.svg';
import deletez from '../assets/delete.png';
import { Modal, Button } from 'antd';
import cancel from "../assets/cancel.svg";
import check from '../assets/check.png';


// const { Search } = Input;
// let id = parseInt(localStorage.getItem("receiver_id"))
// let url = 'wss://hestia-chat.herokuapp.com/api/v1/ws?chat=' + id;
// let url;
class Chat extends React.Component{
    constructor(props){
        super(props);
        // console.log(props);
        this.state={
            ws:null,
            currentUser: null,
            messages: [],
            info:[],
            initialmsg: [],
            me: false,
            visreport: false,
            visible:false
            // receiver_id : props.location.state.id
        }
    }
    controller = new AbortController();
    // url = 'wss://hestia-chat.herokuapp.com/api/v1/ws?chat='+`${this.state.receiver_id}`;
    gotoReport=()=>{
      this.setState({
        visreport: true
      })
      // this.props.alert.show("alerting will be available soon")
    }
  componentWillUnmount(){
    this.setState({
      initialmsg: []
    })
    this.controller.abort();

  }
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    timeout = 250; 
onClose=()=>{
  this.setState({
    visreport: false
  })
}
    // connect = () => {
    //   let url = 'wss://akina.ayushpriya.tech/api/v1/ws?sender='+ parseInt(localStorage.getItem("sender_id")) + "&receiver=" + parseInt(localStorage.getItem("receiver_id"))

    //   var ws = new WebSocket(url)
    //   let that = this; // cache the this
    //   var connectInterval;

    //   ws.onopen = () => {
    //     // on connecting, do nothing but log it to the console
    //       console.log('connected');
    //       // this.props.alert.show("Online")
    //       this.setState({ ws: ws });
    //       console.log(url)

    //       that.timeout = 50; // reset timer to 250 on open of websocket connection 
    //       clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    //     }
  
    //   ws.onmessage = evt => {
    //       // on receiving a message, add it to the list of messages
    //       const message = JSON.parse(evt.data)
    //       console.log(message, message.text)
    //       this.addMessage(message)
    //       return false;
    //     }
  
    //   ws.onclose = (e) => {
    //       console.log('disconnected')
    //       // automatically try to reconnect on connection loss
    //       // this.setState({
    //       //   ws: new WebSocket(url),
    //       // })
    //       console.log(
    //         `Socket is closed. Reconnect will be attempted in ${Math.min(
    //             10000 / 1000,
    //             (that.timeout + that.timeout) / 1000
    //         )} second.`,
    //         e.reason
    //     );

    //     that.timeout = that.timeout + that.timeout; //increment retry interval
    //     connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    //       // this.props.alert.show("Disconnected")
    //     }

    //     // Onerror listener
    //     // websocket onerror event listener
    //     ws.onerror = err => {
    //       console.error(
    //           "Socket encountered error: ",
    //           err.message,
    //           "Closing socket"
    //       );

    //       ws.close();
    //   };


    // }

     componentDidMount(){
      this.scrollToBottom();
      // this.connect();

      if(localStorage.getItem("token")){
      //  console.log("someone's logged in")
      //  this.setState({receiver_id : localStorage.getItem("receiver_id")})
      }else{
          while(1==1){
            alert("HACKERMAN ALERT")
          }
      }
      // console.log(this.state)
      //request to get messages

      var ob = {}
      ob["receiver"] = parseInt(localStorage.getItem("receiver_id"))
      ob["sender"] = parseInt(localStorage.getItem("sender_id"))

      // console.log("/getMessages", JSON.stringify(ob))

      fetch('https://akina.ayushpriya.tech/api/v1/getMessages',{
        method:"POST",
        headers:  new Headers({
          'Authorization': localStorage.getItem("token")
        }),
        body:JSON.stringify(ob)
        })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('items', res.items)
        if(res.code == 200){
          this.setState({
            initialmsg: res.messages,
            info: res.items
          })
        }
        if(res.status == 404){
            this.props.alert.show("Cannot get messages")
        }
        if(res.status == 400){
          this.props.alert.show("User has been reported")
          // this.props.history.push("/mychats");
        }
        // console.log(res)
        // console.log(this.state)
      })
      .catch(err => console.log("err"))
   }

   componentDidUpdate() {
      this.scrollToBottom();
  }
   addMessage = message =>
   this.setState(state => ({ messages: [message, ...state.messages] }))

   getMessages = async() => {
    var ob = {}
    ob["receiver"] = parseInt(localStorage.getItem("receiver_id"))
    ob["sender"] = parseInt(localStorage.getItem("sender_id"))

    // console.log("/getMessages pseudo websocket", JSON.stringify(ob))
    try {
      setInterval(async () => { 
      const fetchResponse = await fetch('https://akina.ayushpriya.tech/api/v1/getMessages',{
      signal: this.controller.signal,
      method:"POST",
      headers:  new Headers({
        'Authorization': localStorage.getItem("token")
      }),
      body:JSON.stringify(ob)
      })
        const data = await fetchResponse.json()
        // console.log(data);
        this.setState({
          initialmsg: data.messages
        })
      },2000);
    } catch(e) {
      console.log("e");
    }

  }
   submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
      // console.log(messageString);
      var obj ={}
      obj["receiver"] = parseInt(localStorage.getItem("receiver_id"));
      obj["sender"] = parseInt(localStorage.getItem("sender_id"));
      obj["text"] = messageString;
      // console.log("/sendMessage", JSON.stringify(obj))
      fetch("https://akina.ayushpriya.tech/api/v1/sendMessage",{
        method:"POST",
        headers: new Headers({
          // "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }),
        body:JSON.stringify(obj)
      })
      .then(response=> response.json())
      .then(res => console.log("res"))
      .catch(err => console.log("err"));

      (async () => {
        await this.getMessages();
      })();
      // const message = { name: this.state.name, message: messageString }

    // this.addMessage(messageString)
  }

  handleDel =() => {
    this.setState({
      visible: true,
    });
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  deleteMessage = () =>{
    let who_deleted;
    var obj={}
    obj["receiver"] = parseInt(localStorage.getItem("request_receiver"));
    obj["sender"] = parseInt(localStorage.getItem("request_sender"));
    if(localStorage.getItem("user_id") == localStorage.getItem("request_sender")){
      who_deleted = "sender"
    } else {
      who_deleted = "receiver"
    }
    obj["who_deleted"] = who_deleted
    console.log("Del message", JSON.stringify(obj))

    fetch('https://akina.ayushpriya.tech/api/v1/delChat',{
      method:"delete",
      headers: new Headers({
        // "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token")
      }),
      body:JSON.stringify(obj)
    })
    .then(response=> response.json())
    .then(res => {
      console.log(res)
      if(res.code == 200){
        this.props.alert.show("Chats deleted")
        // this.props.history.push("/mychats");
      }
    })
    .catch(err => console.log(err));
  }

  // check = () => {
  //   const { ws } = this.state;
  //   if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  //   };


    render(){

      const {initialmsg} = this.state;
      // console.log(initialmsg)
      const initial = initialmsg.length ? (
        initialmsg.map(
          msg => {
            var date = new Date(msg.CreatedAt)
            return(
              <Card style={{ width: "80%", backgroundColor: msg.sender == localStorage.getItem("user_id") ? `#fff` : `#00d2d2`  , float: msg.sender == localStorage.getItem("user_id") ? "right" : "left", color: msg.sender == localStorage.getItem("user_id") ? "#000" : "#fff", boxShadow:"none", paddingLeft: msg.sender == localStorage.getItem("user_id") ? "none" : "35px", marginLeft: msg.sender == localStorage.getItem("user_id") ? "none" : "10px"}} >
              {/* <p style={{fontWeight:700}}>Receiver: {msg.receiver}</p> */}
              {/* <p style={{fontWeight:700}}>Sender: {msg.sender}</p> */}
              <p>{msg.text}</p>
              <p><i>{date.toLocaleDateString()} {date.toLocaleTimeString()}</i></p>
            </Card>
            )
          }
        )
      ) : (
        <div style={{textAlign:"center", marginTop:"20px"}}> There are no messages yet ...  </div>
      )
      const {messages} = this.state;
      messages.reverse();
      const chatslist = messages.length ? (
        messages.map(
          msg => {
            var date = new Date(msg.CreatedAt)
            return(
              <Card style={{ width: "80%", backgroundColor: msg.sender == localStorage.getItem("user_id") ? `#fff` : `#00d2d2`, float: msg.sender == localStorage.getItem("user_id") ? "right" : "left", color: msg.sender == localStorage.getItem("user_id") ? "#000" : "#fff", boxShadow:"none", paddingLeft: msg.sender == localStorage.getItem("user_id") ? "none" : "35px", marginLeft: msg.sender == localStorage.getItem("user_id") ? "none" : "10px"}}>
              {/* <p style={{fontWeight:700}}>Receiver: {msg.receiver}</p> */}
              {/* <p style={{fontWeight:700}}>Sender: {msg.sender}</p> */}
              <p>{msg.text}</p>
              <p><i>{date.toLocaleDateString()} {date.toLocaleTimeString()}</i></p>
            </Card>
            )
          }
        )
      ) : (
      <div style={{textAlign:"center", marginTop:"20px"}}></div>
      )
      if(localStorage.getItem("chat_desc").length > 20){
        localStorage.setItem("chat_desc", localStorage.getItem("chat_desc").slice(0,20) + "..." )
      } 


      const {info} = this.state;
      console.log(info)
      const menu = info.length ? (
        info.map(
          li => {
            return(
              <Menu.Item key= {li.ID} >
                <h6 style={{color:"#00d2d2"}}>{li.item}</h6>
                <p>{li.req_desc}</p>
              </Menu.Item>
            )
          }
        )
      ) : (
        <div> Nothing to display </div>
      )
      const menus = (
        <Menu style={{padding:"10px"}}>
          <Menu.Item style={{display: 'none'}} />
          {menu}
        </Menu>
      );

        return(
            <div>
            <div>    
                <Row style={{marginTop:50}}>
                    <Col span={14}>
                      <div style={{marginLeft:"10px"}}>
                        <h1 style = {{fontSize:15, textAlign:"left", fontWeight:"700"}}>{localStorage.getItem("chat_name")}</h1>
                        {/* <h2 style = {{fontSize:15, textAlign:"left"}}>{localStorage.getItem("items")}</h2> */}
                        {/* <h2 style = {{fontSize:13, textAlign:"left"}}>{localStorage.getItem("chat_desc")}</h2> */}
                      </div>
                    </Col>
                    <Col span={2} >
                      <Dropdown overlay={menus} trigger={['click']} zIndex="3000" placement="bottomRight" className="imgback info" style={{marginRight:"12px"}}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          <DownOutlined  style={{color:"white", marginTop:"5px", marginLeft:"8px"}}/>
                        </a>
                      </Dropdown>
                    </Col>
                    <Col span={2} className="iconz">
                      <div className="imgback del" onClick={this.handleDel}>
                          <img src={deletez} alt="delete"></img>
                      </div>
                    </Col>
                    <Col span={3}>
                    <img src={report} alt="Report logo" style ={{ marginTop: "10px", cursor:'pointer'}} onClick={this.gotoReport}></img>
                    </Col>
                </Row>
            </div>
              {/* Messages */}

              <div style={{height:window.innerWidth > 361 ? "60vh":"48vh", marginTop:"20px", overflow:"scroll"}}>
                {initial}
                {chatslist}

                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </div>  
            <div style={{    position: 'fixed',
                            width: '350px',
                            bottom: '75px',
                            marginLeft:"10px"
                            }}
            >

            <Messages onSubmitMessage={messageString => this.submitMessage(messageString)}/>
            </div>
              {/* Delete Chat Modal */}
              <Modal
          
                visible={this.state.visible}
                onOk={this.handleOk}
                footer={null}
                onCancel={this.handleCancel}
                className="deletechat"
                centered
                width="350px"
                zIndex='3000'
              > 
                <Row>
                  <Col span={24}>
                  <div className="imgModal delc">
                      <img src={deletez} alt="location"></img>
                  </div>
                  </Col>
                  </Row>
                <h2 style={{marginTop:"20px",marginBottom:"20px", textAlign:"center"}}>Delete Chat?</h2>
                  <div style={{textAlign:"center"}}>
                      <Button type="primary" htmlType="submit" onClick={this.deleteMessage} >
                          Yes <img src={check} alt="Check" style={{marginLeft:"10px"}}></img>
                      </Button>
                      <Button type="primary" onClick={this.handleCancel} style={{backgroundColor:"#fff",color:"#000"}}>
                          No <img src={cancel} alt="Check" style={{marginLeft:"10px"}}></img>
                      </Button>
                  </div>
              </Modal>
            <Drawer
                placement='right'
                closable={true}
                onClose={this.onClose}
                visible={this.state.visreport}
                width="400px"
                zIndex="3000"
            >
                <Report />
                </Drawer>
            </div>
        );
    }
}
export default withAlert() (Chat);