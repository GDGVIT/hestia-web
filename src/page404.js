import React from 'react'

class POrgs extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        setTimeout(()=>{
        this.props.history.push("/")
        },1000)
    }
render(){
    return(<div style={{textAlign:'center'}}><h1>This page does not exist. Redirecting to home page.</h1></div>)
}
}
export default POrgs; 