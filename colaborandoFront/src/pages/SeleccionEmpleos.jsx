import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import empleosService from '../services/EmpleosService';
import LogoComponente from '../components/LogoComponente-deprecado';
import './SeleccionEmpleos.css';
import Header from './Header';

const SeleccionEmpleos = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromEditRoles = location.state?.fromEditRoles || false;

    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [empleos, setEmpleos] = useState([]);
    const [empleosSeleccionados, setEmpleosSeleccionados] = useState([]);

    useEffect(() => {
        empleosService.getEmpleos()
            .then(res => {
                setEmpleos(res.data);
            })
            .catch(err => console.error("Error obteniendo empleos:", err));
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);

        setEmpleosSeleccionados((prevSeleccionados) => {
            return checked ? [...prevSeleccionados, id] : prevSeleccionados.filter((empleoId) => empleoId !== id);
        });
    };

    const handleContinuar = () => {
        const asociarEmpleosAColaborador = { empleosSeleccionados, userId };
        empleosService.asociarEmpleosAColaborador(asociarEmpleosAColaborador)
            .then(() => navigate('/home'))
            .catch(() => alert("Error al crear colaborador"));
    };

    const handleOmitir = () => {
        navigate('/home');
    };

    return (
     
        
        
        <div className="container-sm">
         <Header />
            {rol === 'Colaborador' ? (
                <>
                    <h1 className="text-center mt-3 title-color">Seleccioná tus roles</h1>
                    
                    <form className="mt-3">
                        {empleos.length > 0 ? (
                            empleos.map((empleo) => (
                                <div className="form-check mb-2" key={empleo.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={empleo.id}
                                        id={`empleo-${empleo.id}`}
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

                    <h5 className="text-center mt-4 subtitle-color">
                        {fromEditRoles ? "Actualiza tus roles" : "Si omites este paso puedes agregar tus roles luego."}
                    </h5>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-lg primary-button"
                            onClick={handleContinuar}
                        >
                            {fromEditRoles ? "Guardar" : "Continuar"}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-lg secondary-button"
                            onClick={handleOmitir}
                        >
                            {fromEditRoles ? "Cancelar" : "Omitir"}
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

export default SeleccionEmpleos;
