import React from 'react'
import { Input } from 'antd';


class Messages extends React.Component{
    constructor() {
        super()
        this.state = {
          message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      ws = new WebSocket('ws://hestia-chat.herokuapp.com/api/v1/ws?chat=1')
      handleChange(e) {
        this.setState({
          message: e.target.value
        })
      }
      handleSubmit(e) {
        e.preventDefault()
        console.log("submit", this.state.message);
        fetch("https://hestia-chat.herokuapp.com/api/v1/sendMessage",{
          method:"POST",
          headers: new Headers({
            // "Content-Type": "application/json",
            'Authorization': localStorage.getItem("token")
          }),
          body:{
            "receiver": 4,
            "from": 5,
            "text": this.state.message
          }
        })
        .then(response=> response.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));

        // this.props.sendMessage(this.state.message)
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
              suffix="Send" />
          </form>
        )
      }
    }
export default Messages;