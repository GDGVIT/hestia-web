import React from 'react';
import { Menu } from 'antd';
import prof from '../assets/profile.png';
import expic from '../assets/expolore.png';
import chatpic from '../assets/mychats.png';
import reqpic from '../assets/myreqs.png';
import homeimg from '../assets/logo.png';
import Feed from './feed';


class Dmain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current: 'nearme',

        }
    }
    handleSort=(e)=>{
        this.setState({
            current: e
        })
        console.log(this.state)
    }
    componentDidMount(){
        if(!localStorage.getItem("token")){
            this.props.history.push("/dlogin")
        }
    }
    
    render(){
        return(
        <div className="container">
            <div className="dnav">
            <div className="dnavbar">
                    <img className="homeimg" src={homeimg} alt="Home"></img>
                    <div className="menitem">
                        <img src={expic} alt="explore" onClick={() => this.handleSort("exp")}></img>
                    </div>
                    <div className="menitem">
                        <img src={reqpic} alt="my requests" onClick={() => this.handleSort("myr")}></img>
                   </div>
                   <div className="menitem">
                        <img src={chatpic} alt="my chats" onClick={() => this.handleSort("myc")}></img>
                   </div>
                   <div className="menitem">
                        <img src={prof} alt="edit profile" onClick={() => this.handleSort("edp")}></img>
                   </div>
            </div>
            </div>
            <div className="container">
                <div className="feedcont">
                <Feed />
                </div>
                <div className="newscont">
                    scj skcj skdc skc sdk cskj cksdj cksjd claj cjdc sd cskdj cskjc sdkcj sdkc sdkcj
                </div>
            </div>
        </div>
        )
    }
}
export default Dmain;