import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Profile from './profile';
import deletez from '../../assets/delete.png';



class Mychat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "mychats"
        }
    }
    gotoProfile = () => {
        this.setState({
            goto: "profile"
        });
    }

    render(){
        if(this.state.goto === "profile"){
            return(
                <Profile />
            );
        }else if(this.state.goto === "mychats"){
           return( 
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>My chats</h1>
                    </Col>
                    <Col span={6}>
                    <img onClick={this.gotoProfile} src={profile} alt="Profile logo"></img>
                    </Col>
                </Row>
 
                </div>
                <div className="main-content">
                    <Card>
                        <Row>
                            <Col span={17}>
                                <div className="feed-card-header">
                                    <span>
                                        <strong>Heading of card</strong>
                                    </span>
                            
                                </div>
                                <div className="feed-card-date">
                                    <p>Date and time</p>
                                </div>
                            </Col>
                            <Col span={7} className="iconz">
                                <div className="imgback">
                                    <img src={deletez} alt="location"></img>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col span={17}>
                                <div className="feed-card-header">
                                    <span>
                                        <strong>Heading of card</strong>
                                    </span>
                            
                                </div>
                                <div className="feed-card-date">
                                    <p>Date and time</p>
                                </div>
                            </Col>
                            <Col span={7} className="iconz">
                                <div className="imgback">
                                    <img src={deletez} alt="location"></img>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>              
        );
        }
    }
}
export default Mychat;
