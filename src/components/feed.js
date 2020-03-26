import React from 'react';
import {Card} from 'antd';


class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    render(){
        return(
            <div>
                <Card title="Request1" extra={<a href="#">More</a>}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Request2" extra={<a href="#">More</a>}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card> 
            </div>
        );
    }
}

export default Feed;