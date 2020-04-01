import React from 'react'
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import Cal from '../assets/cal.png';
import New from '../assets/news.png';



class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: "feed"
        }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    
    
    render(){
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="feed">
                    <NavLink to="/feed" style={{fontSize:16,color:"#989898"}}> <img src={Cal} style={{marginRight:"10px"}} />Feed</NavLink>
                    </Menu.Item>
                    <Menu.Item key="news">
                    <NavLink to="/news" style={{fontSize:16,color:"#00d2d2"}}>  <img src={New} style={{marginRight:"10px"}} />News</NavLink>
                    </Menu.Item>
                </Menu>        
            </div>
        );
    }   
}

export default Nav;