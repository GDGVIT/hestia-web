import React from 'react'
import { Tabs } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

const { TabPane } = Tabs;


class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "feed"
        }
    }
    render(){
        return(
            <div>
                <Tabs tabPosition="bottom">
                    <TabPane tab="Tab 1" key="feed">
                        <NavLink to="/feed">Feed</NavLink>
                    </TabPane>
                    <TabPane tab="Tab 2" key="news">
                        <NavLink to="/news">News</NavLink>
                    </TabPane>
                </Tabs>
            </div>
        )
    }   
}

export default Nav;