import React from 'react';
import { Card, Row, Col,Form, Input } from 'antd';
import back from '../../assets/back.png';


class Suggestions extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
     validateMessages = {
        types: {
            email: 'Not a validate email!',

        }
    }
    gotoFeed = () => {
        if(this.props.p){
            this.props.p.g.history.push("/feed");
            // this.props.p.history.push("/feed");
        }else{
            this.props.history.push("/feed");
        }
        
        this.props.history.push("/feed");
    }
    render(){
        return(
            <div>
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                    <div className="imgbacc">
                        <img src={back} alt="back to feed" onClick={this.gotoFeed}></img>
                    </div>
                        <h1>Suggest a Shop</h1>
                    </Col>
                </Row>
                </div>
                <Form name="nest-messages" validateMessages={this.validateMessages} className="login-form">
                    <Form.Item
                        name={['user', 'name']}
                        rules={[
                        {
                            type: 'name',
                        }
                        ]}
                    >
                        <Input 
                        placeholder="Name"
                        />
                    </Form.Item>

                </Form>
            </div>
        )
    }
}
export default Suggestions;
