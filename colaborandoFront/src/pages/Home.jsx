import React, { useEffect, useState }  from 'react';
import './Home.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo';
//import { useState } from 'react';
import eventoService from '../services/EventoService';

function Home() {
  const navigate = useNavigate();

  const [rol, setRol] = useState(localStorage.getItem("rol"));
  const [proximosEventos, setProximosEventos] = useState([]);
  const addTurno = () => {
    navigate('/crear-evento');
  };

  // Cargar próximos eventos al montar el componente
  useEffect(() => {
    eventoService.getProximosEventos() // Asegúrate de que esta función esté definida en tu servicio
      .then(res => {
        setProximosEventos(res.data);
      })
      .catch(err => {
        console.error("Error cargando próximos eventos:", err);
      });
  }, []);
  
  return (
    <div>
      <Header />
      {
        rol==='Colaborador'?
          <div className="container text-center">
            <div className="row align-items-start" style={{ marginTop: "15px" }}>
              <div className="col-12">
                <h2 className="text-dark">Dashboard</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-3" style={{  border: '1px solid #cb6665' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title"><i className="fas fa-calendar-alt"></i> Próximos Eventos</h5>
                    <ul className="list-group">
                      {proximosEventos.map((evento, index) => (
                        <li className="list-group-item" key={index}>
                          <strong>{evento.descripcion}</strong> - {new Date(evento.fecha).toLocaleString()}
                        </li>
                      ))}
                    </ul>                    
                    <p className="card-text">Aquí puedes ver los próximos eventos programados.</p>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #cb6665', width: '100%' }} onClick={addTurno}>
                      Crear Turno
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-3" style={{ border: '1px solid #cb6665' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title"><i className="fas fa-history"></i> Historial de Eventos</h5>
                    <br></br>
                    <p className="card-text">Accede a todos los eventos pasados aquí.</p>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #cb6665', width: '100%' }}>
                      Ver Historial
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-3" style={{ border: '1px solid #cb6665' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title"><i className="fas fa-clock"></i> Reporte de Horas</h5>
                    <br></br>
                    <p className="card-text">Consulta el reporte de horas trabajadas.</p>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #cb6665', width: '100%' }}>
                      Ver Reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>        
        :
          <div className="container text-center">
            <div className="row align-items-start" style={{ marginTop: "15px" }}>
              <div className="col-12">
                <h2 className="text-dark">Dashboard</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-3" style={{  border: '1px solid #cb6665' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title"><i className="fas fa-calendar-alt"></i> Próximos Eventos</h5>
                    <p className="card-text">Aquí puedes ver los próximos eventos programados.</p>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #cb6665', width: '100%' }} onClick={addTurno}>
                      Crear Evento
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-3" style={{ border: '1px solid #cb6665' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title"><i className="fas fa-history"></i> Historial de Eventos</h5>
                    <br></br>
                    <p className="card-text">Accede a todos los eventos pasados aquí.</p>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #cb6665', width: '100%' }}>
                      Ver Historial
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-3" style={{ border: '1px solid #cb6665' }}>
                  <div className="card-body text-center">
                    <h5 className="card-title"><i className="fas fa-clock"></i> Reporte de Horas</h5>
                    <br></br>
                    <p className="card-text">Consulta el reporte de horas trabajadas.</p>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #cb6665', width: '100%' }}>
                      Ver Reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>        
      }

    </div>
  );
}

export default Home;
