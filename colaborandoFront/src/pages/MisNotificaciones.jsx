import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import notificacionService from '../services/NotificacionesService';
import './MisNotificaciones.css';

const MisNotificaciones = () => {
    const [userId] = useState(localStorage.getItem("userId"));
    const [notificaciones, setNotificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [currentNotificacion, setCurrentNotificacion] = useState(null);
    const navigate = useNavigate();

    const obtenerNotificaciones = () => {
        notificacionService.getNotificaciones(userId)
                    .then(res => setNotificaciones(res.data))
                    .catch(err => console.error("Error obteniendo notificaciones:", err));
    }

    useEffect(() => {
        if (userId) {
            obtenerNotificaciones();
           /* notificacionService.getNotificaciones(userId)
                .then(res => setNotificaciones(res.data))
                .catch(err => console.error("Error obteniendo notificaciones:", err));*/
        }
    }, [userId]);

    const handleAceptar = (notificacion) => {
        const confirmacion = window.confirm(`¿Deseas aceptar el puesto de ${notificacion.empleo} para el evento ${notificacion.nombreEvento}?`);
        if (confirmacion) {
            try {
                notificacionService.aceptarNotificacion(notificacion.notificacionId, notificacion.fechaEvento)  // Enviamos el notificacionId y fechaEvento
                    .then(() => {
                        alert("¡¡Felicitaciones!! ¡¡Has aceptado el empleo!");
                        navigate('/home');
                    })
                    .catch(error => {
                        alert(error.response?.data || "Ocurrió un error al aceptar el empleo.");
                    });
            } catch (error) {
                console.error("Error al aceptar la notificación", error);
            }
        }
    };

    const handleRechazar = (notificacion) => {
        const confirmacion = window.confirm(`¿Estás seguro de rechazar esta notificación?`);
        if (confirmacion) {
            try {
                notificacionService.rechazarNotificacion(notificacion.notificacionId)  // Enviamos solo notificacionId
                    .then(() => {
                        obtenerNotificaciones();  // Llamo a las activas de nuevo
                    })
                    .catch(err => console.error("Error al rechazar notificación:", err));
            } catch (error) {
                console.error("Error al rechazar la notificación", error);
            }
        }
    };

    const confirmAction = () => {
        // Lógica para enviar la aceptación o rechazo al backend
        // Ejemplo: notificacionService.confirmAction(currentNotificacion, actionType);

        // Oculta el modal después de confirmar
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const formatDateTime = (fecha) => {
        const date = new Date(fecha);
        const optionsDate = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }; // Formato: día mes año en UTC
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }; // Formato: hora:minuto en 24 horas en UTC
        const formattedDate = date.toLocaleDateString('es-ES', optionsDate); // Formato de fecha en español
        const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);
    
        return `${formattedDate} ${formattedTime}`; // Combina fecha y hora
    };

    return (
        <div className="notificaciones-container">
            <h2>Mis Notificaciones</h2>
            <div className="notificaciones-list">
                {notificaciones.map((notificacion, index) => (
                    <div key={index} className="notificacion-card">
                        <h3 className="titulo-evento">{notificacion.nombreEvento}</h3>
                        <p className="descripcion">
                            ¡¡Felicitaciones!! Has sido solicitado para el evento <strong>{notificacion.nombreEvento}</strong> para colaborar como <strong>{notificacion.empleo}</strong>.
                            Puedes aceptar o rechazar la oferta a continuación. Recuerda que puedes recibir para el mismo evento diferentes propuestas.
                        </p>
                        <p className="fecha-evento"><strong>Fecha: {formatDateTime(notificacion.fechaEvento)} </strong></p>
                    
                        <div className="botones-accion">
                            <button className="btn aceptar" onClick={() => handleAceptar(notificacion)}>Aceptar</button>
                            <button className="btn rechazar" onClick={() => handleRechazar(notificacion)}>Rechazar</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <div className="modal-buttons">
                            <button className="btn confirmar" onClick={confirmAction}>Confirmar</button>
                            <button className="btn cancelar" onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MisNotificaciones;
