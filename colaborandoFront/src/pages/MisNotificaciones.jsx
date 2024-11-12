import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import notificacionService from '../services/NotificacionesService';
import './MisNotificaciones.css';

const MisNotificaciones = () => {
    const [userId] = useState(localStorage.getItem("userId"));
    const [rol] = useState(localStorage.getItem("rol"));
    const [notificaciones, setNotificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [currentNotificacion, setCurrentNotificacion] = useState(null);
    const navigate = useNavigate();

    const obtenerNotificaciones = () => {
        notificacionService.getNotificaciones(userId, rol)
            .then(res => setNotificaciones(res.data))
            .catch(err => console.error("Error obteniendo notificaciones:", err));
    }

    useEffect(() => {
        if (userId) {
            obtenerNotificaciones();
        }
    }, [userId]);

    const handleSolicitarEmpleo = (notificacion) => {
        const confirmacion = window.confirm(`¿Deseas enviar solicitud para el puesto de ${notificacion.empleo} para el evento ${notificacion.nombreEvento}?`);
        if (confirmacion) {
            notificacionService.aceptarNotificacion(notificacion.notificacionId, notificacion.fechaEvento)
                .then(() => {
                    alert("¡Has enviado solicitud por el empleo! Espera a que confirme el establecimiento.");
                    navigate('/home');
                })
                .catch(error => {
                    alert(error.response?.data || "Ocurrió un error al aceptar el empleo.");
                });
        }
    };

    const handleRechazarEmpleo = (notificacion) => {
        const confirmacion = window.confirm(`¿Estás seguro de rechazar esta notificación?`);
        if (confirmacion) {
            notificacionService.rechazarNotificacion(notificacion.notificacionId)
                .then(() => {
                    obtenerNotificaciones();
                })
                .catch(err => console.error("Error al rechazar notificación:", err));
        }
    };

    const handleEntendidoEventoCancelado = (notificacion) => {
        notificacionService.rechazarNotificacion(notificacion.notificacionId)
            .then(() => {
                obtenerNotificaciones();
            })
            .catch(err => console.error("Error al rechazar notificación:", err));
    };

    const formatDateTime = (fecha) => {
        const date = new Date(fecha);
        const optionsDate = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
        const formattedDate = date.toLocaleDateString('es-ES', optionsDate);
        const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);

        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div>
            {rol === 'Colaborador' ? (
                <div className="notificaciones-container">
                    <h2>Mis Notificaciones</h2>
                    <div className="notificaciones-list">
                        {notificaciones.map((notificacion, index) => (
                            <div key={index} className="notificacion-card">
                                {notificacion.tipoNotificacion === 7 ? (
                                    <>
                                        <h3 className="titulo-evento">{notificacion.nombreEvento}</h3>
                                        <p className="mensaje-cancelacion">
                                            Lo sentimos, el evento <strong>{notificacion.nombreEvento}</strong> ha sido <strong>CANCELADO</strong>. 
                                            Te hemos liberado la agenda para que puedas solicitar puestos para otros eventos.
                                        </p>
                                        <button className="btn entendido" onClick={() => handleEntendidoEventoCancelado(notificacion)}>Entendido</button>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="titulo-evento">{notificacion.nombreEvento}</h3>
                                        <p className="descripcion">
                                            ¡¡Buenas noticias!! El evento <strong>{notificacion.nombreEvento}</strong> busca colaboradores "<strong>{notificacion.empleo}</strong>".
                                            Puedes enviar la solicitud a continuación. Recuerda que puedes recibir para el mismo evento diferentes propuestas.
                                        </p>
                                        <p className="fecha-evento"><strong>Fecha: {formatDateTime(notificacion.fechaEvento)} </strong></p>
                                    
                                        <div className="botones-accion">
                                            <button className="btn aceptar" onClick={() => handleSolicitarEmpleo(notificacion)}>Enviar Solicitud</button>
                                            <button className="btn rechazar" onClick={() => handleRechazarEmpleo(notificacion)}>Rechazar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
               null
            )}
        </div>
    );
};

export default MisNotificaciones;
