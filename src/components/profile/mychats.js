import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Profile from './profile';
import { Radio } from 'antd';
import Nav from '../nav';
import front from '../../assets/front.png';
import back from '../../assets/back.png';
import { withRouter } from 'react-router';

class Mychat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "mychats",
            mychats: [],
            otherchats:[],
            value:'mr'
        }
        // console.log(this.props)
    }
    gotoProfile = () => {
        this.props.history.push("/profile")
    }
    gotoChat = (r,i) => () => {
        console.log(this.props)
        window.localStorage.setItem("receiver_id", r);
        window.localStorage.setItem("item",i);
        
        if(this.props.history){
            this.props.history.push("/chat")
        }else if(this.props.g.p){
            this.props.g.p.g.history.push("/chat");
        }else{
            this.props.g.history.push("/chat");
        }
    }

    handleClick = (e) => () => {
        console.log(e)
        this.setState({
            value: e
        })
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
         console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }
        var obj = {"user_id" : parseInt(localStorage.getItem("user_id"))}

        // my chats
        fetch('https://hestia-chat.herokuapp.com/api/v1/getMyChats',{
            method:"POST",
            headers: new Headers({
                'Authorization': localStorage.getItem("token")
            }),
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data)
        this.setState({
            mychats: data.chats
        });
        console.log(this.state)
        })
        .catch(error => console.error(error))

        // other chats
        fetch('https://hestia-chat.herokuapp.com/api/v1/getOtherChats',{
            method:"POST",
            headers: new Headers({
                'Authorization': localStorage.getItem("token")
            }),
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data)
        this.setState({
            otherchats: data.chats,
            
        });
        console.log(this.state)
        })
        .catch(error => console.error(error))

     }

    render(){
        const { mychats } = this.state;
        const {otherchats} = this.state;
        if(this.state.goto === "profile"){
            return(
                <Profile p={this.props}/>
            );
        }else if(this.state.goto === "mychats"){

            const mychatslist = mychats.length ? (
                mychats.map(
                    data => {
                        return (
                            <Card key = {data.receiver}>
                            <Row>
                                <Col span={17}>
                                    <div className="feed-card-header">
                                        <span>
                                            <strong>{data.title}</strong>
                                        </span>
                                
                                    </div>
                                    <div className="feed-card-date">
                                        <p>{data.receiver}</p>
                                    </div>
                                </Col>
                                <Col span={7} className="iconz">
                                    <div className="imgback" onClick={this.gotoChat(`${data.receiver}`, `${data.title}`)}>
                                        <img src={front} alt="location"></img>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        )

                    }
                )
            ) : (
                <div>You don't have any chats as yet</div>
            )
            
            const otherchatslist = otherchats.length ? (
                otherchats.map(
                    data => {
                        return (
                            <Card key = {data.receiver}>
                            <Row>
                                <Col span={17}>
                                    <div className="feed-card-header">
                                        <span>
                                            <strong>{data.title}</strong>
                                        </span>
                                
                                    </div>
                                    <div className="feed-card-date">
                                        <p>{data.receiver}</p>
                                    </div>
                                </Col>
                                <Col span={7} className="iconz">
                                    <div className="imgback" onClick={this.gotoChat(`${data.receiver}`, `${data.title}`)}>
                                        <img src={front} alt="location"></img>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        )

                    }
                )
            ) : (
                <div>You don't have any chats as yet</div>
            )
            
            let content;
            if(this.state.value == 'mr'){
            content = <div>{mychatslist}</div>
            } else {
            content = <div>{otherchatslist}</div>
            }
           return( 
            <div className="mychats">
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                    <div className="imgbacc">
                            <img src={back} alt="back to feed" onClick={this.gotoProfile}></img>
                        </div>
                        <h1>My chats</h1>
                    </Col>
                    <Col span={6}>
                    <img onClick={this.gotoProfile} src={profile} alt="Profile logo"></img>
                    </Col>
                </Row>
 
                </div>
                <Radio.Group defaultValue="mr" buttonStyle="solid">
                    <Radio.Button value="mr" onClick = {this.handleClick('mr')}>My Requests</Radio.Button>
                    <Radio.Button value="or" onClick = {this.handleClick('or')}>Other Requests</Radio.Button>
                </Radio.Group>
                <div className="main-content">
                    {content}
                </div>
                <Nav />
            </div>              
        );
    }
    }
}
export default Mychat;
