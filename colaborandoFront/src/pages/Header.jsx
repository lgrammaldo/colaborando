import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faUserDoctor, faDigitalTachograph, faBell } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imagenes/logoColab.png'

const Header = () => {
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        // Redirige al usuario a la página de inicio de sesión o a donde sea apropiado
        alert('Usted ha terminado la sesión');
        navigate('/login');
    };

    useEffect(() => {
        setRol(localStorage.getItem("rol"));
    }, []);

    return (
        <>
            <header className='flex-container' style={{ background: '#334fff' }}>
                <div className='box1' >
                    <nav className="navbar navbar-expand-lg navbar-dark" >
                    <img src={logo} alt="Logo Colaborando" />
                    </nav>
                </div>
              
                <div className='box3'>
                    <FontAwesomeIcon icon={faUser} style={{ height: "30px", width: "30px", margin: "10px", paddingTop:"10px"}} />
                    <select id="select-usuario" value={rol} style={{ height: "50px", width: "160px", margin:"10px"}}>
                        <option>{rol}</option>
                    </select>
                </div>
                <div className='box4'>
                    <button type="button" className="btn btn-secondary" onClick={handleLogout} style={{ height: "50px", width: "100px", margin:"10px"}}>
                        Logout
                    </button>
                </div>
            </header>

            <div id="navegador">
                <Nav className="ml-auto" variant="tabs">
                    <Nav.Item>
                        <Link to="/turnos" className="nav-link">
                            EVENTOS <FontAwesomeIcon icon={faCalendar} />
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/paciente" className="nav-link">
                            BASE DE PERSONAL <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/paciente" className="nav-link">
                            AGENDA <FontAwesomeIcon icon={faCalendar} />
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/paciente" className="nav-link">
                            BÚSQUEDA EXTERNA <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/paciente" className="nav-link">
                            REPORTES <FontAwesomeIcon icon={faDigitalTachograph} />
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/paciente" className="nav-link">
                            NOTIFICACIONES <FontAwesomeIcon icon={faBell} />
                        </Link>
                    </Nav.Item>
                {rol === 'ODONTOLOGO' && (
                    <>
                        <Nav.Item>
                            <Link to="/odontologo" className="nav-link">
                                Odontologos <FontAwesomeIcon icon={faUserDoctor} />
                            </Link>
                        </Nav.Item>
                    </>
                )}
                </Nav>
            </div>
        </>
    );
};

export default Header;
