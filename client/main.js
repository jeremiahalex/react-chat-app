import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { createStore } from 'redux'

// pass initial state to our reducer function
const chatReducer = (state = {loading: true, status: 'loading', name: null, messages: [], online: ''}, action) => {
  switch (action.type) {
    case 'status':
      return Object.assign({}, state, { status: action.status })
    default:
      return state
  }
}
// create a redux store
const reduxStore = createStore(chatReducer)

const render = () => {
  ReactDOM.render(<App redux={reduxStore} socket={io(window.location.host)} />, document.getElementById('react-container'))
}

// subscribe to all changes to store and render
reduxStore.subscribe(() => {
  console.log('App State: ', reduxStore.getState())
  render()
})

// use dispatch to add a state
// store.dispatch({ type: 'join' })
