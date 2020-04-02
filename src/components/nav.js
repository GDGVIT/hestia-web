import React from 'react'
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import CalB from '../assets/Cal_B.svg';
import CalL from '../assets/Cal_L.svg';
import NewL from '../assets/New_L.svg';
import NewB from '../assets/New_B.svg';



class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: "feed",
        }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    
    
    render(){
        let cal;
        let news;
        if(this.state.current == "feed"){
            cal = CalB
            news = NewL
        }
        if(this.state.current == "news"){
            news = NewB
            cal = CalL
        }
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="feed">
                    <NavLink to="/feed" style={{fontSize:16}}><img src={cal} style={{marginRight:"10px"}} />Feed</NavLink>
                    </Menu.Item>
                    <Menu.Item key="news">
                    <NavLink to="/news" style={{fontSize:16}}><img src={news} style={{marginRight:"10px"}} />News</NavLink>
                    </Menu.Item>
                </Menu>        
            </div>
        );
    }   
}

export default Nav;