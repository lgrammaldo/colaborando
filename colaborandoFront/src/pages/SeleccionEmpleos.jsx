import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import empleosService from '../services/EmpleosService';  // Importa tu servicio correctamente
import LogoComponente from '../components/LogoComponente';

const SeleccionEmpleos = () => {
    const navigate = useNavigate();
    
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    
    const [empleos, setEmpleos] = useState([]);
    const [empleosSeleccionados, setEmpleosSeleccionados] = useState([]);

   
    useEffect(() => {
        console.log(rol + " " +userId)
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
            if (checked) {
                return [...prevSeleccionados, id];
            } else {
                return prevSeleccionados.filter((empleoId) => empleoId !== id);
            }
        });
    };

    const handleContinuar = () => {
        const asociarEmpleosAColaborador = { empleosSeleccionados, userId }; 
        empleosService.asociarEmpleosAColaborador(asociarEmpleosAColaborador)
        .then(() => {
            navigate('/home');
        })
        .catch(error => {
            alert("Error al crear colaborador");
        });
    };

    const handleOmitir = () => {
        navigate('/home');
    };

    return (
        <div>
           
            {rol === 'Colaborador' ? (
                <div className="container-sm">
                    <h1 className="text-center mt-3" style={{ color: 'rgb(203, 102, 101)' }}>Seleccioná tus roles</h1>
                    
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

                    <h5 className="text-center mt-4" style={{ color: 'rgb(203, 102, 101)' }}>
                        Si omites este paso puedes agregar tus roles luego.
                    </h5>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-lg"
                            style={{
                                width: '100%',
                                backgroundColor: 'rgb(203, 102, 101)',
                                color: 'white',
                                border: 'none',
                            }}
                            onClick={handleContinuar}
                        >
                            Continuar
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-lg"
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                                color: 'rgb(203, 102, 101)',
                                borderColor: 'rgb(203, 102, 101)',
                            }}
                            onClick={handleOmitir}
                        >
                            Omitir
                        </button>
                    </div>
                    <div> 
                      <LogoComponente/>
                    </div>
                </div>
            ) : (
                <h1>PÁGINA NO ENCONTRADA</h1>
            )}
        </div>
    );
};

export default SeleccionEmpleos;
