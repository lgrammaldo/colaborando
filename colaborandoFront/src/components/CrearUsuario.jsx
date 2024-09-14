import React, { useState } from 'react';
import usuariosService from '../services/UsuariosService';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../principal/NavBarWithLogo';

const CrearUsuario = () => {
    const [isEmpresa, setIsEmpresa] = useState(false); // Estado para alternar entre persona y empresa
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dni, setDNI] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [cuit, setCuit] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState(''); // Nuevo campo dirección para empresas

    const navigate = useNavigate();

    const saveUsuario = (e) => {
        try {
            e.preventDefault();
            if (isEmpresa) {
                const empresa = { email, password, razon_social: razonSocial, telefono, cuit, direccion };
                usuariosService.createUsuarioEmpresa(empresa)
                console.log('Empresa registrada:', empresa);
            } else {
                const persona = { nombre, apellido, email, telefono, dni, password };
                usuariosService.createUsuarioPersona(persona)
                console.log('Persona registrada:', persona);
            }
            alert("Registro exitoso.");
            navigate('/login'); // Redirige tras el registro
        } catch (error){
            
        }
        
    };

    return (
        <div>
            <NavBarWithLogo />
            <br/>
            <h2 className="text-center">Registro</h2>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-outline-primary" onClick={() => setIsEmpresa(false)}>Persona</button>
                <button className="btn btn-outline-secondary" onClick={() => setIsEmpresa(true)} style={{ marginLeft: '10px' }}>Empresa</button>
            </div>
            <div className="container">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <div className="card-body">
                            <form>
                                {isEmpresa ? (
                                    <>
                                       <div className='form-group'>
                                            <label>Razón Social: </label>
                                            <input type="text" className='form-control' value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} required />
                                        </div>
                                        <div className='form-group'>
                                            <label>CUIT: </label>
                                            <input type="text" className='form-control' value={cuit} onChange={(e) => setCuit(e.target.value)} required />
                                        </div>
                                        <div className='form-group'>
                                            <label>Dirección: </label>
                                            <input type="text" className='form-control' value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                                        </div>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
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
                                <button className='btn btn-success' onClick={(e) => saveUsuario(e)}>Guardar</button>
                            </form>
                            <footer>
                                <div className="text-center mt-2">
                                    <span>¿Ya tienes cuenta? </span>
                                    <a href="/login" className="text-decoration-none">
                                    Ingresar.
                                    </a>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;
