import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import logo from '../imagenes/logoColab.png'
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
        const response = await LoginService.authenticateUser({ email, password });
        localStorage.setItem('token', response.data?.token);
        localStorage.setItem('rol', response.data?.rol);
        localStorage.setItem('userId', response.data?.userId);
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
            <div className="card">
              <div className="card-body d-flex flex-column align-items-center"> {/* Added flexbox for centering */}
                <h1 className="text-center mb-4">Bienvenido</h1>
                <img src={logo} alt="Logo CoLaborando" className="img-fluid" /> {/* Added img-fluid for responsiveness */}
                <br/>
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
                    />
                  </div>   

                  <div className="text-center">
                    <button
                      type="submit"   

                      className="btn btn-primary"
                      disabled={loading}
                      style={{ background: '#334fff' }}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>   
                      )}
                      Ingresar
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <a href="/register" className="text-decoration-none">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </form>
                <br/>
                <footer>
                  <div className="text-center mt-2">
                    <span>¿Aún no tienes cuenta? </span>
                    <a href="/crear-colaborador" className="text-decoration-none">
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
}


export default Login;
