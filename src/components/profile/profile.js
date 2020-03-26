import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Myreqs from './myreqs';
import Mychat from './mychats'


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "profile"
        }
    }
    redirectTo = (e) =>{
        console.log(e)
    }
    redirectToreqs = () =>{
        this.setState({
          goto: "myreqs"
        })
    }
    redirectTochats = () =>{
        this.setState({
            goto: "mychat"
        })
    }
    render(){
        if(this.state.goto === "myreqs"){
            return(
                <Myreqs />
            );
        }else if(this.state.goto === "mychat"){
           return( <Mychat /> );
        }else if(this.state.goto === "profile"){
        return(
            
            <div>
                <div className="main-title">    
                    <Row>
                        <Col span={18}>
                            <h1>Profile</h1>
                        </Col>
                        <Col span={6}>
                        <img src={profile} alt="Profile logo"></img>
                        </Col>
                    </Row>
 
                </div>
                <div>
                <Card key="edit" onClick={this.redirectTo}>
                    <div className="prof-card-title">
                        Edit Profile
                    </div>
                </Card>
                <Card key="reqs" onClick={this.redirectToreqs}>
                    <div className="prof-card-title">
                        My requests | 4
                    </div>
                </Card>
                <Card key="chat" onClick={this.redirectTochats}>
                    <div className="prof-card-title">
                        My chats | 3
                    </div>
                </Card>
                </div>
            </div>
        );
        }
    }
}
export default Profile;
