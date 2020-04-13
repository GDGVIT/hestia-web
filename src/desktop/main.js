import React from 'react';
import { Menu, Drawer, Card } from 'antd';
import prof from '../assets/profile.png';
import expic from '../assets/expolore.png';
import chatpic from '../assets/mychats.png';
import reqpic from '../assets/myreqs.png';
import homeimg from '../assets/logo.png';
import Feed from './feed';
import News from './news';
import Edit from './edit';
import Myreqs from './myreqs'
import front from '../assets/front.png';
import Mychat from './mychats'

class Dmain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current: 'nearme',
            visible: false,
            edit: false,
            myreqs: false,
            mychats: false,
            explore: false,
            visible5: false,

        }
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
          edit: false,
          myreqs: false,
          mychats: false,
          explore: false
        });
      };
    handleSort=(e)=>{
        switch(e){
            case 'prof': 
                        this.setState({
                            visible: true
                        })
                        break;
            case 'myr': 
                        this.setState({
                            myreqs: true
                        })
                        break;
            case 'myc': 
                        this.setState({
                            mychats: true
                        })
                        break;
            case 'exp': 
                        this.setState({
                            explore: true
                        })
                        break;
            default: console.log('weird request')
        }
        // console.log(this.state)
    }
    componentDidMount(){
        if(!localStorage.getItem("token")){
            this.props.history.push("/dlogin")
        }
    }
    logoutsar=()=>{
        localStorage.clear();
        localStorage.removeItem("token");
        this.props.history.push("/dlogin")
    }
    redirectToedit=()=>{
        this.setState({
            visible: false,
            edit: true
        })
    }
    render(){
        return(
        <div className="container">
            <div className="dnav">
            <div className="dnavbar">
                    <img className="homeimg" src={homeimg} alt="Home"></img>
                    <div className="menitem">
                        <img src={prof} alt="edit profile" onClick={()=>this.handleSort("prof")}></img>
                   </div>
                   <div className="menitem">
                        <img src={reqpic} alt="my requests" onClick={() => this.handleSort("myr")}></img>
                   </div>
                   <div className="menitem">
                        <img src={chatpic} alt="my chats" onClick={() => this.handleSort("myc")}></img>
                   </div>
                   <div className="menitem">
                        <img src={expic} alt="explore" onClick={() => this.handleSort("exp")}></img>
                    </div>
  
            </div>
            </div>
            <div className="container">
                <div className="feedcont">
                <Feed />
                </div>
                <div className="newscont">
                <News />
                </div>
            </div>
                <Drawer
                title="Profile"
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={this.state.visible}
                width="400px"
            >
                <Card key="edit" className="profcard">
                    <div className="prof-card-title">
                        Edit Profile
                    </div>
                    <div className="imgback lil" onClick={this.redirectToedit}>
                            <img src={front} alt="back to feed"></img>
                    </div>
                </Card>
                <Card key="logout" onClick={this.logoutsar} className="logoutbtn">
                    <div className="prof-card-title">
                        Logout
                    </div>
                </Card>
            </Drawer>
            <Drawer
                title="Profile"
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={this.state.edit}
                width="400px"
            >
                <Edit />
            </Drawer>
            <Drawer
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.myreqs}
                width="400px"
            >
                <Myreqs />
            </Drawer>
            <Drawer
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.mychats}
                width="400px"
            >
                <Mychat />
            </Drawer>
            <Drawer
                title="Explore"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.explore}
                width="400px"
            >
            <h3>Coming soon :)</h3>
            </Drawer>
        </div>
        )
    }
}
export default Dmain;