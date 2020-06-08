import React from 'react';
import { Collapse, Row, Col } from 'antd';
import emailI from '../assets/email.svg';
import phone from '../assets/call.svg';
import linkI from '../assets/link.svg';
import Loader1 from '../loader'

const { Panel } = Collapse;

class Explore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            news:[]
        }
    }

    componentDidMount(){
        this.setState({
            loading:true
        })
            fetch('https://akina.ayushpriya.tech/api/requests/user_organization_view/',{
                method: 'GET',
                headers: new Headers({
                    'Authorization': localStorage.getItem("token")
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({
                    news:data.Organization,
                    loading: false
                })
            })
            .catch(error=>console.error(error))
     }

     tileIcon=(email, number, link)=>{
        return(
        <div>
            <a className="imgback" href={link} target="_blank">
                <img style={{marginLeft:'8px'}} src={linkI} alt="Website link"></img>
            </a> 

            <a className="imgback" href={'tel:'+number} >
                <img style={{marginLeft:'8px'}} src={phone} alt="Click to call"></img>
            </a> 

            <a className="imgback" href={'mailto:'+email}>
                <img  style={{marginLeft:'8px'}} src={emailI} alt="Click to mail"></img>
            </a>
        </div>
        )
     }

    render(){

        const {loading} = this.state;

        const { news } = this.state;
        const mssg = loading?(''):('No organisations available')
        // console.log(requests)
        const newslist = news.length?(
            news.map(
                request =>{
                    return(
                            <Panel showArrow={false} header={<div className='colp-header'>{request.name}</div>} key={request.email} extra={this.tileIcon(request.email, request.phone_no, request.web_links)} className="ant-card">
                            <p>{request.description}</p>
                            </Panel>
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
                        <h1>Explore</h1>
                    </Col>
                </Row>
                </div>
                <div className="main-content">
                    <Collapse defaultActiveKey={['1']} className="site-collapse-custom-collapse">
                        {loading && <Loader1 />}
                        {newslist}
                    </Collapse>
                </div>
          </div>
        );
    }
}

export default Explore;