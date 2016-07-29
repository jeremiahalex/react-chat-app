import React from 'react'
import Form from './form'

class Join extends React.Component {
  constructor (props) {
    super(props)

    // custom functions by default do not have this bound
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _handleFormSubmit (name) {
    this.props.socket.emit('join', { name: name })
    this.props.handleJoin(name)
  }

  render () {
    return (
    <section id="join" className="well">
      <Form handleSubmit={this._handleFormSubmit} reduxStore={this.props.reduxStore} />
    </section>
    )
  }
}

Join.propTypes = {
  handleJoin: React.PropTypes.func.isRequired
}

export default Join
