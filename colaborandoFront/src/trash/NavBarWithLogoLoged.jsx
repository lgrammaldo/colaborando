import React from "react";
import logo from '../imagenes/logoColab.png';

export default function NavbarWithLogo() {
  return (
    <div style={{ height: '10vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#334fff', height: '12vh' }}>
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <img 
            src={logo} 
            alt="Logo Colaborando" 
            style={{ height: '60px', width: 'auto' }} // Ajustar la altura del logo
          />
        </div>
      </nav>
    </div>
  );
}
