import React, { useEffect, useState }  from 'react';
import './Home.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService.js';
import moment from 'moment'; // Importa moment

function Home() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [proximosEventos, setProximosEventos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idEvento, setEventoId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [userId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const status = 'Active'
        {rol === 'Colaborador' ? eventoService.getEventosColaborador(status, userId) 
            .then(res => {
                setProximosEventos(res.data);
              })
              .catch(err => {
                console.error("Error cargando próximos eventos:", err);
              })
            : 
             eventoService.getEventos(status) // Asegúrate de que esta función esté definida en tu servicio
             .then(res => {
                setProximosEventos(res.data);
              })
              .catch(err => {
                console.error("Error cargando próximos eventos:", err);
              });
        }

    }, []);   

    const handleShowModal = (id) => {
        setEventoId(id);
        setShowModal(true);
        setSuccessMessage("");
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setEventoId(null);
        setSuccessMessage("");
    };

    const detalleEvento = (id) => {
        setEventoId(id);
        navigate(`/detalle-evento/${id}`);
      };    

    // Función para actualizar el evento
    const handleUpdate = () => {
        const status = 'Active'
        // Llama a la función que actualiza el evento
        {rol === 'Colaborador' ?
        eventoService.updateEvento(idEvento)//, { /* Aquí pasas los nuevos datos del evento */ })
            .then(eventoService.getEventosColaborador(status, userId)
                .then(res => {
                    setProximosEventos(res.data);
                    setSuccessMessage("El evento fue cancelado exitosamente."); // Establecemos el mensaje de éxito
                })
                .catch(err => {
                    console.error("Error cargando próximos eventos:", err);
                })
            ) 

                /*res => {
                console.log('Evento actualizado exitosamente:', res);
                // Actualizar los eventos después del update, si es necesario
                setProximosEventos(prevEventos =>
                    prevEventos.map(evento =>
                        evento.id === idEvento ? { ...evento, ...res.data } : evento
                    )
                );
                setSuccessMessage("Su asistencia al evento fue cancelada exitosamente."); // Establecemos el mensaje de éxito
            }*/
            .catch(err => {
                console.error("Error actualizando el evento:", err);
                setSuccessMessage("Hubo un error al cancelar la asistencia al evento. Intenta nuevamente."); // Establecemos un mensaje de error
            })
        :
        eventoService.updateEvento(idEvento)//, { /* Aquí pasas los nuevos datos del evento */ })
            .then(eventoService.getEventos(status)
                .then(res => {
                    setProximosEventos(res.data);
                    setSuccessMessage("El evento fue cancelado exitosamente."); // Establecemos el mensaje de éxito
                })
                .catch(err => {
                    console.error("Error cargando próximos eventos:", err);
                })
             )         
            /*.then(res => {
                console.log('Evento actualizado exitosamente:', res);
                // Actualizar los eventos después del update, si es necesario
                setProximosEventos(prevEventos =>
                    prevEventos.map(evento =>
                        evento.id === idEvento ? { ...evento, ...res.data } : evento
                    )
                );
                setSuccessMessage("El evento fue cancelado exitosamente."); // Establecemos el mensaje de éxito
            })*/
            .catch(err => {
                console.error("Error actualizando el evento:", err);
                setSuccessMessage("Hubo un error al cancelar el evento. Intenta nuevamente."); // Establecemos un mensaje de error
            });     
        }   
    };     

    return (
        <div>
           
            <div className="container text-center">
                <div className="row align-items-center box3">
                    <div className="col-md-4">
                        <ul className="list-group">
                            {proximosEventos.map((evento, index) => (
                            <li className="list-group-item" key={index}>
                                <strong>{evento.nombre}</strong> - {moment(evento.fecha).format('DD/MM/YYYY')}
                                <button className="btn btn-primary ms-2" // Puedes cambiar las clases según tu estilo
                                        onClick={() => handleShowModal(evento.id_evento)}>
                                        Cancelar Evento
                                </button>  
                                <button className="btn btn-primary ms-2" // Puedes cambiar las clases según tu estilo
                                        onClick={() => detalleEvento(evento.id_evento)}>
                                        Ver Detalle
                                </button>                                                                    
                            </li>
                            ))}
                        </ul>  
                    </div>
                </div>
            </div>
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmar cancelación</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {successMessage ? successMessage : "¿Estás seguro de que deseas cancelar este evento?"}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                {successMessage ? 'Cerrar' : 'Cancelar'}
                            </button>
                            {!successMessage && (
                                <button type="button" className="btn btn-danger" onClick={handleUpdate}>
                                    Confirmar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
