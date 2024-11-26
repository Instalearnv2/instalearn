import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import UserAuthContext from './context/UserAuthContext.jsx'
import PrivyWalletProvider from './context/PrivyProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContext>
      <PrivyWalletProvider>
       <App />
       </PrivyWalletProvider>
    </UserAuthContext>
  </React.StrictMode>
)
