import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TableAceptado.css";

class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { rowData } = this.props;

    return (
      <div>
        <Button
          className="abrir"
          style={{
            fontSize: "20px",
            fontFamily: "monospace",
            fontWeight: "bold",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={this.handleOpenModal}
        >
          <FaRegEye />
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Título del Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Información capturada:</p>
            <p>Remitente: {rowData.remitente}</p>
            <p>Fecha: {rowData.fecha}</p>
            <p>Asunto: {rowData.asunto}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.handleCloseModal}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class TableAceptado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { remitente: "John Doe", asunto: "¡Hola!", fecha: "2023-05-19" },
        {
          remitente: "Jane Smith",
          asunto: "Reunión de mañana",
          fecha: "2023-05-18",
        },
        {
          remitente: "acetad",
          asunto: "Reunión de mañana",
          fecha: "2023-05-18",
        },
      ],
    };
  }

  render() {
    const { data } = this.state;

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
              <ModalComponent rowData={item} />
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

export default TableAceptado;
