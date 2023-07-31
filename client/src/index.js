import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Store from '../src/Redux/Store'
import { Provider } from 'react-redux'
import "./assets/scss/main.scss"
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from 'react-notifications-component'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactNotifications />
      <Provider store={Store} >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

