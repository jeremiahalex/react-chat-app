import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { createStore } from 'redux'

// TODO. should implement immutable to enforce the data mutation restriction
// import { List, Map } from 'immutable'

const socket = io(window.location.host)
// pass initial state to our reducer function
const chatReducer = (state = {loading: true, status: 'loading', name: null, messages: [], online: '', form: ''}, action) => {
  switch (action.type) {
    case 'status':
      return Object.assign({}, state, { status: action.status, loading: false })      
      // return {...state, status: action.status }
    case 'disconnect':
      return {...state, status: action.status, messages: [], name: null }
    case 'message':
      return {...state, messages: state.messages.concat([{ ...action.message }]) }
    case 'online':
      return {...state, online: action.online.concat() }
    case 'name':
      return {...state, name: action.name.concat() }
    case 'form':
      return {...state, form: action.form }
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
  // console.log('messages here', reduxStore.getState().messages.constructor)
  render()
})

// call render for the first time
render()
