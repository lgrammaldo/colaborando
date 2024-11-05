import React from "react";
import logo from '../imagenes/logoColab.png';

export default function NavbarWithLogo() {
  return (
    <div style={{ height: '8vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <img 
          src={logo} 
          alt="Logo Colaborando" 
          style={{ height: '50px', width: 'auto' }} // Ajustar altura y mantener proporción
        />
      </nav>
    </div>
  );
}
