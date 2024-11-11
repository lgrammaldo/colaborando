import React, { useEffect, useState }  from 'react';
import './Home.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService';

function Home() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    

    const addTurno = () => {
        navigate('/editar-perfil');
    };

    const addEvento = () => {
      navigate('/crear-evento');
    };    

    const proxEventos = () => {
      navigate('/proxEventos');
    };        

    const eventosPasados = () => {
        navigate('/eventos-inactive');
    };      

    const reporteHoras = () => {
        navigate('/reporte-horas');
    };        



    return (
        <div>
           
            <div className="container text-center">
                <div className="row align-items-center box3">
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-calendar-alt"></i> <br></br>
                                    {rol === 'Colaborador' ? 'Perfil' : 'Evento'}
                                </h5>                                  
                                <p className="card-text">
                                {rol === 'Colaborador' ? 'Edita tu perfil' : 'Aqui podras crear tus Eventos'}
                                </p>
                                <button className="btn" onClick={rol === 'Colaborador' ? addTurno : addEvento}>
                                    {rol === 'Colaborador' ? 'Editar Perfil' : 'Crear Evento'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-history"></i> <br></br>Proximos Eventos
                                </h5>
                                <p className="card-text">Podrás ver los eventos confirmados que tienes proximamente.</p>
                                <button className="btn" onClick={proxEventos}>
                                  {rol === 'Colaborador' ? 'Ver Eventos Confirmados' : 'Ver Eventos Creados'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-history"></i> <br></br>Eventos Pasados
                                </h5>
                                <p className="card-text">Podrás ver los eventos pasados.</p>
                                <button className="btn" onClick={eventosPasados}>
                                  {rol === 'Colaborador' ? 'Ver Eventos Trabajados' : 'Ver Eventos Realizados'}
                                </button>
                            </div>
                        </div>
                    </div>                    
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-clock"></i> <br></br>Reportes Históricos
                                </h5>
                                <p className="card-text">
                                  {rol === 'Colaborador' ? 'Detalle de horas trabajadas.' : 'Detalle de horas a liquidar.'}
                                </p>
                                <button className="btn" onClick={reporteHoras}>Ver Reporte</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
