import React from 'react'
import { Tabs } from 'antd';
import News from './news';
import Feed from './feed';

const { TabPane } = Tabs;


class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "feed"
        }
    }
    onClickz=(e)=>{
        this.setState({
            selected: e
        });

    }
    render(){
        return(
            <div>
                <Tabs tabPosition="bottom" onTabClick={this.onClickz}>
                    <TabPane tab={<span className="textz">Feed</span>} key="feed">
                        <Feed new={this.state.selected} />
                    </TabPane>
                    <TabPane tab={<span className="textz">News</span>} key="news">
                        <News new={this.state.selected} />
                    </TabPane>
                </Tabs>

            </div>
        )
    }   
}

export default Nav;