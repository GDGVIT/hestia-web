import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Profile from './profile';
import deletez from '../../assets/delete.png';
import { Radio } from 'antd';
import Nav from '../nav';
import front from '../../assets/front.png';
import back from '../../assets/back.png';

class Mychat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "mychats",
            mychats: []
        }
    }
    gotoProfile = () => {
        this.setState({
            goto: "profile"
        });
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
         console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }
        var obj = {"user_id" : parseInt(localStorage.getItem("user_id"))}
        fetch('https://hestia-chat.herokuapp.com/api/v1/getChats',{
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
            mychats: data.chats,
            
        });
        console.log(this.state)
        })
        .catch(error => console.error(error))
     }

    render(){
        const { mychats } = this.state;
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
                                    <div className="imgback">
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
                    <Radio.Button value="mr">My Requests</Radio.Button>
                    <Radio.Button value="or">Other Requests</Radio.Button>
                </Radio.Group>
                <div className="main-content">
                    {mychatslist}
                </div>
                <Nav />
            </div>              
        );
        }
    }
}
export default Mychat;
