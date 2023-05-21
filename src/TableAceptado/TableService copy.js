import React, { Component, useState } from "react";
import "./TableService.css";
import ModalComponent from "../ModalComponent/ModalComponent";
import 'bootstrap/dist/css/bootstrap.min.css';


class TableService extends Component {

  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
   
  }

  handleOpenModal = () => {
    this.modalRef.current.handleOpenModal();
  };

  render() {

   
    const data = [
      { remitente: "John Doe", asunto: "¡Hola!", fecha: "2023-05-19" },
      {
        remitente: "Jane Smith",
        asunto: "Reunión de mañana",
        fecha: "2023-05-18",
      },
      {
        remitente: "Jane Smith",
        asunto: "Reunión de mañana",
        fecha: "2023-05-18",
      },
      {
        remitente: "Jane Smith",
        asunto: "Reunión de mañana",
        fecha: "2023-05-18",
      },

      // Agregar más datos según sea necesario
    ];



    return (
      <div className="table-component">
        <table className="data-table">
          <thead>
            <tr className="row-header">
              <th>Tipo de servicio</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Ver detalles</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>{item.remitente}</td>
                <td>{item.fecha}</td>
                <td>{item.asunto}</td>
                <td style={{ "text-align": "center" }}>                
                  <ModalComponent ref={this.modalRef} />
                </td>
              </tr>
            ))}

            {/* Agrega más filas según sea necesario */}
          </tbody>
        </table>
       
      </div>
    );
  }
}

export default TableService;
