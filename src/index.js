/*import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginForm from "./LoginForm/LoginForm";
import ModalComponent from "./ModalComponent/ModalComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <script
      src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
      crossorigin
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
      crossorigin
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin
    ></script>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />

    <LoginForm />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log("INDEX");

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
 root.render(
  <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App />
      </MsalProvider>
  </React.StrictMode>
);
