import React from 'react'
import { Card, Row, Col } from 'antd';
import back from '../assets/back.png';


class Sap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Suggest: []
        }
    }
    gotoProfile = () => {
        this.props.history.push("/mychats")
    }
    componentDidMount(){
        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }

            fetch('https://akina.ayushpriya.tech/api/recommend/',{
                method: "GET",
                headers: new Headers({
                    'Authorization': localStorage.getItem("token")
                })
            })
                .then(response => response.json())
                .then(data => {
                // console.log(data)
                if(data.status == "success"){
                    this.setState({
                        Suggest: data.payload
                    })
                }
                // console.log(this.state)
                })
                .catch(error => console.error(error))
     }
    render(){
        const {Suggest} = this.state;
        const suggestlist = Suggest.length ? (
            Suggest.map(
                data => {
                    return(
                        <Card>
                        <Row>
                            <Col span={24}>
                                <div className="news-card-header">
                                    <span>
                                        <p> {data.name_of_shop} </p>
                                    </span>
                                    <p>Phone - {data.phone_number}</p>
                                </div>
                                <div className="news-card-content">
                                    <p style={{width:"100%"}}><i>Landmark - </i>  {data.landmark}</p> 
                                    <br />
                                    <p style={{width:"100%"}}> <i>Description - </i> {data.description_of_shop}</p>

                                    <p>{data.extra_instruction}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    )
                }
            )
        ) : (
            <div style={{textAlign:"center"}}>No Suggestion yet</div>
        )
        return(
            <div>
            <div className="main-title">    
            <Row>
                <Col span={24}>
                    <p style={{fontSize:"24px",fontWeight:"600",marginTop:"7px"}}>Your Suggestions</p>
                </Col>
            </Row>
            </div>
                    {suggestlist}
        </div>
        )
    }
}
export default Sap;