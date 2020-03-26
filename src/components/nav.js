import React from 'react'
import { Tabs } from 'antd';
import News from './news';
import Feed from './feed';
import plus from '../assets/plus.png'

const { TabPane } = Tabs;


class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "feed"
        }
    }
    onClick=(e)=>{
        this.setState({
            selected: e
        });
    }
    reqAdder = () =>{
        console.log(this.state.selected)
        if(this.state.selected === 'feed'){
            return( <div className="addReq">
                        <img src={plus} alt="add req"></img>
                    </div>
        );
        }
    }
    render(){
        return(
            <div>
                <Tabs tabPosition="bottom" onChange={this.onClick}>
                    <TabPane tab={<span className="textz">Feed</span>} key="feed">
                        <Feed />
                    </TabPane>
                    <TabPane tab={<span className="textz">News</span>} key="news">
                        <News />
                    </TabPane>
                </Tabs>
                {this.reqAdder()}

            </div>
        )
    }   
}

export default Nav;