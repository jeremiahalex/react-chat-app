import React from 'react'

export default class Message extends React.Component {
  constructor () {
    super()
  }
  render () {
    let msg
    switch (this.props.type) {
      case 'notice':
        msg = (<div className="text-center">
                 <strong>{this.props.message}</strong>
               </div>)
        break
      case 'received':
        msg = (<div className="alert alert-success">
                 <strong>{this.props.from}: </strong>
                 {this.props.message}
               </div>)
        break
      case 'sent':
        msg = (<div className="alert alert-info text-right">
                 <strong>{this.props.from}: </strong>
                 {this.props.message}
               </div>)
        break
      case 'user':
        msg = (<div className="text-center">
                 <strong>{this.props.from} {this.props.message}</strong>
               </div>)
        break
    }
    return msg
  }
}

Message.propTypes = {
  type: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired
}
