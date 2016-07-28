/* global */
import React from 'react'
import Join from './join'
import Chat from './chat'

class App extends React.Component {

  constructor () {
    console.log('constructor')
    super()

    // this.state = {
    //   loading: true,
    //   status: 'loading',
    //   name: null,
    //   messages: [],
    //   online: ''
    // }

    this._handleSend = this._handleSend.bind(this)
    this._handleJoin = this._handleJoin.bind(this)
  }

  componentWillMount () {
    console.log('componentWillMount')

    // App connects
    this.props.socket.on('connect', () => {
      console.log('Connected to Chat Socket')
      this.props.reduxStore.dispatch({ type: 'status', status: 'connected' })
    // this.setState({ status: 'connected' })
    })

    // App disconnects
    this.props.socket.on('disconnect', () => {
      console.log('Disconnected from Chat Socket')
      // this.setState({ status: 'disconnected', messages: [], name: null })
      this.props.reduxStore.dispatch({ type: 'disconnect', status: 'disconnected' })
    })

    // welcome message received from the server
    this.props.socket.on('welcome', msg => {
      console.log('Received welcome message: ', msg)
      // enable the form and add welcome message
      // this.setState({ messages: this.props.reduxStore.messages.concat([{ type: 'notice', message: msg }]) })
      this.props.reduxStore.dispatch({ type: 'message', message: { type: 'notice', message: { type: 'notice', message: msg } } })
    })

    // chat message from another user
    this.props.socket.on('chat', msg => {
      console.log('Received message: ', msg)
      // this.setState({ messages: this.props.reduxStore.messages.concat([{ type: 'received', message: msg.message, from: msg.user.name }]) })
      this.props.reduxStore.dispatch({ type: 'message', message: { type: 'received', message: msg.message, from: msg.user.name } })
    })

    // message received that new user has joined the chat
    this.props.socket.on('joined', user => {
      console.log(user.name + ' joined left the chat.')
      // this.setState({ messages: this.props.reduxStore.messages.concat([{ type: 'user', message: ' joined the chat.', from: user.name }]) })
      this.props.reduxStore.dispatch({ type: 'message', message: { type: 'user', message: ' joined the chat.', from: user.name } })
    })

    // handle leaving message
    this.props.socket.on('left', user => {
      console.log(user.name + ' left the chat.')
      // this.setState({ messages: this.props.reduxStore.messages.concat([{ type: 'user', message: ' left the chat.', from: user.name }]) })
      this.props.reduxStore.dispatch({ type: 'message', message: { type: 'user', message: ' left the chat.', from: user.name } })
    })

    // keep track of who is online
    this.props.socket.on('online', connections => {
      var names = ''
      console.log('Connections: ', connections)
      for (var i = 0; i < connections.length; ++i) {
        if (connections[i].user) {
          if (names.length > 0) {
            if (i === connections.length - 1) names += ' and '
            else names += ', '
          }
          names += connections[i].user.name
        }
      }
      this.props.reduxStore.dispatch({ type: 'online', online: names })
    // this.setState({ online: names })
    })
  }

  _handleJoin (name) {
    // this.setState({ name: name })
    this.props.reduxStore.dispatch({ type: 'name', name: name })
  }
  _handleSend (message) {
    // this.setState({ messages: this.props.reduxStore.messages.concat([{ type: 'sent', message: message, from: this.props.reduxStore.name }]) })
    this.props.reduxStore.dispatch({ type: 'message', message: { type: 'sent', message: message, from: this.props.reduxStore.name } })
  }

  render () {
    console.log('render')
    let connected = this.props.reduxStore.status === 'connected'
    let classNames = 'label label-default'
    if (!this.loading) {
      classNames = (connected) ? 'label label-success' : 'label label-danger'
    }

    let sectionToShow
    if (this.props.reduxStore.getState().messages.length === 0 || !this.props.reduxStore.getState().name) {
      sectionToShow = (<Join {...this.props} handleJoin={this._handleJoin} /> )
    } else {
      sectionToShow = (<Chat
                         {...this.props}
                         handleSend={this._handleSend}
                         messages={this.props.reduxStore.getState().messages}
                         online={this.props.reduxStore.getState().online} /> )
    }

    return (
    <div className="container">
      <h1>{this.props.title} <span id="status" className={classNames}>{this.props.reduxStore.getState().status}</span></h1>
      {sectionToShow}
    </div>
    )
  }
}

App.propTypes = {
  title: React.PropTypes.string.isRequired
}

App.defaultProps = {
  title: 'Simple React Chat'
}
export default App
