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
    const [eventoId, setEventoId] = useState(null);

    useEffect(() => {
        const status = 'Active'
        eventoService.getProximosEventos(status) // Asegúrate de que esta función esté definida en tu servicio
        .then(res => {
          setProximosEventos(res.data);
        })
        .catch(err => {
          console.error("Error cargando próximos eventos:", err);
        });
    }, []);   

    const handleShowModal = (id) => {
        setEventoId(id);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setEventoId(null);
    };

    // Función para actualizar el evento
    const handleUpdate = () => {
        // Llama a la función que actualiza el evento
        eventoService.updateEvento(eventoId, { /* Aquí pasas los nuevos datos del evento */ })
            .then(res => {
                console.log('Evento actualizado exitosamente:', res);
                // Actualizar los eventos después del update, si es necesario
                /*setProximosEventos(prevEventos =>
                    prevEventos.map(evento =>
                        evento.id === eventoId ? { ...evento, ...res.data } : evento
                    )
                );*/
            })
            .catch(err => {
                console.error("Error actualizando el evento:", err);
            });
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
                            ¿Estás seguro de que deseas cancelar este evento?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;