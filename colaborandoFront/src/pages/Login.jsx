import React, { useState } from 'react';
import NavBar from '../trash/NavBar';
import logo from '../imagenes/logoColab.png';
import './Login.css';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    return email.trim() !== '' && password.trim() !== '';
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (validateForm()) {
      try {
        const response = await LoginService.authenticateUser({ email, password }).then(res=>{
          localStorage.setItem('token', res.data?.token);
          localStorage.setItem('rol', res.data?.rol);
          localStorage.setItem('userId', res.data?.userId);
        });

        navigate('/home');
      } catch (error) {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    } else {
      setLoading(false);
      setMessage('¡Completa todos los campos!');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card shadow" style={{ borderColor: '#CB6665' }}> {/* Borde coral oscuro */}
              <div className="card-body d-flex flex-column align-items-center">
                <h1 className="text-center mb-4" style={{ color: '#CB6665' }}> {/* Texto coral oscuro */}
                  Bienvenido
                </h1>
                <img src={logo} alt="Logo CoLaborando" className="img-fluid mb-4" />
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ borderColor: '#CB6665' }} // Borde input coral oscuro
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn"
                      disabled={loading}
                      style={{ backgroundColor: '#CB6665', color: '#fff', width: '100%' }}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      Ingresar
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <a href="/register" className="text-decoration-none" style={{ color: '#CB6665' }}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </form>
                <footer>
                  <div className="text-center mt-2">
                    <span>¿Aún no tienes cuenta? </span>
                    <a href="/crear-colaborador" className="text-decoration-none" style={{ color: '#CB6665' }}>
                      Registrarse.
                    </a>
                  </div>
                </footer>
                {message && (
                  <div className="form-group mt-3">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
