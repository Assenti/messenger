import React, { Component } from 'react'

export class Alert extends Component {
    deleteAlert() {
        this.props.deleteAlert()
    }

  render() {
    return (
      <div className={"alert " + this.props.messageStatus}
        onClick={this.deleteAlert.bind(this)}>
          {this.props.message}
      </div>
    )
  }
}

export default Alert
