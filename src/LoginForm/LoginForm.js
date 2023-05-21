import React, { useState } from "react";
import "./LoginForm.css"; // Importa el archivo de estilos
import { FaUser, FaLock, FaMicrosoft } from "react-icons/fa";
import firebase from "./../firebase/firebase";
import EntradaLocal from "../EntradaLocal/EntradaLocal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { PageLayout } from "../components/PageLayout";
import {MainContent} from '../../src/App'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { instance } = useMsal();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar la lógica de autenticación o enviar los datos a un servidor aquí
    const isValidCredentials = true; /* Validar las credenciales aquí */

    if (isValidCredentials) {
      setLoggedIn(true);
     
    }
  };

  const handleLogin = (logoutType) => {
     if (logoutType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (logoutType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  if (isLoggedIn) { 

    return <EntradaLocal />;
  }

  return (
    <div className="body-login">
      <div style={{ width: "370px" }} className="container-login login-form">
        <div className="login-form__logo"></div>
        <h1
          className="login-form__title"
          style={{
            color: "rgb(236, 64, 122)",
            fontSize: "20px",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          Bienvenido
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            style={{
              color: "rgb(236, 64, 122)",
              fontSize: "20px",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            Iniciar Sesión
          </button>

          <br />

          <span>O</span>
          <br />
         
        </form>
        <button
        
        style={{
          color: "rgb(236, 64, 122)",
          fontSize: "20px",
          fontFamily: "monospace",
          fontWeight: "bold",
          width: "100%"
        }}
        onClick={() => handleLogin("popup")}
      >
        <FaMicrosoft />
      </button>
      </div>
    </div>
  );
};

export default LoginForm;