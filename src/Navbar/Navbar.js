import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import {FaDoorOpen,FaSignOutAlt ,FaEyeSlash, FaHome, FaUser, FaCog, FaEnvelope, FaChartBar, FaBinoculars, FaCalendarCheck , FaUserClock, FaRegEye} from "react-icons/fa";


function ColorSchemesExample() {
  const colorletra = {
    color: "#EC407A",
    fontSize: "20px",
    fontFamily: "monospace",
    fontWeight: "bold",
  };

  const cerrarsesion = {
    position: "absolute",
    right: "2px",
    top: "7px",
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous"
      />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={colorletra}>
            Innbox
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>*/}
            <Nav.Link  style={cerrarsesion}>
             <FaSignOutAlt/> Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default ColorSchemesExample;
