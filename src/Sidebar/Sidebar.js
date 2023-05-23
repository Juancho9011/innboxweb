import React, { useState } from "react";
import "./Sidebar.css";
import { FaHome, FaUser, FaCog, FaEnvelope, FaChartBar, FaBinoculars, FaCalendarCheck , FaUserClock, FaRegEye} from "react-icons/fa";

const Sidebar = (props) => {


  const [selectedItem, setSelectedItem] = useState(null);
 

  const handleItemClick = (index) => {
    setSelectedItem(index);
    
    if(index === 1 || index === 2){
    
      document.getElementById("disponibles").setAttribute("class","")
     
    }else if(index === 0){
      document.getElementById("disponibles").setAttribute("class","selected")
    }

    props.onData(index === 0 ? "disponibles" : index === 1 ? "aceptados" : "historial")
  };
 
  return (
    <>
     <div className="sidebar">
      <ul className="menu">
        <li id="disponibles"
          className="selected" 
          onClick={() => handleItemClick(0)}
        >
          <span className="menu-icon">
          🔍
          </span>
          <span className="menu-text">Servicios disponibles</span>
        </li>
        <li
          className={selectedItem === 1 ? "selected" : ""}
          onClick={() => handleItemClick(1)}
        >
          <span className="menu-icon">
          ✅
          </span>
          <span className="menu-text">Servicios aceptados</span>
        </li>
      
       
      </ul>
    </div></>
   
  );

  /**
   *   <li
          className={selectedItem === 2 ? "selected" : ""}
          onClick={() => handleItemClick(2)}
        >
          <span className="menu-icon">
            <FaUserClock />
          </span>
          <span className="menu-text">Historial</span>
        </li>
   */

 

};

export default Sidebar;
