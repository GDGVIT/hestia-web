import React from 'react'
import { Input } from 'antd';
import PropTypes from 'prop-types';

class Messages extends React.Component{
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
    constructor() {
        super()
        this.state = {
          message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
     
      componentDidMount(){

      }
      handleChange(e) {
        this.setState({
          message: e.target.value
        })
      }
      handleSubmit(e) {
        e.preventDefault();
        console.log("submit", this.state.message);
        if(this.state.message != ''){
          this.props.onSubmitMessage(this.state.message);
        } 
        this.setState({
          message: ''
        })
      }

      render() {
        return (
          <form
            onSubmit={this.handleSubmit}
            className="send-message-form">
              <Input
                onChange={this.handleChange}
                value={this.state.message}
                placeholder="Type your message"
                type="text"
                className = "Send" 
              // suffix="Send"
               />
               <button type="submit" style={{float: "right",position: "relative",top: "-43px",border: "none",backgroundColor: "white",color: "#00d2d2",fontSize: "16px",right: "10px"}}>Send</button>
          </form>
        )
      }
    }
export default Messages;