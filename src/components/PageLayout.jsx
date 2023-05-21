/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import Entrada from "../Entrada/Entrada";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { loginRequest } from "../authConfig";

import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import { useMsal } from "@azure/msal-react";

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  //function ColorSchemesExample() {
  const colorletra = {
    color: "#EC407A",
    "font-size": "20px",
    "font-family": "monospace",
    "font-weight": "bold",
  };

  const cerrarsesion = {
    position: "absolute",
    right: "2px",
    top: "7px",
  };

  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous"
      />

      <Navbar bg="dark" variant="dark" id="navMicrosof">
        <Container>
          <Navbar.Brand style={colorletra}>Innbox</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated && (
              <Nav className="ml-auto">
                <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
                  <NavDropdown.Item>{props.graphData}</NavDropdown.Item>
                  <NavDropdown.Item>Rol</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>

          <Nav className="me-auto">
            {isAuthenticated ? (
              <Nav.Link
                href="#pricing"
                style={cerrarsesion}
                onClick={() => handleLogout("popup")}
              >
                <FaSignOutAlt /> Cerrar Sesión
              </Nav.Link>
            ) : (
              <Nav.Link
                href="#pricing"
                style={cerrarsesion}
                onClick={() => handleLogin("popup")}
              >
                <FaSignInAlt /> Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      {props.children}
    </>
  );

  /*return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Microsoft Identity Platform
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
     
      
      {props.children}
    </>
  );*/
};
