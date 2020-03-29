import React from 'react'
import Messages from './messages';
import { Card, Row, Col } from 'antd';
import Report from '../../assets/Report.svg';
import backbutton from '../../assets/backbutton.png';
import './chat.css';
import Nav from '../nav';


// const { Search } = Input;
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentUser: null,
            messages: [],
        }
    }

    ws = new WebSocket('ws://hestia-chat.herokuapp.com/api/v1/ws?chat=1')
    gotoReport=()=>{
      this.props.history.push("/report");
    }
    gotoProfile=()=>{
      this.props.history.push("/profile");
  }

    componentDidMount(){
      if(localStorage.getItem("token")){
       console.log("someone's logged in")
      }else{
          this.props.history.push("/login");
      }

      this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
        console.log('connected')
      }

      this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data)
        this.addMessage(message)
      }

      this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        this.setState({
          ws: new WebSocket(URL),
        })
      }
   }

   addMessage = message =>
   this.setState(state => ({ messages: [message, ...state.messages] }))

   submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
      console.log(messageString);
      var obj ={}
      obj["receiver"] = 4;
      obj["from"] = 5;
      obj["text"] = messageString;

      fetch("https://hestia-chat.herokuapp.com/api/v1/sendMessage",{
        method:"POST",
        headers: new Headers({
          // "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }),
        body:JSON.stringify(obj)
      })
      .then(response=> response.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // const message = { name: this.state.name, message: messageString }

    // this.addMessage(message)
  }

    render(){
        return(
            <div>
            <div>    
                <Row style={{marginTop:20}}>
                    <Col span={4}>
                      <div className="imgback" onClick={this.gotoProfile}>
                        <img src={backbutton} alt = "Back-button" style = {{height: "3vh", marginLeft:"10px"}}></img>
                      </div>
                    </Col>
                    <Col span={16}>
                        <h1 style = {{fontSize:14, textAlign:"center"}}>Person Name</h1>
                        <h2 style = {{fontSize:14, textAlign:"center"}}>Item Name</h2>
                    </Col>
                    <Col span={4}>
                    <img src={Report} alt="Report logo" style ={{ marginTop: "10px"}} onClick={this.gotoReport}></img>
                    </Col>
                </Row>
            </div>
               <Card style={{ width: "80%", backgroundColor: "#00d2d2", float:"left", color:"white"}}>
                <p style={{fontWeight:700}}>Name</p>
                <p>This is a long message. Maybe two to three lines.</p>
                <p><i>Date and Time</i></p>
              </Card>
              <Card style={{ width: "65%", backgroundColor: "#fff", float:"right" }}>
                <p style={{fontWeight:700}}>Your name</p>
                <p>This is the reply</p>
                <p><i>Date and Time</i></p>
              </Card>
            <div>

            <Messages onSubmitMessage={messageString => this.submitMessage(messageString)}/>
            </div>
            <Nav />
            </div>
        );
    }
}
export default Chat;