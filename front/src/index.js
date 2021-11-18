import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStates from "./GlobalStates";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <GlobalStates>
    <ToastContainer rtl={true} />
    <App />
  </GlobalStates>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
