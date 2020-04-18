import React from 'react';
import { Card, Row, Col, Drawer } from 'antd';
import front from '../assets/front.png';
import Stats from './stats'
import Loader1 from '../loader'

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEmptyState: true,
            news:[ ],
            visible: false,
            loading: false
        }
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/dlogin");
        }
        this.setState({
            loading: true
        })

        fetch('https://hestia-info.herokuapp.com/node',{
                headers: new Headers({
                    'content-type': 'application/json'
                })
            })
                .then(response => response.json())
                .then(data => {
                // console.log(data)
                this.setState({
                    news: data.items,
                    loading: false
                });
                // console.log(this.state)
                })
                .catch(error => console.error(error))
     }

     gotoStats=()=>{
        this.setState({
            visible: true
        })
    }

    onClose=()=>{
        this.setState({
            visible: false
        })
    }
    render(){
        const {loading} = this.state;

        const { news } = this.state;
        const mssg = loading?(''):('No requests in your area')

        // console.log(requests)
        const newslist = news.length ? (
            news.map(
                request =>{
                    return(
                        <Card key={request.guid}>
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
            <div>{mssg}</div>
        )







            return(
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>News</h1>
                    </Col>
                </Row>
                <div style={{marginTop:'20px'}}>    
                <Row style={{width:'100%'}} className="ant-card">
                    <Col span={19} style={{width:'100%'}}>
                        <h1 style={{ 'fontSize':'16px', paddingTop:'12px', paddingLeft:'10px', textAlign:'left', fontWeight:'normal'}}>Statistics</h1>
                    </Col>
                    <Col span={5} className="iconz">
                            <div className="imgback" style={{margin:'10px'}} onClick={this.gotoStats}>
                                <img style={{marginLeft:'10px'}} src={front} alt="location"></img>
                            </div>
                    </Col>
                </Row>
                </div>
                </div>
                <div className="main-content">
                {loading && <Loader1 />}
                    {newslist}
                </div>
                <Drawer
                        placement="right"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width="400px"
                        zIndex="1049"
                    >
                    <Stats />
                </Drawer>
          </div>
        );
    }
}

export default News;