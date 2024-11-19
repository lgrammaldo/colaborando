import React, { useEffect, useState } from 'react';
import './EventosPasados.css';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService.js';
import moment from 'moment';

function EventosPasados() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [eventosPasados, setEventosPasados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idEvento, setEventoId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [userId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const status = 'Inactive';  // Asumimos que los eventos pasados tienen estado 'Inactive'
        const fetchEventos = rol === 'Colaborador'
            ? eventoService.getEventosColaborador(status, userId)
            : eventoService.getEventos(status);

        fetchEventos
            .then(res => setEventosPasados(res.data))
            .catch(err => console.error("Error cargando eventos pasados:", err));
    }, [rol, userId]);

    const handleShowModal = (id) => {
        setEventoId(id);
        setShowModal(true);
        setSuccessMessage("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEventoId(null);
        setSuccessMessage("");
    };

    const detalleEventoEmp = (id) => navigate(`/detalle-evento-emp/${id}`);
    const updateEventoEmp = (id) => navigate(`/update-evento/${id}`);

    const handleUpdate = () => {
        const status = 'Inactive';
        const update = eventoService.updateEvento(idEvento);
        const fetchEventos = rol === 'Colaborador'
            ? eventoService.getEventosColaborador(status, userId)
            : eventoService.getEventos(status);

        update
            .then(() => fetchEventos.then(res => {
                setEventosPasados(res.data);
                setSuccessMessage("El evento fue cancelado exitosamente.");
            }))
            .catch(err => {
                console.error("Error actualizando el evento:", err);
                setSuccessMessage("Hubo un error al cancelar el evento. Intenta nuevamente.");
            });
    };

    return (
        <div>
            <div className="container text-center">
                <div className="row align-items-center box3">
                    <div className="col-12">
                        <div className="event-list">
                            {eventosPasados.map((evento, index) => (
                                <div className="event-item" key={index}>
                                    <span className="event-name">
                                        {rol === 'Colaborador' ? evento.evento.nombre : evento.nombre}
                                    </span>
                                    <div className="event-actions">
                                        <button className="btn btn-primary me-2" onClick={() => detalleEventoEmp(evento.id_evento)}>
                                            Ver Detalle
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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

export default EventosPasados;
