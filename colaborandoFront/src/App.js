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
import ProximosEventos from './pages/ProximosEventos';
import DetalleEvento from './pages/DetalleEvento';
import DetalleEventoEmp from './pages/DetalleEventoEmp';
import EventosPasados from './pages/EventosPasados';
import ReporteHoras from './pages/ReporteHoras';
import Footer from "./components/Footer.js";
import UpdateEvento from './pages/UpdateEvento';

function App() {
  return (
    <div className="App">
      <Router>
        <ContentWithHeader />
      </Router>
      
    </div>
  );

  //<Footer /> para agregar despues de router
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
        <Route path="/proxEventos" element={<ProximosEventos />} />
        <Route path="/eventos-inactive" element={<EventosPasados />} />
        <Route path="/detalle-evento/:id" element={<DetalleEvento />} />
        <Route path="/detalle-evento-emp/:id" element={<DetalleEventoEmp />} />
        <Route path="/reporte-horas/" element={<ReporteHoras />} />
        <Route path="/update-evento/:id" element={<UpdateEvento />} />
        <Route path="/" element={<RedirectToLandingPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function RedirectToLandingPage() {
  window.location.href = "/landingpage/index.html";
  return null; // Retorna null porque la redirección se maneja fuera de React.
}

export default App;