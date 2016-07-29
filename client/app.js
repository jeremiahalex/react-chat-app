/* global */
import React from 'react'
import Join from './join'
import Chat from './chat'

class App extends React.Component {

  constructor (props) {
    console.log('constructor')
    super(props)

    this._handleSend = this._handleSend.bind(this)
    this._handleJoin = this._handleJoin.bind(this)
    // saving the functions to a shorter name
    this._dispatch = props.reduxStore.dispatch
    this._getState = props.reduxStore.getState
  }

  componentWillMount () {
    // App connects
    this.props.socket.on('connect', () => {
      console.log('Connected to Chat Socket')
      this._dispatch({ type: 'status', status: 'connected' })
    })

    // App disconnects
    this.props.socket.on('disconnect', () => {
      this._dispatch({ type: 'disconnect', status: 'disconnected' })
    })

    // welcome message received from the server
    this.props.socket.on('welcome', msg => {
      this._dispatch({ type: 'message', message: { type: 'notice', message: msg } })
    })

    // chat message from another user
    this.props.socket.on('chat', msg => {
      this._dispatch({ type: 'message', message: { type: 'received', message: msg.message, from: msg.user.name } })
    })

    // message received that new user has joined the chat
    this.props.socket.on('joined', user => {
      this._dispatch({ type: 'message', message: { type: 'user', message: ' joined the chat.', from: user.name } })
    })

    // handle leaving message
    this.props.socket.on('left', user => {
      this._dispatch({ type: 'message', message: { type: 'user', message: ' left the chat.', from: user.name } })
    })

    // keep track of who is online
    this.props.socket.on('online', connections => {
      var names = ''
      for (var i = 0; i < connections.length; ++i) {
        if (connections[i].user) {
          if (names.length > 0) {
            if (i === connections.length - 1) names += ' and '
            else names += ', '
          }
          names += connections[i].user.name
        }
      }
      this._dispatch({ type: 'online', online: names })
    })
  }

  _handleJoin (name) {
    this._dispatch({ type: 'name', name: name })
  }
  _handleSend (message) {
    this._dispatch({ type: 'message', message: { type: 'sent', message: message, from: this._getState().get('name') } })
  }

  render () {
    let connected = this._getState().get('status') === 'connected'
    let classNames = 'label label-default'
    if (!this._getState().get('loading')) {
      classNames = (connected) ? 'label label-success' : 'label label-danger'
    }

    let sectionToShow
    if (this._getState().get('messages').count() === 0 || !this._getState().get('name')) {
      sectionToShow = (<Join {...this.props} handleJoin={this._handleJoin} /> )
    } else {
      sectionToShow = (<Chat
                         {...this.props}
                         handleSend={this._handleSend}
                         messages={this._getState().get('messages')}
                         online={this._getState().get('online')} /> )
    }

    return (
    <div className="container">
      <h1>{this.props.title} <span id="status" className={classNames}>{this._getState().get('status')}</span></h1>
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
