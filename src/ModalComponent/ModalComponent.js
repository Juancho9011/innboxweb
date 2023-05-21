import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaHome, FaUser, FaCog, FaEnvelope, FaChartBar, FaBinoculars, FaCalendarCheck , FaUserClock, FaRegEye} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalComponent extends Component {

  constructor(props) {
    super(props);

    console.log("ññññ" , props);

    this.state = {
      showModal: false,
      message: "",
    };
  
  }

  handleOpenModal = (message) => {
    //this.setState({ showModal: true });
    this.setState({ showModal: true, message: message });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { message } = this.props;
    console.log("informaciossssn ", message);
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
        <Button
          className="abrir"
          style={{
           
            fontSize: "20px",
            fontFamily: "monospace",
            fontWeight: "bold",
            background:"transparent"
          }}
          onClick={() => this.handleOpenModal(this.props.message)}
        >
          <FaRegEye/>
          
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Título del Modal {this.props.message}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Contenido del modal...</p>
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

export default ModalComponent;
