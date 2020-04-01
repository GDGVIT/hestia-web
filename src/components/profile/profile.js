import React from 'react';
import profile from '../../assets/profile.png';
import { Card, Row, Col } from 'antd';
import Myreqs from './myreqs';
import Mychat from './mychats'
import Nav from '../nav';
import front from '../../assets/front.png';
import back from '../../assets/back.png';
import Edit from './edit';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goto: "profile",
            Requests: [],
            mychats: []
        }
    }
    goBack = () =>{
        console.log(this.props)
        if(this.props.p){
            this.props.p.g.history.push("/feed");
            // this.props.p.history.push("/feed");
        }else{
            this.props.history.push("/feed");
        }
        
        this.props.history.push("/feed");
    }
    redirectTo = (e) =>{
        console.log(e)
    }
    redirectToreqs = () =>{
        this.props.history.push("/myreqs")
    }
    redirectTochats = () =>{
        this.props.history.push("/mychats")
    }
    redirectToedit = () =>{
        this.props.history.push("/edit")
    }
    componentDidMount(){
       if(localStorage.getItem("token")){
        console.log("someone's logged in")
       }else{
           this.props.history.push("/login");
       }

       fetch('https://hestia-requests.herokuapp.com/api/requests/my_requests/', {
            headers: new Headers({
            'Authorization': localStorage.getItem("token")
            })
            })
            .then(res => res.json())
            .then(data => {
                 console.log(data)
            this.setState({
                Requests: data.Request
            });
            console.log(this.state)
            })
            .catch(error => console.error(error))

        var obj = {"user_id" : parseInt(localStorage.getItem("user_id"))}
        fetch('https://hestia-chat.herokuapp.com/api/v1/getChats',{
                method:"POST",
                headers: new Headers({
                    'Authorization': localStorage.getItem("token")
                }),
                body: JSON.stringify(obj)
            })
            .then(response => response.json())
            .then(data => {
            console.log(data)
            if(data.status == 500){
                console.log("err")
            }
            if(data.code == 200){
                this.setState({
                    mychats: data.chats,
                    
                });
            }
            console.log(this.state)
            })
            .catch(error => console.error(error))

    }
    logoutsar=()=>{
        localStorage.removeItem("token");
        this.props.history.push("/login")
    }

    render(){
        const {Requests}  = this.state;
        const {mychats} = this.state;

        const mychatslist = mychats.length;        
        const reqlist = Requests.length;
        console.log(reqlist)
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
                <div style={{overflow:"scroll", height:"60vh"}}>
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
                        Chats and Suggestions | {mychatslist}
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
export default Profile;
