// Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faBell } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import logo from '../imagenes/logoColab.png';
import notificacionService from '../services/NotificacionesService';

const Header = () => {
    const [rol] = useState(localStorage.getItem("rol"));
    const [userId] = useState(localStorage.getItem("userId"));
    const [hasNotificaciones, setHasNotificaciones] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        notificacionService.hasNotificaciones(userId)
            .then(res => setHasNotificaciones(res.data)) // Aquí debes asegurarte que `res` sea booleano.
            .catch(error => console.error(error));
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        alert('Usted ha terminado la sesión');
        navigate('/login');
    };

    const handleNotification = () => {
        // Cambia el estado para que desaparezca el punto rojo al abrir notificaciones
        setHasNotificaciones(false);
        navigate('/notificaciones', { state: { fromEditRoles: true } });
    };

    return (
        <>
            <header className="flex-container">
                <div className="box1">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                            <img src={logo} alt="Logo Colaborando" />
                        </div>
                    </nav>
                </div>

                <div className="box3">
                    <FontAwesomeIcon 
                        icon={faHome} 
                        style={{ height: "30px", width: "30px", cursor: "pointer" }} 
                        onClick={() => navigate('/home')} 
                    />
                    
                    {hasNotificaciones === true ? 
                        <div className="notification-icon">
                            <FontAwesomeIcon 
                                icon={faBell} 
                                style={{ height: "30px", width: "30px", cursor: "pointer" }} 
                                onClick={handleNotification} 
                            />
                            <span className="notification-dot"></span>
                        </div> 
                        :
                        <div className="notification-icon">
                            <FontAwesomeIcon 
                                icon={faBell} 
                                style={{ height: "30px", width: "30px", cursor: "pointer" }} 
                                onClick={handleNotification} 
                            />
                        </div> 
                    }
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-avatar">
                            <FontAwesomeIcon icon={faUser} style={{ height: "30px", width: "30px" }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            {rol === "Colaborador" && <Dropdown.Item onClick={() => navigate('/editar-perfil')}>Mi Perfil</Dropdown.Item>}
                            {rol === "Colaborador" && <Dropdown.Item onClick={() => navigate('/edita-roles')}>Modificar Roles</Dropdown.Item>}
                            <Dropdown.Item onClick={handleNotification}>Notificaciones</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
        </>
    );
};

export default Header;
