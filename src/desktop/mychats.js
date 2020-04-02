import React from 'react';
import { Card, Row, Col, Drawer } from 'antd';
import { Radio } from 'antd';
import front from '../assets/front.png';
import Suggestpic from '../assets/suggest.png';
// import Chat from 'chat'


class Mychat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "mychats",
            mychats: [],
            otherchats:[],
            Suggest:[],
            value:'mr'
        }
        // console.log(this.props)
    }
    gotoShop = () => {
        // this.props.history.push("/suggestashop")
        console.log("coming soon")
    }
    gotoMyChat = (r,i,s,sn) => () => {
        console.log(this.props)
        window.localStorage.setItem("receiver_id", s);
        window.localStorage.setItem("item",i);
        window.localStorage.setItem("sender_id", r);
        window.localStorage.setItem("report", s);
        window.localStorage.setItem("chat_name",sn);

        // if(this.props.history){
        //     this.props.history.push({
        //         pathname : "/chat", 
        //         state:{id: localStorage.getItem("receiver_id")}
        //     })
        // }
    }

    gotoOtherChat = (r,i,s,rn) => () => {
        console.log(this.props)
        window.localStorage.setItem("receiver_id", r);
        window.localStorage.setItem("item",i);
        window.localStorage.setItem("sender_id", s);
        window.localStorage.setItem("report", r);
        window.localStorage.setItem("chat_name",rn);

        // if(this.props.history){
        //     this.props.history.push({
        //         pathname : "/chat", 
        //         state:{id: localStorage.getItem("receiver_id")}
        //     })
        // }
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
        fetch('https://akina.ayushpriya.tech/api/v1/getMyChats',{
            method:"POST",
            headers: new Headers({
                'Authorization': localStorage.getItem("token")
            }),
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data)
        if(data.status == 500){
            console.log("err")
        }
        if(data.code == 200){
            this.setState({
                mychats: data.chats,
                
            });
        }
        console.log(this.state)
        })
        .catch(error => console.error(error))

        // other chats
        fetch('https://akina.ayushpriya.tech/api/v1/getOtherChats',{
            method:"POST",
            headers: new Headers({
                'Authorization': localStorage.getItem("token")
            }),
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data)
        if(data.status == 500){
            console.log("err")
        }
        if(data.code == 200){
            this.setState({
                otherchats: data.chats,
                
            });
        }
        console.log(this.state)
        })
        .catch(error => console.error(error))

        //get suggestions number
        fetch('https://akina.ayushpriya.tech/api/recommend/',{
            method: "GET",
            headers: new Headers({
                'Authorization': localStorage.getItem("token")
            })
        })
            .then(response => response.json())
            .then(data => {
            console.log(data)
            if(data.status == "success"){
                this.setState({
                    Suggest: data.payload
                })
            }
            console.log(this.state)
            })
            .catch(error => console.error(error))

     }

    render(){
        const { mychats } = this.state;
        const {otherchats} = this.state;
        const {Suggest} = this.state;
        const suggestnumber = Suggest.length;
            const mychatslist = mychats.length ? (
                mychats.map(
                    data => {
                        return (
                            <Card key = {data.receiver}>
                            <Row>
                                <Col span={17}>
                                    <div className="feed-card-header">
                                        <span>
                                            <strong>{data.sender_name}</strong>
                                        </span>
                                
                                    </div>
                                    <div className="feed-card-date">
                                        <p>{data.title}</p>
                                    </div>
                                </Col>
                                <Col span={7} className="iconz">
                                    <div className="imgback" onClick={this.gotoMyChat(`${data.receiver}`, `${data.title}`, `${data.sender}`, `${data.sender_name}`)}>
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
                                            <strong>{data.receiver_name}</strong>
                                        </span>
                                
                                    </div>
                                    <div className="feed-card-date">
                                        <p>{data.title}</p>
                                    </div>
                                </Col>
                                <Col span={7} className="iconz">
                                    <div className="imgback" onClick={this.gotoOtherChat(`${data.receiver}`, `${data.title}`, `${data.sender}`, `${data.receiver_name}`)}>
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
            
           return( 
            <div className="mychats">
                <div className="main-title">    
                <Row>
                    <Col span={24}>
                        <p style={{fontSize:"24px",fontWeight:"600"}}>Chats And Suggestions</p>
                    </Col>
                </Row>
 
                </div>

                <Card>
                    <Row>
                    <Col span={5} className="iconz">
                            <div>
                                <img src={Suggestpic} alt="suggest"></img>
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className="feed-card-header" style={{marginTop:"6px", fontSize:"18px"}}>
                                   Suggestions | {suggestnumber}
                            </div>
                        </Col>
                        <Col span={5} className="iconz">
                            <div className="imgback">
                                <img src={front} alt="location" style={{marginLeft:"10px"}} onClick ={this.gotoShop}></img>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Radio.Group defaultValue="mr" buttonStyle="solid">
                    <Radio.Button value="mr" onClick = {this.handleClick('mr')}>My Requests</Radio.Button>
                    <Radio.Button value="or" onClick = {this.handleClick('or')}>Other Requests</Radio.Button>
                </Radio.Group>
                <div className="main-content">
                    {this.state.value == "mr" && <div>{mychatslist}</div>}
                    {this.state.value == "or" && <div>{otherchatslist}</div>}
                </div>
                <Drawer
                title="My Chats"
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={this.state.mychats}
                width="400px"
            >
                {/* <Chat /> */}
                </Drawer>
                
                <Drawer
                title="My Chats"
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={this.state.mychats}
                width="400px"
            >
                <Mychat />
                </Drawer>
            </div>              
        );
    }
}
export default Mychat;
