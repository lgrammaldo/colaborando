import React, { useState, useEffect } from 'react';
import usuariosService from '../services/UsuariosService';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import LogoComponente from '../components/LogoComponente';
import colaboradorService from '../services/ColaboradorService';
import './MiPerfil.css';
import Header from './Header';

const MiPerfil = () => {
    const [userId] = useState(localStorage.getItem("userId"));
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dni, setDNI] = useState('');
    const [password, setPassword] = useState('');
    const [codEstablecimiento, setCodEstablecimiento] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        colaboradorService.getColaborador(userId)
            .then(res => {
                const { nombre, apellido, email, telefono, dni, password, codEstablecimiento } = res.data;
                setNombre(nombre);
                setApellido(apellido);
                setEmail(email);
                setTelefono(telefono);
                setDNI(dni);
                setPassword(password);
                setCodEstablecimiento(codEstablecimiento);
            })
            .catch(err => console.error("Error obteniendo colaborador:", err));
    }, [userId]);

    const saveUsuario = (e) => {
        const colaboradorData = { nombre, apellido, email, telefono, dni, password, codEstablecimiento };

        colaboradorService.updateColaborador(userId, colaboradorData)
            .then(() => {
                alert("Cambios guardados exitosamente.");
                
            })
            .catch(error => alert(error.response?.data || "Error al actualizar colaborador"));
        
        navigate('/home');
    };

    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <div className="mi-perfil">
            <h2 className="titulo">Actualizá tus datos</h2>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>DNI: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={dni}
                                    onChange={(e) => setDNI(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email: </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Contraseña: </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Código de Establecimiento: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={codEstablecimiento}
                                    onChange={(e) => setCodEstablecimiento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button className="btn guardar-btn" onClick={saveUsuario}>
                                    Guardar
                                </button>
                                <button className="btn cancelar-btn" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiPerfil;