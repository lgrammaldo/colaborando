import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService';
import './BuscarEventos.css';

const BuscarEventos = () => {
    const [userId] = useState(localStorage.getItem("userId"));
    const [rol] = useState(localStorage.getItem("rol"));
    const [notificaciones, setNotificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [currentNotificacion, setCurrentNotificacion] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (userId) {
            eventoService.getAllEventos(userId).then(res => {setNotificaciones(res.data)});
        }
    }, [userId]);

    const handleSolicitarEmpleo = (notificacion) => {
        
    };

    const handleRechazarEmpleo = (notificacion) => {
       
    };

    const handleEntendidoEventoCancelado = (notificacion) => {
        
    };

    const formatDateTime = (fecha) => {
        const date = new Date(fecha);
        const optionsDate = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
        const formattedDate = date.toLocaleDateString('es-ES', optionsDate);
        const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);

        return `${formattedDate} ${formattedTime}`;
    };

    const handleConfirmarColaborador = (notificacion) => { //en ese caso la "notificacion" en realidad es la "solicitud", se usa la misma var para reciclar
        
     };
     const handleRechazarColaborador = (notificacion) => { //en ese caso la "notificacion" en realidad es la "solicitud", se usa la misma var para reciclar
       
     };

    return (
        <div>
            {rol === 'Colaborador' ? (
                <div className="notificaciones-container">
                    <h2>Eventos Disponibles</h2>
                    <div className="notificaciones-list">
                        {notificaciones  && notificaciones.length > 0 ? 
                            notificaciones.map((notificacion, index) => (
                                <div key={index} className="notificacion-card">
                                    {notificacion.tipoNotificacion === 7 ? (
                                        <>
                                            <h3 className="titulo-evento">{notificacion.nombre}</h3>
                                            <p className="mensaje-cancelacion">
                                                Lo sentimos, el evento <strong>{notificacion.nombre}</strong> ha sido <strong>CANCELADO</strong>. 
                                                Te hemos liberado la agenda para que puedas solicitar puestos para otros eventos.
                                            </p>
                                            <button className="btn entendido" onClick={() => handleEntendidoEventoCancelado(notificacion)}>Entendido</button>
                                        </>
                                    ) : (
                                        notificacion.tipoNotificacion === 3 ? (
                                            <>
                                                <h3 className="titulo-evento">{notificacion.nombre}</h3>
                                                <p className="mensaje-cancelacion">
                                                    ¡¡Felicitaciones!! !!Has sido seleccionado para el evento ¡¡<strong>{notificacion.nombre}</strong> como <strong>{notificacion.empleo}</strong>. 
                                                    Verás mas especificaciones en tus Próximos Eventos.
                                                </p>
                                                <button className="btn entendido" onClick={() => handleEntendidoEventoCancelado(notificacion)}>Entendido</button>
                                            </>
                                        ) : 
                                            <>
                                                <h3 className="titulo-evento">{notificacion.nombre}</h3>
                                                <p className="descripcion">
                                                    El evento <strong>{notificacion.nombre}</strong> busca el perfil "<strong>{notificacion.empleo}</strong>".
                                                    Puedes enviar la solicitud a continuación. 
                                                </p>
                                                <p className="fecha-evento"><strong>Fecha: {formatDateTime(notificacion.fecha_inicio)} </strong></p>
                                            
                                                <div className="botones-accion">
                                                    <button className="btn aceptar" onClick={() => handleSolicitarEmpleo(notificacion)}>Enviar Solicitud</button>
                                                    
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            ))
                            : 
                            <h3 className="no-events-message">
                                Por el momento no tienes notificaciones, espera a que hayan nuevos Eventos.
                            </h3>
                        }
                    </div>
                </div>
            ) : (
                <div className="notificaciones-container">
                <h2>Notificaciones de Establecimiento</h2>
                <div className="notificaciones-list">
                    { notificaciones  && notificaciones.length > 0 ? (
                        notificaciones.map((notificacion, index) => (
                            <div key={index} className="notificacion-card">
                                <h3 className="titulo-evento">{notificacion.detalleEvento.evento.nombre}</h3>
                                <p className="descripcion">
                                    <strong>Colaborador:</strong> {notificacion.colaboradoresEmpleos.colaborador.nombre} {notificacion.colaboradoresEmpleos.colaborador.apellido}<br />
                                    <strong>Empleo Aspirado:</strong> {notificacion.colaboradoresEmpleos.empleos.nombre}<br />
                                    <strong>Evento:</strong> {notificacion.detalleEvento.evento.nombre}<br />
                                    <strong>Cupos disponibles:</strong> {notificacion.detalleEvento.cantidadDisponible}
                                </p>
                                <p className="fecha-evento"><strong>Fecha: {formatDateTime(notificacion.fechaEvento)} </strong></p>
                                <div className="botones-accion">
                                    <button className="btn confirmar" onClick={() => handleConfirmarColaborador(notificacion)}>Confirmar</button>
                                    <button className="btn rechazar" onClick={() => handleRechazarColaborador(notificacion)}>Rechazar</button>
                                </div>
                            </div>
                        )))
                        : 
                        <h3 className="no-events-message">
                            Por el momento no tienes solicitudes, espera a que hayan nuevos postulanes.
                        </h3>
                    }
                </div>
            </div>
            )}
        </div>
    );
};

export default BuscarEventos;
