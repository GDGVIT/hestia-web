import React from 'react'
import Messages from './messages';
import { Card, Row, Col } from 'antd';
import Report from '../../assets/Report.svg';
import backbutton from '../../assets/backbutton.png';
import './chat.css';
import Nav from '../nav';
import {withRouter} from 'react-router-dom';
import blueback from '../../assets/rectangle.png';
import whiteback from '../../assets/rectanglew.png';
import {withAlert} from "react-alert";



// const { Search } = Input;
// let id = parseInt(localStorage.getItem("receiver_id"))
// let url = 'wss://hestia-chat.herokuapp.com/api/v1/ws?chat=' + id;
// let url;
class Chat extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            ws:null,
            currentUser: null,
            messages: [],
            initialmsg: [],
            me: false,
            // receiver_id : props.location.state.id
        }
    }
    // url = 'wss://hestia-chat.herokuapp.com/api/v1/ws?chat='+`${this.state.receiver_id}`;
    gotoReport=()=>{
      this.props.history.push("/report");
    }
    gotoProfile=()=>{
      this.props.history.push("/profile");
      // this.setState({
      //   initialmsg : []
      // })
  }
  goBack=()=>{
    this.setState({
      initialmsg: []
    })
    this.props.history.push("/mychats");
    console.log(this.state)
  }

    
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    timeout = 250; 

    connect = () => {
      let url = 'wss://hestia-chat.herokuapp.com/api/v1/ws?chat='+ parseInt(localStorage.getItem("receiver_id"))

      var ws = new WebSocket(url)
      let that = this; // cache the this
      var connectInterval;

      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
          console.log('connected');
          // this.props.alert.show("Online")
          this.setState({ ws: ws });
          console.log(url)

          that.timeout = 250; // reset timer to 250 on open of websocket connection 
          clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        }
  
      ws.onmessage = evt => {
          // on receiving a message, add it to the list of messages
          const message = JSON.parse(evt.data)
          console.log(message, message.text)
          this.addMessage(message)
          return false;
        }
  
      ws.onclose = (e) => {
          console.log('disconnected')
          // automatically try to reconnect on connection loss
          // this.setState({
          //   ws: new WebSocket(url),
          // })
          console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
          // this.props.alert.show("Disconnected")
        }

        // Onerror listener
        // websocket onerror event listener
        ws.onerror = err => {
          console.error(
              "Socket encountered error: ",
              err.message,
              "Closing socket"
          );

          ws.close();
      };


    }

    componentDidMount(){
      this.scrollToBottom();
      this.connect();

      if(localStorage.getItem("token")){
       console.log("someone's logged in")
      //  this.setState({receiver_id : localStorage.getItem("receiver_id")})
      }else{
          this.props.history.push("/login");
      }
      console.log(this.state)
      //request to get messages

      var ob = {}
      ob["receiver"] = parseInt(localStorage.getItem("receiver_id"))
      ob["sender"] = parseInt(localStorage.getItem("sender_id"))

      console.log("/getMessages", JSON.stringify(ob))
      fetch('https://hestia-chat.herokuapp.com/api/v1/getMessages',{
        method:"POST",
        headers:  new Headers({
          'Authorization': localStorage.getItem("token")
        }),
        body:JSON.stringify(ob)
      })
      .then(res => res.json())
      .then(res => {
        if(res.code == 200){
          this.setState({
            initialmsg: res.messages
          })
        }
        if(res.status == 404){
            this.props.alert.show("Cannot get messages")
        }
        console.log(res)
        console.log(this.state)
      })
      .catch(err => console.log(err))
   }

   componentDidUpdate() {
      this.scrollToBottom();
    }
   addMessage = message =>
   this.setState(state => ({ messages: [message, ...state.messages] }))

   submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
      console.log(messageString);
      var obj ={}
      obj["receiver"] = parseInt(localStorage.getItem("receiver_id"));
      obj["sender"] = parseInt(localStorage.getItem("sender_id"));
      obj["text"] = messageString;
      console.log("/sendMessage", JSON.stringify(obj))
      fetch("https://hestia-chat.herokuapp.com/api/v1/sendMessage",{
        method:"POST",
        headers: new Headers({
          // "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }),
        body:JSON.stringify(obj)
      })
      .then(response=> response.json())
      .then(res => console.log(res,this.state))
      .catch(err => console.log(err));

    // const message = { name: this.state.name, message: messageString }

    // this.addMessage(messageString)
  }
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    render(){

      const {initialmsg} = this.state;
      console.log(initialmsg)
      const initial = initialmsg.length ? (
        initialmsg.map(
          msg => {
            return(
              <Card style={{ width: "80%", backgroundImage: msg.sender == localStorage.getItem("user_id") ? `url('${whiteback}')` : `url('${blueback}')`  , backgroundRepeat:"no-repeat", float: msg.sender == localStorage.getItem("user_id") ? "right" : "left", color: msg.sender == localStorage.getItem("user_id") ? "#000" : "#fff", boxShadow:"none", paddingLeft: msg.sender == localStorage.getItem("user_id") ? "none" : "35px"}}>
              <p style={{fontWeight:700}}>Receiver: {msg.receiver}</p>
              <p style={{fontWeight:700}}>Sender: {msg.sender}</p>
              <p>{msg.text}</p>
              <p><i>{msg.CreatedAt}</i></p>
            </Card>
            )
          }
        )
      ) : (
        <div style={{textAlign:"center", marginTop:"20px"}}>  </div>
      )
      const {messages} = this.state;
      messages.reverse();
      const chatslist = messages.length ? (
        messages.map(
          msg => {
            return(
              <Card style={{ width: "80%", backgroundImage: msg.sender == localStorage.getItem("user_id") ? `url('${whiteback}')` : `url('${blueback}')`, backgroundRepeat:"no-repeat",   float: msg.sender == localStorage.getItem("user_id") ? "right" : "left", color: msg.sender == localStorage.getItem("user_id") ? "#000" : "#fff", boxShadow:"none", paddingLeft: msg.sender == localStorage.getItem("user_id") ? "none" : "35px"}}>
              <p style={{fontWeight:700}}>Receiver: {msg.receiver}</p>
              <p style={{fontWeight:700}}>Sender: {msg.sender}</p>
              <p>{msg.text}</p>
              <p><i>{msg.CreatedAt}</i></p>
            </Card>
            )
          }
        )
      ) : (
      <div style={{textAlign:"center", marginTop:"20px"}}></div>
      )
        return(
            <div>
            <div>    
                <Row style={{marginTop:20}}>
                    <Col span={4}>
                      <div className="imgback" onClick={this.goBack}>
                        <img src={backbutton} alt = "Back-button" style = {{height: "3vh", marginLeft:"10px"}}></img>
                      </div>
                    </Col>
                    <Col span={16}>
                        <h1 style = {{fontSize:14, textAlign:"center"}}>Sender - {localStorage.getItem("sender_id")}</h1>
                        <h2 style = {{fontSize:14, textAlign:"center"}}>{localStorage.getItem("item")}</h2>
                    </Col>
                    <Col span={4}>
                    <img src={Report} alt="Report logo" style ={{ marginTop: "10px"}} onClick={this.gotoReport}></img>
                    </Col>
                </Row>
            </div>
              {/* Messages */}

              <div style={{height:window.innerWidth > 360 ? "60vh":"53vh", marginTop:"20px", overflow:"scroll"}}>
                {initial}
                {chatslist}

                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </div>  
            <div>

            <Messages onSubmitMessage={messageString => this.submitMessage(messageString)}/>
            </div>
            <Nav />
            </div>
        );
    }
}
export default withAlert() (Chat);