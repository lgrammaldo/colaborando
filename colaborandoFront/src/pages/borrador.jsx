// CrearUsuario.jsx
import React, { useState } from 'react';
import usuariosService from '../services/UsuariosService';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo';
import LogoComponente from '../components/LogoComponente'; // Asegúrate de que la ruta sea correcta

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
        .then(
            res => {
                console.log('Persona registrada:', colaborador);
                alert("Registro exitoso.");
                handleLogin(e);              
            }
        ).catch(error => {
            alert("Error al crear colaborador")
        })
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await LoginService.authenticateUser({ email, password });
            localStorage.setItem('token', response.data?.token);
            localStorage.setItem('rol', response.data?.rol);
            localStorage.setItem('userId', response.data?.userId);
            
            navigate('/seleccion-empleos');
        } catch (error) {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(resMessage)
        }
    }

    return (
        <div>
            <NavBarWithLogo />
            <div className="container">
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className="card">
                            <div className="card-body">
                                {/* Aquí se muestra el logo dentro del formulario */}
                                <form onSubmit={saveUsuario}>
                                    <LogoComponente />
                                    <h2 className="text-center">Registrarse</h2>
                                    <div className='form-group'>
                                        <label>Nombre: </label>
                                        <input type="text" className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>Apellido: </label>
                                        <input type="text" className='form-control' value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>DNI: </label>
                                        <input type="text" className='form-control' value={dni} onChange={(e) => setDNI(e.target.value)} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>Teléfono: </label>
                                        <input type="text" className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>Contraseña: </label>
                                        <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>Código de Establecimiento: </label>
                                        <input type="text" className='form-control' value={codEstablecimiento} onChange={(e) => setCodEstablecimiento(e.target.value)} required />
                                    </div>
                                    <button type="submit" className='btn btn-success'>Guardar</button>
                                </form>
                                <footer>
                                    <div className="text-center mt-2">
                                        <span>¿Ya tienes cuenta? </span>
                                        <a href="/login" className="text-decoration-none">Ingresar.</a>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;
