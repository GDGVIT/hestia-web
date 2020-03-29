import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Myreqs from './myreqs';
import Mychat from './mychats'
import Nav from '../nav';
import front from '../../assets/front.png';
import back from '../../assets/back.png';
import Edit from './edit';


const overflowcheck = {
    'overflow': 'scroll'
}

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "profile",
            Requests: [ ]
        }
    }
    goBack = () =>{
        if(this.props.p){
            this.props.p.g.history.push("/feed");
            // this.props.p.history.push("/feed");
        }else{
            this.props.history.push("/feed");
        }
        
        // this.props.history.push("/feed");
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
    redirectToedit = () =>{
        this.setState({
            goto: "edit"
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
            'Authorization': localStorage.getItem("token")
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
        if(this.props.p){
            this.props.p.g.history.push("/login");
            // this.props.p.history.push("/feed");
        }else{
            this.props.history.push("/login");
        }
    }

    render(){
        const { Requests } = this.state;
        
        const reqlist = Requests.length
        // console.log(reqlist)
        if(this.state.goto === "myreqs"){
            return(
                <Myreqs g={this.props}/>
            );
        }else if(this.state.goto === "mychat"){
           return( <Mychat g={this.props} /> );
        }else if(this.state.goto === "edit"){
            return(<Edit g={this.props}/>);
        }else if(this.state.goto === "profile"){
        return(
            
            <div>
                <div className="main-title">    
                    <Row>
                        <Col span={18}>
                        <div className="imgbacc">
                            <img src={back} alt="back to feed" onClick={this.goBack}></img>
                        </div>
                            <h1>Profile</h1>
                        </Col>
                        <Col span={6}>
                        <img src={profile} alt="Profile logo"></img>
                        </Col>
                    </Row>
 
                </div>
                <div style={overflowcheck}>
                <Card key="edit" className="profcard">
                    <div className="prof-card-title">
                        Edit Profile
                    </div>
                    <div className="imgback lil" onClick={this.redirectToedit}>
                            <img src={front} alt="back to feed"></img>
                    </div>
                </Card>
                <Card key="reqs" className="profcard">
                    <div className="prof-card-title">
                        My requests | {reqlist}
                    </div>
                    <div className="imgback lil" onClick={this.redirectToreqs}>
                            <img src={front} alt="back to feed"></img>
                    </div>
                </Card>
                <Card key="chat" className="profcard">
                    <div className="prof-card-title">
                        My chats | 3
                    </div>
                    <div className="imgback lil" onClick={this.redirectTochats}>
                            <img src={front} alt="back to feed"></img>
                    </div>
                </Card>
                <hr className="logouthr"></hr>
                <Card key="logout" onClick={this.logoutsar} className="logoutbtn">
                    <div className="prof-card-title">
                        Logout
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
