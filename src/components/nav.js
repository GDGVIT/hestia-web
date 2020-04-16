import React from 'react'
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import CalB from '../assets/Cal_B.svg';
import CalL from '../assets/Cal_L.svg';
import NewL from '../assets/New_L.svg';
import NewB from '../assets/New_B.svg';
import expB from '../assets/expolore.png';
import expG from '../assets/expolore_grey.png';
import {withRouter} from 'react-router-dom';


class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: "feed",
        }
    }
    handleClick = (e) => {
        // console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    componentDidMount() {
        if(this.props.location.pathname === '/news'){
            this.setState({
                current: 'news'
            })
        }else if(this.props.location.pathname === '/feed'){
            this.setState({
                current: 'feed'
            })
    }else if(this.props.location.pathname === '/explore'){
        this.setState({
            current: 'explore'
        })
}
    }    
    
    render(){
        let cal;
        let news;
        let exp;
        if(this.state.current === "feed"){
            cal = CalB
            news = NewL
            exp = expG
        }
        if(this.state.current === "news"){
            news = NewB
            cal = CalL
            exp = expG
        }
        if(this.state.current === "explore"){
            news = NewL
            cal = CalL
            exp = expB
        }
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="feed">
                    <NavLink to="/feed" style={{fontSize:16}}><img src={cal} style={{marginRight:"10px"}} alt="" />Feed</NavLink>
                    </Menu.Item>
                    <Menu.Item key="explore">
                    <NavLink to="/explore" style={{fontSize:16}}><img src={exp} style={{marginRight:"10px", width:'20px', height:'auto'}} alt="" />Explore</NavLink>
                    </Menu.Item>
                    <Menu.Item key="news">
                    <NavLink to="/news" style={{fontSize:16}}><img src={news} style={{marginRight:"10px"}} alt="" />News</NavLink>
                    </Menu.Item>
                </Menu>        
            </div>
        );
    }   
}

export default withRouter(Nav);