import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableService.css";
import { BEARER } from "../constants";
import { URL } from "../constants";
import Loading from "./../Loading/Loading";
import NoData from "../NoData/NoData";


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

  handleAceptarServicio = async () => {
    try {
      const { rowData, dataUser } = this.props;

      console.log(dataUser);
      console.log(rowData);

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `${BEARER} ${localStorage.getItem("idToken")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        intServiceID: rowData.code,
        strUserCode: dataUser.code,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${URL}/AcceptService`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log();
          alert(result.description)
          this.setState({ showModal: false});
          window.location.reload();
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
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
        
          <p>&#128064;</p>
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>
                <b>Detalles del Servicio</b>
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Tipo de servicio:</b> {rowData.role}
            </p>
            <p>
              <b>Acción a realizar:</b> {rowData.serviceType}
            </p>
            <p>
              <b>Fecha:</b> {rowData.startDate.split("T")[0]}
            </p>
            <p>
              <b>Hora de entrada:</b> {rowData.startDate.split("T")[1]}
            </p>
            <p>
              <b>Dirección:</b> {rowData.address}
            </p>
            <p>
              <b>Monto a pagar: </b>
              {rowData.value.toLocaleString("es-CO", {
                style: "decimal",
                currency: "COP",
              })}{" "}
              COP
            </p>
            <p>
              <b>Horas contratadas:</b>{" "}
              {Math.ceil(
                (new Date(rowData.endDate) - new Date(rowData.startDate)) /
                  3600000
              )}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Rechazar Servicio
            </Button>
            <Button
              variant="primary"
              onClick={this.handleAceptarServicio}
              style={{ backgroundColor: "#EC407A" }}
            >
              Aceptar Servicio
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class TableService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datosUser: props.datosUser,
      loading: true,
      datafetchGetUserByUserName: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchDataGetServicesByRole();
    }, 2000);
  }

  fetchDataGetServicesByRole = async () => {

    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `${BEARER} ${localStorage.getItem("idToken")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        strRole: this.props.datosUser.roleCode,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${URL}/GetServicesByRole`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            datafetchGetServicesByRole: result.values,
            loading: false,
          });
         // console.log(result);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  render() {
    const { datafetchGetServicesByRole, loading } = this.state;

    return (
      <>
        {
          <div>
            {loading ? (
              <Loading />
            ) : datafetchGetServicesByRole.length > 0 ? (
              <div className="table-component">
                <table className="data-table">
                  <thead>
                    <tr className="row-header">
                      <th>Tipo de servicio</th>
                      <th>Fecha</th>
                      <th>Dirección</th>
                      <th>Ver detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datafetchGetServicesByRole.map((item, index) => (
                      <tr key={item.code}>
                        <td>{item.role}</td>
                        <td>{item.startDate.split("T")[0]}</td>
                        <td>{item.address}</td>
                        <td style={{ textAlign: "center" }}>
                          <ModalComponent rowData={item} dataUser={this.props.datosUser} />
                        </td>
                      </tr>
                    ))}

                    {/* Agrega más filas según sea necesario */}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData />
            )}
          </div>
        }
      </>
    );
  }
}

export default TableService;
