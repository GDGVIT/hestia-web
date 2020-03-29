import React from 'react'
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom';



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
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="feed">
                    <NavLink to="/feed">Feed</NavLink>
                    </Menu.Item>
                    <Menu.Item key="news">
                    <NavLink to="/news">News</NavLink>
                    </Menu.Item>
                </Menu>        
            </div>
        );
    }   
}

export default Nav;