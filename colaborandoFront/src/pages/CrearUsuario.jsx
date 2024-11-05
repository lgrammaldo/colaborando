import React, { useState } from 'react';
import usuariosService from '../services/UsuariosService';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import LogoComponente from '../components/LogoComponente';
import './CrearUsuario.css';

const CrearUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dni, setDNI] = useState('');
    const [password, setPassword] = useState('');
    const [codEstablecimiento, setCodEstablecimiento] = useState('');

    const navigate = useNavigate();

    const saveUsuario = (e) => {
        e.preventDefault();
        const colaborador = { nombre, apellido, email, telefono, dni, password, codEstablecimiento };
    
        usuariosService.createUsuarioPersona(colaborador)
            .then(res => {
                alert("Registro exitoso.");
                handleLogin(e);
            })
            .catch(error => {
                if (error.response && error.response.status === 400 && error.response.data) {
                    alert(error.response.data);
                } else {
                    alert("Error al crear colaborador");
                }
            });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await LoginService.authenticateUser({ email, password }).then(res => {
                localStorage.setItem('token', res.data?.token);
                localStorage.setItem('rol', res.data?.rol);
                localStorage.setItem('userId', res.data?.userId);
            });
            navigate('/seleccion-empleos');
        } catch (error) {
            console.log(error.toString());
        }
    };

    return (
        <div className="crear-usuario-container">
            <h2 className="title">Registrarse</h2>
            <div className="form-container">
                <div className="card">
                    <div className="card-body">
                        <form>
                            {[
                                { label: 'Nombre', value: nombre, onChange: setNombre },
                                { label: 'Apellido', value: apellido, onChange: setApellido },
                                { label: 'DNI', value: dni, onChange: setDNI },
                                { label: 'Teléfono', value: telefono, onChange: setTelefono },
                                { label: 'Email', value: email, onChange: setEmail, type: 'email' },
                                { label: 'Contraseña', value: password, onChange: setPassword, type: 'password' },
                                { label: 'Código de Establecimiento', value: codEstablecimiento, onChange: setCodEstablecimiento, type: 'password' }
                            ].map((input, index) => (
                                <div className="form-group" key={index}>
                                    <label>{input.label}:</label>
                                    <input
                                        type={input.type || 'text'}
                                        className="form-control"
                                        value={input.value}
                                        onChange={(e) => input.onChange(e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                            <button className="submit-button" onClick={saveUsuario}>Guardar</button>
                        </form>
                        <footer className="footer">
                            <span>¿Ya tienes cuenta? </span>
                            <a href="/login" className="login-link">Ingresar.</a>
                            <LogoComponente />
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearUsuario;
