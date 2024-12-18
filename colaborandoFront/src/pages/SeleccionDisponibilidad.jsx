// SeleccionDisponibilidad.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../trash/NavBarWithLogo';
import './SeleccionDisponibilidad.css';

const SeleccionDisponibilidad = () => {
    const navigate = useNavigate();

    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const intervalos = ['0-6hs', '6-12hs', '12-18hs', '18-24hs'];

    const [disponibilidad, setDisponibilidad] = useState(
        diasSemana.reduce((acc, dia) => {
            acc[dia] = intervalos.reduce((intAcc, intervalo) => {
                intAcc[intervalo] = false;
                return intAcc;
            }, {});
            return acc;
        }, {})
    );

    const handleCheckboxChange = (dia, intervalo) => {
        setDisponibilidad((prevDisponibilidad) => ({
            ...prevDisponibilidad,
            [dia]: {
                ...prevDisponibilidad[dia],
                [intervalo]: !prevDisponibilidad[dia][intervalo],
            },
        }));
    };

    const handleSelectDiaCompleto = (dia) => {
        const diaSeleccionado = disponibilidad[dia];
        const seleccionarTodo = !Object.values(diaSeleccionado).every((checked) => checked);
        setDisponibilidad((prevDisponibilidad) => ({
            ...prevDisponibilidad,
            [dia]: intervalos.reduce((acc, intervalo) => {
                acc[intervalo] = seleccionarTodo;
                return acc;
            }, {}),
        }));
    };

    const handleSelectTodo = () => {
        const seleccionarTodo = !diasSemana.every((dia) =>
            Object.values(disponibilidad[dia]).every((checked) => checked)
        );
        setDisponibilidad(
            diasSemana.reduce((acc, dia) => {
                acc[dia] = intervalos.reduce((intAcc, intervalo) => {
                    intAcc[intervalo] = seleccionarTodo;
                    return intAcc;
                }, {});
                return acc;
            }, {})
        );
    };

    const handleContinuar = () => {
        const fechasSeleccionadas = diasSemana.reduce((acc, dia) => {
            const horariosSeleccionados = intervalos.filter(
                (intervalo) => disponibilidad[dia][intervalo]
            );
            if (horariosSeleccionados.length > 0) {
                acc[dia] = horariosSeleccionados;
            }
            return acc;
        }, {});
        console.log('Disponibilidad seleccionada:', fechasSeleccionadas);
        navigate('/resumen');
    };

    return (
        <div>
            <NavBarWithLogo />
            <div className="container-sm">
                <h1 className="text-center mt-3">Seleccioná tu Disponibilidad</h1>
                
                <form className="mt-3">
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Día</th>
                                {intervalos.map((intervalo) => (
                                    <th key={intervalo}>{intervalo}</th>
                                ))}
                                <th>Todo el día</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diasSemana.map((dia) => (
                                <tr key={dia}>
                                    <td>{dia}</td>
                                    {intervalos.map((intervalo) => (
                                        <td key={intervalo}>
                                            <input
                                                type="checkbox"
                                                checked={disponibilidad[dia][intervalo]}
                                                onChange={() => handleCheckboxChange(dia, intervalo)}
                                            />
                                        </td>
                                    ))}
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={Object.values(disponibilidad[dia]).every((checked) => checked)}
                                            onChange={() => handleSelectDiaCompleto(dia)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="form-check text-center mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectAll"
                            onChange={handleSelectTodo}
                            checked={diasSemana.every((dia) =>
                                Object.values(disponibilidad[dia]).every((checked) => checked)
                            )}
                        />
                        <label className="form-check-label" htmlFor="selectAll">
                            Seleccionar todo
                        </label>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-lg" 
                        onClick={handleContinuar}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeleccionDisponibilidad;
