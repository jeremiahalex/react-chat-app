import React from 'react'
import Form from './form'
import Message from './message'

class Chat extends React.Component {
  constructor (props) {
    super(props)

    // custom functions by default do not have this bound
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    // saving the functions to shorter names
    this._dispatch = props.reduxStore.dispatch
    this._getState = props.reduxStore.getState
  }

  _handleFormSubmit (message) {
    this.props.socket.emit('chat', message)

    // pass message to parent
    this.props.handleSend(message)
  }

  render () {
    // in this function we spit the immutable list into a normal JS array and map each item
    return (
    <main className="panel panel-default">
      <div className="panel-heading">
        <Form handleSubmit={this._handleFormSubmit} placeholder="say what" buttomLabel="Send" />
      </div>
      <section className="panel-body">
        <div className="text-center">
          <small id="connected">{this.props.online}</small>
        </div>
        <hr />
        <div id="messages">
          {this.props.messages.toJS().map((message, i) => (<Message {... message} key={i} />))}
        </div>
      </section>
    </main>
    )
  }
}

Chat.propTypes = {
  handleSend: React.PropTypes.func.isRequired
}

export default Chat
