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
        
        notificacionService.rechazarNotificacion(rol === 'Colaborador' ? notificacion.notificacionId : notificacion, rol)
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

    const handleConfirmarColaborador = (notificacion) => { //en ese caso la "notificacion" en realidad es la "solicitud", se usa la misma var para reciclar
        console.log(JSON.stringify(notificacion))
         const confirmacion = window.confirm(`¿Deseas confirmar a ${notificacion.colaboradoresEmpleos.colaborador.nombre} ${notificacion.colaboradoresEmpleos.colaborador.apellido} para el puesto de ${notificacion.detalleEvento.empleos.nombre} para el evento ${notificacion.detalleEvento.evento.nombre}?`);
         if (confirmacion) {
             try {
                 const colaboradoresEmpleos = notificacion?.colaboradoresEmpleos;
                 const colaborador = notificacion?.colaboradoresEmpleos.colaborador;
                 const detalleEvento = notificacion?.detalleEvento;
                 const solicitudId = notificacion.id
                 const asistenciaConfirmada = {colaboradoresEmpleos, colaborador, detalleEvento, solicitudId}
                 notificacionService.confirmarColaborador(asistenciaConfirmada)  // Enviamos el notificacionId y fechaEvento
                     .then(() => {
                         alert("¡¡Felicitaciones!! ¡¡Has aceptado al colaborador!!");
                         obtenerNotificaciones();
                         navigate('/notificaciones');
                     })
                     .catch(error => {
                         alert(error.response?.data || "Ocurrió un error al aceptar el empleo.");
                     });
             } catch (error) {
                 console.error("Error al aceptar la notificación", error);
             }
         }
     };
     const handleRechazarColaborador = (notificacion) => { //en ese caso la "notificacion" en realidad es la "solicitud", se usa la misma var para reciclar
         const confirmacion = window.confirm(`¿Estás seguro de rechazar esta notificación?`);
         if (confirmacion) {
             try {
                 notificacionService.rechazarNotificacion(notificacion?.id, rol)  // Enviamos solo notificacionId
                     .then(() => {
                        alert("Has rechazado al colaborador.");
                        obtenerNotificaciones();
                        navigate('/notificaciones');  // Llamo a las activas de nuevo
                     })
                     .catch(err => console.error("Error al rechazar notificación:", err));
             } catch (error) {
                 console.error("Error al rechazar la notificación", error);
             }
         }
     };

    return (
        <div>
            {rol === 'Colaborador' ? (
                <div className="notificaciones-container">
                    <h2>Mis Notificaciones</h2>
                    <div className="notificaciones-list">
                        {notificaciones  && notificaciones.length > 0 ? 
                            notificaciones.map((notificacion, index) => (
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
                                        notificacion.tipoNotificacion === 3 ? (
                                            <>
                                                <h3 className="titulo-evento">{notificacion.nombreEvento}</h3>
                                                <p className="mensaje-cancelacion">
                                                    ¡¡Felicitaciones!! !!Has sido seleccionado para el evento ¡¡<strong>{notificacion.nombreEvento}</strong> como <strong>{notificacion.empleo}</strong>. 
                                                    Verás mas especificaciones en tus Próximos Eventos.
                                                </p>
                                                <button className="btn entendido" onClick={() => handleEntendidoEventoCancelado(notificacion)}>Entendido</button>
                                            </>
                                        ) : 
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
                            notificacion.status === "Cancelled" ? 
                                <div key={index} className="notificacion-card">
                                    <h3 className="titulo-evento">{notificacion.detalleEvento.evento.nombre}</h3>
                                    <p className="descripcion">
                                        ¡¡Lo sentimos!! El colaborador <strong> {notificacion.colaboradoresEmpleos.colaborador.nombre} {notificacion.colaboradoresEmpleos.colaborador.apellido} </strong> 
                                        ha cancelado su asistencia para el evento <strong> {notificacion.detalleEvento.evento.nombre} </strong> para el puesto
                                        <strong> {notificacion.colaboradoresEmpleos.empleos.nombre} </strong> <br />
                                        Te hemos actualizado los cupos disponibles para que realices más búsquedas<br />
                                        <strong>Cupos disponibles:</strong> {notificacion.detalleEvento.cantidadDisponible}
                                    </p>
                                    <p className="fecha-evento"><strong>Fecha: {formatDateTime(notificacion.fechaEvento)} </strong></p>
                                    <div className="botones-accion">
                                        <button className="btn entendido" onClick={() => handleEntendidoEventoCancelado(notificacion.id)}>Entendido</button>
                                    </div>
                                </div> 
                            :
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

export default MisNotificaciones;
