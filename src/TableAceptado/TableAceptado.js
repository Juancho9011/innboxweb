import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableAceptado.css";
import { BEARER } from "../constants";
import { URL } from "../constants";
import Loading from "../Loading/Loading";
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
                <b>Detalles del Servicio Aceptado</b>
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Tipo de servicio:</b> {rowData.serviceType}
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
              Cerrar
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
      datosUser: props.datosUser,
      loading: true,
      datafetchGetUserByUserName: null,
      errorService: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchDataGetAllServices();
    }, 2000);
  }

  fetchDataGetAllServices = async () => {
    try {
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

      fetch(`${URL}/GetAllServices`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const filteredData = result.values.filter((item) => {
            return (
              item.user == this.props.datosUser.code &&
              item.status == "Asignado"
            );
          });
          this.setState({
            datafetchGetAllServices: filteredData,
            loading: false,
          });
          // console.log(result);
        })
        .catch((error) => {
          this.setState({
            datafetchGetServicesByRole: [],
            loading: false,
            errorService: true,
          });
          console.log("error", error);
        });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      this.setState({
        datafetchGetServicesByRole: [],
        loading: false,
        errorService: true,
      });
    }
  };

  render() {
    const { datafetchGetAllServices, loading, errorService } = this.state;

    return (
      <>
        {
          <div>
            {errorService ? (
              <NoData mensaje="Error en consumir el servicio" />
            ) : loading ? (
              <Loading />
            ) : datafetchGetAllServices.length > 0 ? (
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
                    {datafetchGetAllServices.map(
                      (item, index) =>
                        item.user === this.props.datosUser.code &&
                        item.status === "Asignado" && (
                          <tr key={item.code}>
                            <td>{item.serviceType}</td>
                            <td>{item.startDate.split("T")[0]}</td>
                            <td>{item.address}</td>
                            <td style={{ textAlign: "center" }}>
                              <ModalComponent
                                rowData={item}
                                dataUser={this.props.datosUser}
                              />
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData mensaje="No hay datos para mostrar." />
            )}
          </div>
        }
      </>
    );
  }
}

export default TableAceptado;
