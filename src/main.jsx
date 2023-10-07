import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthContext} from './context/AuthContext'
import { ChatContext } from './context/ChatContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
    <ChatContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContext>
  </AuthContext>
)
