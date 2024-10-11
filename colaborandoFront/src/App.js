
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CrearUsuario from './pages/CrearUsuario';
import Login from './pages/Login';
//import Associate from './pages/Associate';
import SeleccionEmpleos from './pages/SeleccionEmpleos';
import SeleccionDisponibilidad from './pages/SeleccionDisponibilidad';
import CrearEvento from './pages/CrearEvento';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/crear-colaborador" element={<CrearUsuario />} />
              <Route path="/home" element={<Home />} />
              {/* Route path="/associate" element={<Associate />} /> */}
              <Route path="/seleccion-empleos" element={<SeleccionEmpleos />} />
              <Route path="/seleccion-disponibilidad" element={<SeleccionDisponibilidad />} />
              <Route path="/crearevento" element={<CrearEvento />} />
              {/* Asegúrate de tener una ruta para las demás opciones */}
              <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
