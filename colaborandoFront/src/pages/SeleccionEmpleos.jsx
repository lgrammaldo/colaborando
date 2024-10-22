import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo';
import empleosService from '../services/EmpleosService';  // Importa tu servicio correctamente

const SeleccionEmpleos = () => {
    const navigate = useNavigate();
    
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    const [empleos, setEmpleos] = useState([]);
    
    const [empleosSeleccionados, setEmpleosSeleccionados] = useState([]);

    useEffect(() => {
        console.log("userID:", userId);
        empleosService.getEmpleos()
        .then(
            res => {
                console.log("Empleos recibidos:", res);  // Verifica si los empleos se reciben correctamente
                setEmpleos(res.data);             
            }
        )
        .catch(err => console.error("Error obteniendo empleos:", err));
    }, []);
    
    // Función para manejar la selección de empleos
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);  // Convertir el valor del checkbox (id) a número
    
        setEmpleosSeleccionados((prevSeleccionados) => {
            if (checked) {
                return [...prevSeleccionados, id];  // Agrega el empleo seleccionado
            } else {
                return prevSeleccionados.filter((empleoId) => empleoId !== id);  // Elimina el empleo no seleccionado
            }
        });
    };
    // Función para continuar con la selección
    const handleContinuar = () => {
        console.log('Empleos seleccionados (IDs):', empleosSeleccionados);
        const asociarEmpleosAColaborador = { empleosSeleccionados, userId }; 
        empleosService.asociarEmpleosAColaborador(asociarEmpleosAColaborador)
        .then(
            res => {
                navigate('/home')
            }
        ).catch(error => {
            alert("Error al crear colaborador")
        })
       
    };

    const handleOmitir = () => {
        navigate('/home');
    };

    return (
        <div>
            <NavBarWithLogo />
            {rol === 'Colaborador' ? (
                <div className="container-sm">
                    <h1 className="text-center mt-3">Seleccioná tus roles</h1>
                    
                    <form className="mt-3">
                        {
                        empleos.length > 0 ? (
                            empleos.map((empleo) => (
                                <div className="form-check mb-2" key={empleo.id}>  
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={empleo.id}  // El valor será el ID del empleo
                                        id={`empleo-${empleo.id}`}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor={`empleo-${empleo.id}`}>
                                        {empleo.nombre}  {/* Mostrar el nombre del empleo */}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron empleos disponibles.</p>
                        )}
                    </form>

                    <h5 className="text-center mt-4">Si omites este paso puedes agregar tus roles luego.</h5>
                    <div className="text-center mt-4">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-lg" 
                            style={{ width: '100%' }}  
                            onClick={handleContinuar}
                        >
                            Continuar
                        </button>
                    </div>
                   <div className="text-center mt-4">
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                        style={{ width: '100%' }}
                        onClick={handleOmitir}
                    >
                        Omitir
                    </button>
                </div>
            </div>
            ) : (
                <h1>PÁGINA NO ENCONTRADA</h1>
            )}
        </div>
    );
};

export default SeleccionEmpleos;
