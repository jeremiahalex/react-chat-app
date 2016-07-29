import React from 'react'

class Form extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: ''
    }

    // custom functions by default do not have this bound
    this._handleMessageChange = this._handleMessageChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._getInputValue = this._getInputValue.bind(this)
    // this._dispatch = props.reduxStore.dispatch
    // this._getState = props.reduxStore.getState
  }

  _handleMessageChange (e) {
    // this._dispatch({ type: 'form', form: e.target.value })
    this.setState({message: e.target.value})
  }

  _handleSubmit (e) {
    e.preventDefault()
    if (this._getInputValue().length === 0) return false

    // pass the result to the parent
    this.props.handleSubmit(this._getInputValue())

    // reset the input
    // this._dispatch({ type: 'form', form: '' })
    this.setState({message: ''})
  }

  _getInputValue() {
    return this.state.message
    // return this._getState().form
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
          value={this._getInputValue()}
          onChange={this._handleMessageChange} />
        {' '}
        <button id="sendJoin" className="btn btn-success" disabled={!this._getInputValue()}>
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
