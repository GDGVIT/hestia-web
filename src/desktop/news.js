import React from 'react';
import { Card, Row, Col } from 'antd';

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEmptyState: true,
            news:[ ]
        }
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/dlogin");
        }


            fetch('https://hestia-info.herokuapp.com/node',{
                headers: new Headers({
                    'content-type': 'application/json'
                })
            })
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
            <div>No news for now</div>
        )







            return(
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>News</h1>
                    </Col>
                </Row>
 
                </div>
                <div className="main-content">
                    {newslist}
                </div>
          </div>
        );
    }
}

export default News;