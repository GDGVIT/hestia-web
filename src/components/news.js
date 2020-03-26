import React from 'react';
import { Card, Row, Col } from 'antd';
import profile from '../assets/profile.png';
import {Link} from 'react-router-dom';


class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: "const"
        }
    }
    render(){
        return(
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>News</h1>
                    </Col>
                    <Col span={6}>
                    <Link to="/profile"><img src={profile} alt="Profile logo"></img></Link>
                    </Col>
                </Row>
 
                </div>
                <div className="main-content">
                    <Card>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                        Heading of card
                                    </span>
                                    <p>4</p>
                                </div>
                                <div className="news-card-content">
                                    <p>This is the description of the news we can show upto 60 words here and then if they want they can click on the link below and visit it. Makes sense eh?</p>
                                </div>
                            </Col>
                            <Col span={24} className="news-bottom-select">
                                <p>
                                    Date and Time
                                </p>
                                <a href="#"> Read full story </a>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                        Heading of card
                                    </span>
                                    <p>4</p>
                                </div>
                                <div className="news-card-content">
                                    <p>This is the description of the news we can show upto 60 words here and then if they want they can click on the link below and visit it. Makes sense eh?</p>
                                </div>
                            </Col>
                            <Col span={24} className="news-bottom-select">
                                <p>
                                    Date and Time
                                </p>
                                <a href="#"> Read full story </a>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                        Heading of card
                                    </span>
                                    <p>4</p>
                                </div>
                                <div className="news-card-content">
                                    <p>This is the description of the news we can show upto 60 words here and then if they want they can click on the link below and visit it. Makes sense eh?</p>
                                </div>
                            </Col>
                            <Col span={24} className="news-bottom-select">
                                <p>
                                    Date and Time
                                </p>
                                <a href="#"> Read full story </a>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                        Heading of card
                                    </span>
                                    <p>4</p>
                                </div>
                                <div className="news-card-content">
                                    <p>This is the description of the news we can show upto 60 words here and then if they want they can click on the link below and visit it. Makes sense eh?</p>
                                </div>
                            </Col>
                            <Col span={24} className="news-bottom-select">
                                <p>
                                    Date and Time
                                </p>
                                <a href="#"> Read full story </a>
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                        Heading of card
                                    </span>
                                    <p>4</p>
                                </div>
                                <div className="news-card-content">
                                    <p>This is the description of the news we can show upto 60 words here and then if they want they can click on the link below and visit it. Makes sense eh?</p>
                                </div>
                            </Col>
                            <Col span={24} className="news-bottom-select">
                                <p>
                                    Date and Time
                                </p>
                                <a href="#"> Read full story </a>
                            </Col>
                        </Row>
                    </Card>
                </div>
          </div>
        );
    }
}

export default News;