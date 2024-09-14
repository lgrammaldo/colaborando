import React from "react";
import logo from '../imagenes/logoColab.png'

export default function NavbarWithLogo() {
  return (
    <div style={{ height: '10vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#334fff', height: '12vh' }}>
      <img src={logo} alt="Logo Colaborando" />
      </nav>
    </div>
  );
}
