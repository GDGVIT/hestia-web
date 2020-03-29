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
      handleChange(e) {
        this.setState({
          message: e.target.value
        })
      }
      handleSubmit(e) {
        e.preventDefault()
        console.log("submit", this.state.message);
        // fetch("")
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