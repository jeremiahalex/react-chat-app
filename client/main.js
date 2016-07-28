import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { createStore } from 'redux'

const socket = io(window.location.host)
// pass initial state to our reducer function
const chatReducer = (state = {loading: true, status: 'loading', name: null, messages: [], online: ''}, action) => {
  switch (action.type) {
    case 'status':
      return Object.assign({}, state, { status: action.status })      
      // return {...state, status: action.status }
    case 'disconnect':
      return {...state, status: action.status, messages: [], name: null }
    case 'message':
      return {...state, messages: state.messages.concat([{ type: action.message.type, message: action.message.message, from: action.message.from }]) }
    case 'online':
      return {...state, online: action.online.concat() }
    case 'name':
      return {...state, name: action.name.concat() }
    default:
      return state
  }
}
// create a redux store
const reduxStore = createStore(chatReducer)

const render = () => {
  ReactDOM.render(<App reduxStore={reduxStore} socket={socket} />, document.getElementById('react-container'))
}

// subscribe to all changes to store and render
reduxStore.subscribe(() => {
  console.log('App State: ', reduxStore.getState())
  render()
})

// call render for the first time
render()
