import React from 'react';
import { useSpring, animated } from 'react-spring';
import './NoData.css'; // Archivo CSS para estilos personalizados

const NoData = () => {
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div className="no-data-container" style={animationProps}>
      <div className="no-data-content">
        <span className="no-data-text">No hay datos para mostrar.</span>
      </div>
    </animated.div>
  );
};

export default NoData;
