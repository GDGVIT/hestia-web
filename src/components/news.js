import React from 'react';
import { Card, Row, Col } from 'antd';
import profile from '../assets/profile.png';
import Profile from '../components/profile/profile';
import Nav from './nav';

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEmptyState: true,
            news:[ ]
        }
    }
    gotoProfile=()=>{
        this.props.history.push("/profile");
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }


            fetch('https://akina.ayushpriya.tech/node')
                .then(response => response.json())
                .then(data => {
                console.log(data)
                this.setState({
                    news: data.items,
                    
                });
                console.log(this.state)
                })
                .catch(error => console.error(error))
     }
    render(){

        const { news } = this.state;
        // console.log(requests)
        const newslist = news.length ? (
            news.map(
                request =>{
                    return(
                        <Card key={request.isoDate}>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                       <p> {request.title.slice(0,30)}.... </p>
                                    </span>
                                    <p>WHO</p>
                                </div>
                                <div className="news-card-content">
                                    <p>{request.contentSnippet.slice(0,130)}....</p>
                                </div>
                            </Col>
                            <Col span={24} className="news-bottom-select">
                                <p>
                                    {request.isoDate.slice(0,10)}
                                </p>
                                <a href={request.link}> Read full story </a>
                            </Col>
                        </Row>
                    </Card>
                    )
                }
            )




        ) : (
            <div>No news for now</div>
        )







            return(
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>News</h1>
                    </Col>
                    <Col span={6}>
                    <img onClick={this.gotoProfile} src={profile} alt="Profile logo"></img>
                    </Col>
                </Row>
 
                </div>
                <div className="main-content">
                    {newslist}
                </div>
                <Nav />
          </div>
        );
    }
}

export default News;