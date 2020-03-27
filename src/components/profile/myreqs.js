import React from 'react';
import profile from '../../assets/profile.png';
import deletez from '../../assets/delete.png';
import { Card, Row, Col } from 'antd';
import Profile from './profile';
import plus from '../../assets/plus.png';


class Myreqs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "myreqs"
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
        }else if(this.state.goto === "myreqs"){
            return(
            <div className="myreqs">
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>My Requests</h1>
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
                                    <p>4</p>
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
                                    <p>4</p>
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
                <div className="addReq">
                        <img src={plus} alt="add req"></img>
                </div>
            </div>              
        );
        }
    }
}
export default Myreqs;
