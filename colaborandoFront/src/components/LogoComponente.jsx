// LogoComponente.jsx
import React from 'react';
import logo from '../imagenes/logoColab.png'; // Asegúrate de que la ruta es correcta

const LogoComponente = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <img 
        src={logo} 
        alt="Descripción del logo" 
        style={{ width: '150px', height: 'auto', borderRadius: '8px' }} 
      />
    </div>
  );
};

export default LogoComponente;
