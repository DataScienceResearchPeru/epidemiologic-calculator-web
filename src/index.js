import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { RequestProvider } from 'react-request-hook'
import * as serviceWorker from './serviceWorker'
import axiosInstance from './middleware/api'

ReactDOM.render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
      <App />
    </RequestProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
