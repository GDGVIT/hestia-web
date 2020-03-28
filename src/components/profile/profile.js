import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Myreqs from './myreqs';
import Mychat from './mychats'
import Nav from '../nav';
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "profile",
            Requests: [ ]
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
    componentDidMount(){
       if(localStorage.getItem("token")){
        console.log("someone's logged in")
       }else{
           this.props.history.push("/login");
       }

       fetch('https://hestia-requests.herokuapp.com/app/my_requests/', {
            headers: new Headers({
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiJhYmNkZWdoaWprZjEyMzQifQ.GqnmZCcGjtCN_bTznL5LbA_Wdt_BsBN5IpSAHmdDeu8'
            })
            })
            .then(res => res.json())
            .then(data => {
                 console.log(data)
            this.setState({
                Requests: data.Requests
                
            });
            console.log(this.state)
            })
            .catch(error => console.error(error))

    }
    logoutsar=()=>{
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
    render(){
        const { Requests } = this.state;
        
        const reqlist = Requests.length
        // console.log(reqlist)
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
                        My requests | {reqlist}
                    </div>
                </Card>
                <Card key="chat" onClick={this.redirectTochats}>
                    <div className="prof-card-title">
                        My chats | 3
                    </div>
                </Card>
                <Card key="logout" onClick={this.logoutsar}>
                    <div className="prof-card-title">
                        LOG OUT (TEMP)
                    </div>
                </Card>
                </div>
                <Nav />
            </div>
        );
        }
    }
}
export default Profile;
