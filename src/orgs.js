import React from 'react'

class Orgs extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        window.location="https://orgregister.netlify.com/"
    }
render(){
    return(<div style={{textAlign:'center'}}><h1>Please wait</h1></div>)
}
}
export default Orgs; 