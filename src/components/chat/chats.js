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
        }
    }
    gotoReport=()=>{
      this.props.history.push("/report");
    }

    componentDidMount(){
      if(localStorage.getItem("token")){
       console.log("someone's logged in")
      }else{
          this.props.history.push("/login");
      }
   }
    render(){
        return(
            <div>
            <div>    
                <Row style={{marginTop:20}}>
                    <Col span={4}>
                      <div className="imgback">
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
            {/* <Input placeholder="Enter your message" className = "Send" suffix="Send" />          */}
            <Messages />
            </div>
            <Nav />
            </div>
        );
    }
}
export default Chat;