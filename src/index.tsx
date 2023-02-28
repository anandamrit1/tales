import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { RecoilRoot } from 'recoil'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'styles/globals.css';
import 'degen/styles'
import 'flow/config'
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
        <ToastContainer />
        <App />
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
