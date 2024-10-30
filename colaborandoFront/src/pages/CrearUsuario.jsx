import React, { useState } from 'react';
import usuariosService from '../services/UsuariosService';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo';
import LogoComponente from '../components/LogoComponente';


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
                console.log('Persona registrada:', colaborador);
                alert("Registro exitoso.");
                handleLogin(e);
            })
            .catch(error => {
                // Verificar si el servidor devolvió un mensaje de error específico
                if (error.response && error.response.status === 400 && error.response.data) {
                    // Mostrar el mensaje de error específico desde el backend
                    alert(error.response.data);
                } else {
                    alert("Error al crear colaborador");
                }
            });
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
            console.log(resMessage);
        }
    };

    return (
        <div>
           
            <br />
            <h2 className="text-center" style={{ color: '#CB6665' }}>Registrarse</h2> {/* Título con color coral oscuro */}
            <div className="container">
                <div className='row justify-content-center'>
                    <div className='card col-md-6 shadow-lg' style={{ borderColor: '#CB6665' }}> {/* Tarjeta con borde coral oscuro */}
                        <div className="card-body">
                            <form>
                                <div className='form-group mb-3'>
                                    <label>Nombre: </label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Apellido: </label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>DNI: </label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={dni}
                                        onChange={(e) => setDNI(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Teléfono: </label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email: </label>
                                    <input
                                        type="email"
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Contraseña: </label>
                                    <input
                                        type="password"
                                        className='form-control'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Código de Establecimiento: </label>
                                    <input
                                        type="password"
                                        className='form-control'
                                        value={codEstablecimiento}
                                        onChange={(e) => setCodEstablecimiento(e.target.value)}
                                        required
                                        style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                                    />
                                </div>
                                <button
                                    className='btn btn-block'
                                    onClick={(e) => saveUsuario(e)}
                                    style={{ backgroundColor: '#CB6665', color: '#fff', width: '100%' }} // Botón coral oscuro
                                >
                                    Guardar
                                </button>
                            </form>
                            <footer>
                                <div className="text-center mt-2">
                                    <span>¿Ya tienes cuenta? </span>
                                    <a href="/login" className="text-decoration-none" style={{ color: '#CB6665' }}>
                                        Ingresar.
                                    </a>
                        
                                </div>
                                <LogoComponente/>
                                <div>
                                  
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearUsuario;
