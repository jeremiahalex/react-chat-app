import React from 'react'
import Form from './form'
import Message from './message'

class Chat extends React.Component {
  constructor (props) {
    super(props)

    // console.log('messages', props.messages.constructor)
    // custom functions by default do not have this bound
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _handleFormSubmit (message) {
    // console.log('Sending message: ', message)
    this.props.socket.emit('chat', message)

    // pass message to parent
    this.props.handleSend(message)
  }

  render () {
    return (
    <main className="panel panel-default">
      <div className="panel-heading">
        <Form handleSubmit={this._handleFormSubmit} placeholder="say what" buttomLabel="Send" reduxStore={this.props.reduxStore} />
      </div>
      <section className="panel-body">
        <div className="text-center">
          <small id="connected">{this.props.online}</small>
        </div>
        <hr />
        <div id="messages">
          {this.props.messages.map((message, i) => (<Message {... message} key={i} />))}
        </div>
      </section>
    </main>
    )
  }
}

Chat.propTypes = {
  messages: React.PropTypes.array.isRequired,
  handleSend: React.PropTypes.func.isRequired
}

export default Chat
