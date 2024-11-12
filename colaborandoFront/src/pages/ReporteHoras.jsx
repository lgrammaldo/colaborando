import React, { useEffect, useState }  from 'react';
import './Home.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import reporteHorasService from '../services/ReporteHorasService.js';
import './ReporteHoras.css';

function Home() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [reporteHoras, setReporteHoras] = useState([]);
    const [userId] = useState(localStorage.getItem("userId"));


    useEffect(() => {
        const colaborador = 2
        {rol === 'Colaborador' ? reporteHorasService.getHorasColaborador(userId) 
            .then(res => {
                setReporteHoras(res.data);
              })
              .catch(err => {
                console.error("Error cargando próximos eventos:", err);
              })
            : 
            reporteHorasService.getHorasEmpresa() // Asegúrate de que esta función esté definida en tu servicio
             .then(res => {
                setReporteHoras(res.data);
              })
              .catch(err => {
                console.error("Error cargando próximos eventos:", err);
              });
        }

    }, []);   

    // Función para actualizar el evento
    return (
        <div>
            <div className="container text-center">
                <div className="row align-items-center box3">
                    <div className="col-md-12">
                        <div className="table-container">
                            {/* Encabezados de columna */}
                            <div className="table-header">
                                <span>Colaborador</span>
                                <span>Mes del Evento</span>
                                <span>Año del Evento</span>
                                <span>Eventos Asistidos</span>
                                <span>Horas Trabajadas</span>
                            </div>
                            {/* Datos de cada colaborador */}
                            {reporteHoras.map((colaborador, index) => (
                                <div className="table-row" key={index}>
                                    <span>{colaborador.colaborador}</span>
                                    <span>{colaborador.mesEvento}</span>
                                    <span>{colaborador.anoEvento}</span>
                                    <span>{colaborador.eventosAsistidos}</span>
                                    <span>{colaborador.horasTrabajadas}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
