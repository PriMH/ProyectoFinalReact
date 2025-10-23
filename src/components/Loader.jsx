import React from 'react';
import '../styles/Loader.css';

const Loader = ({ message = 'Cargando...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;
