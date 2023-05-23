/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React, { useState } from "react";

import { PageLayout } from "./components/PageLayout";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
import { ProfileData } from "./components/ProfileData";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import "./App.css";

import Button from "react-bootstrap/Button";
import Entrada from "./Entrada/Entrada";
import LoginForm from "./LoginForm/LoginForm";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      {
        //<h5 className="card-title">Welcome {accounts[0].name}</h5>
      }
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <>
          {/*<Button variant="secondary" onClick={RequestProfileData}>
            Request Profile Information
      </Button>*/}
          {accounts[0] ? (
            <Entrada
              datosUser={{
                name: accounts[0].name,
                username: accounts[0].username,
                tenantId: accounts[0].tenantId,
                homeAccountId: accounts[0].homeAccountId,
                idToken: accounts[0].idToken,
                localAccountId: accounts[0].localAccountId,
                nativeAccountId: accounts[0].nativeAccountId,
                idTokenClaims: accounts[0].idTokenClaims,
              }}
            />
          ) : (
            <p>404</p>
          )}
        </>
      )}
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
export const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginForm />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      {accounts[0] ? (
        <PageLayout
          datosUser={{
            name: accounts[0].name,
            username: accounts[0].username,
            tenantId: accounts[0].tenantId,
            homeAccountId: accounts[0].homeAccountId,
            idToken: accounts[0].idToken,
            localAccountId: accounts[0].localAccountId,
            nativeAccountId: accounts[0].nativeAccountId,
            idTokenClaims: accounts[0].idTokenClaims,
          }}
        >
          <center>
            <MainContent />
          </center>
        </PageLayout >
      ) : (
        <PageLayout  datosUser={{
          name: "",
          username: "",
          tenantId: "",
          homeAccountId: "",
          idToken: "",
          localAccountId: "",
          nativeAccountId: "",
          idTokenClaims: "",
        }}>
          <center>
            <MainContent />
          </center>
        </PageLayout>
      )}
    </>
  );
}
