import React from 'react'
import { Card, Row, Col } from 'antd';
import back from '../assets/back.png';
import check from'../assets/check.png';
import { Input,Form,Button } from 'antd';

const { TextArea } = Input;


class Report extends React.Component{
    state = {
        value: '',
      };
      gotoProfile=()=>{
        this.props.history.push("/profile");
        }
      onChange = ({ target: { value } }) => {
        this.setState({ value });
      };
      onSubmit = () =>{
          console.log("Submitting");
          var obj ={}
          obj["reported_by"] = parseInt(localStorage.getItem("receiver_id"));
          obj["reason"] = this.state.value;

          console.log(obj);

        fetch('https://hestia-report.herokuapp.com/user/report/',{
            method:"POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }),
            body:JSON.stringify(obj)
        })
        .then(response => {
             console.log(response)
             if(response.status == 201){
                this.props.history.push("/profile");
             }
        })
        .catch(err => console.log(err))
    }
      
    componentDidMount(){
        if(localStorage.getItem("token")){
         console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }
     }


     render(){
        const { value } = this.state;
         return(
             <div>
                <div className="main-title">    
                    <Row>
                        <Col span={18}>
                        <div className="imgbacc">
                            <img src={back} alt="back to feed" onClick={this.gotoProfile}></img>
                        </div>
                            <h1>Report</h1>
                        </Col>
                    </Row>
                </div>
                
                <Form >
                    <TextArea
                    value={value}
                    onChange={this.onChange}
                    placeholder="Reason to Report"
                    autoSize={{ minRows: 10, maxRows: 35 }}
                    style={{width:"80%", transform: "translateX(12%)", padding:"15px"}}
                    />
                

                <Form.Item>
                    <div style = {{marginTop:"30px", transform: "translateX(12%)"}}>
                        <Button type="primary" htmlType="submit" style={{backgroundColor:"#d95071"}} onClick={this.onSubmit}>
                        Report <img src={check} alt="Submit form"></img>
                        </Button>
                        <Button type="primary" onClick={this.gotoProfile} style={{backgroundColor:"#fff", color:"#000"}}>
                                Cancel <strong> X </strong>
                        </Button>
                    </div>
                </Form.Item>
                </Form>
             </div>
         )
    
    }
}
export default Report;