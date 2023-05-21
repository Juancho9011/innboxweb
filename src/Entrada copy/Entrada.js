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
import { Table } from "react-bootstrap";
import TableService from "../TableService/TableService";
import TableAceptado from "../TableAceptado/TableAceptado";

import BasicExample from "../Navbar/Navbar";
import TableHistorial from "../TableHistorial/TableHistorial";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      data: null
    };
  }

  handleDataReceived = (data) => {

    this.setState({ data });// Realizar acciones con los datos recibidos
  };

  render() {
    const { data } = this.state;
    return (
      <>
       

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

export default Entrada;

