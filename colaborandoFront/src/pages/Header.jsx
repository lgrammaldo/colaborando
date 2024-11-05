// Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../imagenes/logoColab.png';

const Header = () => {
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        alert('Usted ha terminado la sesión');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/editar-perfil'); // Redirige a la página de perfil
    };

  
    const handleEditRol = () => {
    navigate('/edita-roles', { state: { fromEditRoles: true } });
    };
        const handleNotification = () => {
        navigate('/notificaciones', { state: { fromEditRoles: true } });
    };
    const handleNavigateHome = () => {
        navigate("/home"); // Navega a la página de inicio
    };

    
  
    useEffect(() => {
        setRol(localStorage.getItem("rol"));
    }, []);

    return (
        <>
            <header className="flex-container">
                <div className="box1">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <img src={logo} alt="Logo Colaborando" />
                    </nav>
                </div>

                <div className="box3">
                <FontAwesomeIcon 
                    icon={faHome} 
                    style={{ height: "30px", width: "30px", cursor: "pointer" }} 
                    onClick={handleNavigateHome} // Llama a la función de navegación al hacer clic
                />
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-avatar">
                            <FontAwesomeIcon icon={faUser} style={{ height: "30px", width: "30px" }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={handleProfile}>Mi Perfil</Dropdown.Item>
                            <Dropdown.Item onClick={handleEditRol}>Modificar Roles</Dropdown.Item>
                             <Dropdown.Item onClick={handleNotification}>Notificaciones</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                   
                </div>
            </header>

            <div id="navegador">
                <Nav className="ml-auto" variant="tabs">
                    <Nav.Item>
                        {/* Aquí puedes agregar otros elementos de navegación si es necesario */}
                    </Nav.Item>
                </Nav>
            </div>
        </>
    );
};

export default Header;
