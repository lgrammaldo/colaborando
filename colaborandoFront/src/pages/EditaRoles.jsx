import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import empleosService from '../services/EmpleosService';
import LogoComponente from '../components/LogoComponente';
import './EditaRoles.css';
import Header from './Header';

const EditaRoles = () => {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [empleos, setEmpleos] = useState([]);
    const [empleosSeleccionados, setEmpleosSeleccionados] = useState([]);

    useEffect(() => {
        empleosService.getEmpleosColaborador(userId)
            .then(res => {
                const idsSeleccionados = res.data.map(empleoColab => empleoColab.empleos.id); // obtener los IDs de los empleos del colaborador
                setEmpleosSeleccionados(idsSeleccionados); // Inicializar empleos seleccionados
            })
            .catch(err => console.error("Error obteniendo empleos del colaborador:", err));

        empleosService.getEmpleos()
            .then(res => {
                setEmpleos(res.data);
            })
            .catch(err => console.error("Error obteniendo empleos:", err));
    }, [userId]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);

        setEmpleosSeleccionados((prevSeleccionados) => {
            return checked ? [...prevSeleccionados, id] : prevSeleccionados.filter((empleoId) => empleoId !== id);
        });
    };

    const handleGuardar = () => {
        const asociarEmpleosAColaborador = { empleosSeleccionados, userId };
        empleosService.actualizarEmpleosColaborador(asociarEmpleosAColaborador)
            .then(() => navigate('/home'))
            .catch(() => alert("Error al actualizar roles"));
    };

    const handleCancelar = () => {
        navigate('/home');
    };

    return (
        <div className="container-sm">
            {rol === 'Colaborador' ? (
                <>
                    <h1 className="text-center mt-3 title-color">Editá tus roles</h1>
                    
                    <form className="mt-3">
                        {empleos.length > 0 ? (
                            empleos.map((empleo) => (
                                <div className="form-check mb-2" key={empleo.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={empleo.id}
                                        id={`empleo-${empleo.id}`}
                                        checked={empleosSeleccionados.includes(empleo.id)} // Marcar como seleccionado si está en la lista
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor={`empleo-${empleo.id}`}>
                                        {empleo.nombre}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron empleos disponibles.</p>
                        )}
                    </form>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-lg primary-button"
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-lg secondary-button"
                            onClick={handleCancelar}
                        >
                            Cancelar
                        </button>
                    </div>

                    <div>
                        <LogoComponente />
                    </div>
                </>
            ) : (
                <h1>PÁGINA NO ENCONTRADA</h1>
            )}
        </div>
    );
};

export default EditaRoles;
