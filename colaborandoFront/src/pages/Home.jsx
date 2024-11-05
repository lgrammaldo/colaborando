import React, { useEffect, useState }  from 'react';
import './Home.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService';

function Home() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [proximosEventos, setProximosEventos] = useState([]);

    const addTurno = () => {
        navigate('/crear-evento');
    };

    useEffect(() => {
      eventoService.getProximosEventos() // Asegúrate de que esta función esté definida en tu servicio
        .then(res => {
          setProximosEventos(res.data);
        })
        .catch(err => {
          console.error("Error cargando próximos eventos:", err);
        });
    }, []);    

    return (
        <div>
           
            <div className="container text-center">
                <div className="row align-items-center box3">
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-calendar-alt"></i> <br></br>Agenda Eventos
                                </h5>
                                <ul className="list-group">
                                {proximosEventos.map((evento, index) => (
                                  <li className="list-group-item" key={index}>
                                    <strong>{evento.nombre}</strong> - {new Date(evento.fecha).toLocaleString()}
                                  </li>
                                ))}
                                </ul>                                     
                                <p className="card-text">Accede a tu grilla de eventos confirmados</p>
                                <button className="btn" onClick={addTurno}>
                                    {rol === 'Colaborador' ? 'Ver Grilla' : 'Crear Evento'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-history"></i> <br></br>Horas Trabajadas 
                                </h5>
                                <p className="card-text">Podrás ver el acumulado de horas trabajadas en el mes.</p>
                                <button className="btn">Ver Total horas</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title icon-user">
                                    <i className="fas fa-clock"></i> <br></br>Reportes Históricos
                                </h5>
                                <p className="card-text">Consulta el reporte de horas y Eventos.</p>
                                <button className="btn">Ver Reporte</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
