import React from 'react'

class Form extends React.Component {
  constructor () {
    super()

    this.state = {
      message: ''
    }

    // custom functions by default do not have this bound
    this._handleMessageChange = this._handleMessageChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleMessageChange (e) {
    this.setState({message: e.target.value})
  }

  _handleSubmit (e) {
    e.preventDefault()
    if (this.state.message.length === 0) return false

    // pass the result to the parent
    this.props.handleSubmit(this.state.message)

    // reset the input
    this.setState({message: ''})
  }

  render () {
    return (
    <form className="form-inline text-right" onSubmit={this._handleSubmit}>
      <fieldset>
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          autoComplete="off"
          required
          autoFocus
          value={this.state.message}
          onChange={this._handleMessageChange} />
        {' '}
        <button id="sendJoin" className="btn btn-success" disabled={!this.state.message}>
          {this.props.buttomLabel}
        </button>
      </fieldset>
    </form>
    )
  }
}

Form.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  buttomLabel: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

Form.defaultProps = {
  placeholder: 'Your name',
  buttomLabel: 'Join'
}

export default Form
