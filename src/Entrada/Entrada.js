/*import React, { Component } from "react";
import "./Entrada.css";
import Sidebar from "../Sidebar/Sidebar";
import { Table } from "react-bootstrap";
import TableService from "./../TableService/TableService";
import TableAceptado from "./../TableAceptado/TableAceptado";

import BasicExample from "../Navbar/Navbar";
import TableHistorial from "../TableHistorial/TableHistorial";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 *  tablaMostrar == "disponibles" ?   
             <TableService /> :
             tablaMostrar == "aceptados" ?
             <TableAceptado /> : <></>
 * /
class Entrada extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  handleDataReceived = (data) => {
  
    console.log("llega el dato ", data); 
    this.setState({ data });// Realizar acciones con los datos recibidos
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="container-navbar">
          <BasicExample />
        </div>

        <div className="container-entrada">
          <div className="container-Sidebar">
            <Sidebar onData={this.handleDataReceived} />
          </div>
          <div className="container-TableService">
          { 
              data === "disponibles" ?   
               <TableService /> :
               data === "aceptados" ?
               <TableAceptado /> : <TableHistorial/>
           
            } 
          </div>
        </div>
      </>
    );
  }
}

export default Entrada;*/

import React, { Component } from "react";
import "./Entrada.css";
import Sidebar from "../Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BEARER, Bearer, URL, url } from "../constants";
import TableService from "../TableService/TableService";
import TableHistorial from "../TableHistorial/TableHistorial";
import TableAceptado from "../TableAceptado/TableAceptado";

/**
 *  tablaMostrar == "disponibles" ?   
             <TableService /> :
             tablaMostrar == "aceptados" ?
             <TableAceptado /> : <></>
 */
class Entrada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      datafetchGetUserByUserName: null,
      datafetchGetAllRoles: null,
    };
  }

  handleDataReceived = (data) => {
    this.setState({ data }); // Realizar acciones con los datos recibidos
  };

  componentDidMount() {
    this.fetchDataGetUserByUserName();
  }

  fetchDataGetUserByUserName = async () => {
    try {
      if (this.props.datosUser.idToken) {
        localStorage.setItem("idToken", this.props.datosUser.idToken);
        localStorage.setItem("username", this.props.datosUser.username);
      } else {
        // alert("vacio")
      }

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `${BEARER} ${localStorage.getItem("idToken")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        strUserName: localStorage.getItem("username"),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${URL}/GetUserByUserName`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            datafetchGetUserByUserName: result.values,
            loading: true,
          });
          this.fetchDataGetAllRoles();
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  fetchDataGetAllRoles = async () => {
    try {
      if (this.props.datosUser.idToken) {
        localStorage.setItem("idToken", this.props.datosUser.idToken);
        localStorage.setItem("username", this.props.datosUser.username);
      } else {
        // alert("vacio")
      }

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `${BEARER} ${localStorage.getItem("idToken")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,

        redirect: "follow",
      };

      fetch(`${URL}/GetAllRoles`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const { datafetchGetUserByUserName, loading, datafetchGetAllRoles } =
            this.state;

          const filteredData = result.values.filter((item) => {
            return item.roleCode == datafetchGetUserByUserName.roleCode;
          });

          this.setState({
            datafetchGetAllRoles: filteredData[0].role,
            loading: false,
          });

       
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  render() {
    const { datafetchGetUserByUserName, loading, datafetchGetAllRoles } =
      this.state;

    const { data } = this.state;

  

    return (
      <>
        <div className="container-entrada">
          <div className="container-Sidebar">
            <Sidebar onData={this.handleDataReceived} />
          </div>
          <div className="container-TableService">
            {data === "disponibles" ? (
              <TableService datosUser={datafetchGetUserByUserName} />
            ) : data === "aceptados" ? (
              <TableAceptado datosUser={datafetchGetUserByUserName} />
            ) : (
              <TableService datosUser={datafetchGetUserByUserName} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Entrada;
