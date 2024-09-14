
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CrearUsuario from './components/CrearUsuario';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/crear-usuario" element={<CrearUsuario />} />
              <Route path="/home" element={<Home />} />
              {/* Asegúrate de tener una ruta para las demás opciones */}
              <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
