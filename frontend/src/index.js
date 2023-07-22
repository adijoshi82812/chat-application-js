import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bulma/css/bulma.min.css'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
