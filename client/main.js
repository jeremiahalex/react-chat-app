/* global io */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { createStore } from 'redux'
import { Map, List } from 'immutable'

const socket = io(window.location.host)
const initState = Map({loading: true, status: 'loading', name: null, messages: List(), online: '', form: ''})

// pass initial state to our reducer function as default
const chatReducer = (state = initState, action) => {
  action = Map(action)
  switch (action.get('type')) {
    case 'status':    
      return state.merge({status: action.get('status'), loading: false})
    case 'disconnect':
      return state.merge({status: action.get('status'), messages: [], name: null })
    case 'message':
      return state.merge({messages: state.get('messages').push({ ...action.get('message') }) })
    case 'online':
      return state.merge({online: action.get('online').concat() })
    case 'name':
      return state.merge({name: action.get('name').concat() })
    case 'form':
      return state.merge({form: action.get('form') })
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
  console.log('App State: ', reduxStore.getState().toJS())
  render()
})
// call render for the first time
render()
