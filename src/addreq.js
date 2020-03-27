import React from 'react'
import { Modal, Button } from 'antd';

class Addreq extends React.Component {
constructor(props){
    super(props);
    this.state = {
        visible: false
    }
}
  componentWillReceiveProps(){
    this.setState({
      visible: this.props.disp,
    });
    console.log(this.props.disp)

  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Addreq;