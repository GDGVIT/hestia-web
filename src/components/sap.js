import React from 'react'
import { Card, Row, Col } from 'antd';
import back from '../assets/back.png';


class Sap extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    gotoProfile = () => {
        this.props.history.push("/mychats")
    }
    render(){
        return(
            <div className="main-title">    
            <Row>
                <Col span={24}>
                <div className="imgbacc">
                        <img src={back} alt="back to feed" onClick={this.gotoProfile}></img>
                    </div>
                    <p style={{fontSize:"24px",fontWeight:"600",marginTop:"7px"}}>Your Suggestions</p>
                </Col>
            </Row>

            </div>
        )
    }
}
export default Sap;