import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const rootNode = document.getElementById('react-container')

ReactDOM.render(<App socket={io(window.location.host)} />, rootNode)
