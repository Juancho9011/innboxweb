import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Loading.css'; // Archivo CSS para estilos personalizados

const Loading = () => {
  return (
    <div className="loading-container">
      <FaSpinner className="loading-icon" />
      <span className="loading-text">Cargando datos...</span>
    </div>
  );
};

export default Loading;
