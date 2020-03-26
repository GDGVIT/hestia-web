import React from 'react';
import { Card, Row, Col } from 'antd';
import profile from '../assets/profile.png';
import store from '../assets/store.png';
import check from '../assets/check.png';
import {Link} from 'react-router-dom';

class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    render(){
        return(
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>Requests</h1>
                    </Col>
                    <Link to="/profile"><img src={profile} alt="Profile logo"></img></Link>
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
                                    <img src={store} alt="location"></img>
                                </div>
                                <div className="imgback">
                                    <img src={check} alt="location"></img>
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
                                    <img src={store} alt="location"></img>
                                </div>
                                <div className="imgback">
                                    <img src={check} alt="location"></img>
                                </div>
                            </Col>
                        </Row>
                    </Card>                    <Card>
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
                                    <img src={store} alt="location"></img>
                                </div>
                                <div className="imgback">
                                    <img src={check} alt="location"></img>
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
                                    <img src={store} alt="location"></img>
                                </div>
                                <div className="imgback">
                                    <img src={check} alt="location"></img>
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
                                    <img src={store} alt="location"></img>
                                </div>
                                <div className="imgback">
                                    <img src={check} alt="location"></img>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
          </div>
        );
    }
}

export default Feed;