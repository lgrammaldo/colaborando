// Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo.jsx';
import Header from './Header.jsx';
import './HomeColabor.css';

function Home() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));

    const addTurno = () => {
        navigate('/crear-evento');
    };

    return (
        <div>
            <Header />
            <NavBarWithLogo />
            {
                
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col-12">
                                <h2 className="text-dark">Dashboard</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <i className="fas fa-calendar-alt"></i> Próximos Eventos
                                        </h5>
                                        <p className="card-text">Aquí puedes ver los próximos eventos programados.</p>
                                        <button className="btn" onClick={addTurno}>
                                            Crear Turno
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <i className="fas fa-history"></i> Historial de Eventos
                                        </h5>
                                        <p className="card-text">Accede a todos los eventos pasados aquí.</p>
                                        <button className="btn">
                                            Ver Historial
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <i className="fas fa-clock"></i> Reporte de Horas
                                        </h5>
                                        <p className="card-text">Consulta el reporte de horas trabajadas.</p>
                                        <button className="btn">
                                            Ver Reporte
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            }
        </div>
    );
}

export default Home;
