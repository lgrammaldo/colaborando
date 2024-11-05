import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CrearUsuario from './pages/CrearUsuario';
import Login from './pages/Login';
import SeleccionEmpleos from './pages/SeleccionEmpleos';
import CrearEvento from './pages/CrearEvento2';
import MiPerfil from './pages/MiPerfil';
import Header from './pages/Header';
import EditaRoles from './pages/EditaRoles';
import MisNotificaciones from './pages/MisNotificaciones';

function App() {
  return (
    <div className="App">
      <Router>
        <ContentWithHeader />
      </Router>
    </div>
  );
}

function ContentWithHeader() {
  const location = useLocation();
  
  return (
    <div>
      {/* Condiciona la visualización del Header */}
      {location.pathname !== "/login" && location.pathname !== "/crear-colaborador" && <Header />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/crear-colaborador" element={<CrearUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seleccion-empleos" element={<SeleccionEmpleos />} />
        <Route path="/edita-roles" element={<EditaRoles />} />
        <Route path="/crear-evento" element={<CrearEvento />} />
        <Route path="/editar-perfil" element={<MiPerfil />} />
        <Route path="/notificaciones" element={<MisNotificaciones />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
