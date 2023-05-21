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
      {//<h5 className="card-title">Welcome {accounts[0].name}</h5>
      }
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Entrada/>
        /*<Button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information
        </Button>*/
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
        <PageLayout graphData={accounts[0].name || ""}>
          <center>
            <MainContent />
          </center>
        </PageLayout>
      ) : (
        <PageLayout>
          <center>
            <MainContent />
          </center>
        </PageLayout>
      )}
    </>
  );
}
