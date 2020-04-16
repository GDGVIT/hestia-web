import React from 'react';
import { Collapse, Row, Col } from 'antd';
import emailI from '../assets/email.svg';
import phone from '../assets/call.svg';
import linkI from '../assets/link.svg';

const { Panel } = Collapse;

class Explore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEmptyState: true,
            news:[]
        }
    }

    componentDidMount(){

        fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+localStorage.getItem("latitude")+'&longitude='+localStorage.getItem("longitude")+'&localityLanguage=en', {
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status===400){
                this.props.alert.show("Couldn't get location. Reload and try again")
            }
            let str = data.localityInfo.administrative[2].name
            let s = str.split(" ")[0];
            this.setState({         //do not remove setState
                city:s
            })
            return s;
        })
        .then(citi=>{
            console.log(citi)
            fetch('https://hestia-requests.herokuapp.com/api/requests/user_organization_view/?city=mumbai',{
                method: 'GET',
                headers: new Headers({
                    'Authorization': localStorage.getItem("token")
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({
                    news:data.Organization
                })
            })
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))
     }

     tileIcon=(email, number, link)=>{
        return(
        <div>
            <a className="imgback" href={'mailto:'+email}>
                <img  style={{marginLeft:'8px'}} src={emailI} alt="Click to mail"></img>
            </a>
            <a className="imgback" href={'tel:'+number} >
                <img style={{marginLeft:'8px'}} src={phone} alt="Click to call"></img>
            </a> 
            <a className="imgback" href={link}>
                <img style={{marginLeft:'8px'}} src={linkI} alt="Website link"></img>
            </a> 
        </div>
        )
     }

    render(){

        const { news } = this.state;
        // console.log(requests)
        const newslist = news.length?(
            news.map(
                request =>{
                    return(
                            <Panel showArrow={false} header={<span>{request.name}</span>} key={request.email} extra={this.tileIcon(request.email, request.phone_no, request.web_links)} className="ant-card">
                            <p>{request.description}</p>
                            </Panel>
                    )
                }
            )




        ) : (
            <div>No organizations available in your area</div>
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
                        {newslist}
                    </Collapse>
                </div>
          </div>
        );
    }
}

export default Explore;