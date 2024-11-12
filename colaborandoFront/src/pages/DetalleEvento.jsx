import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventoService from '../services/EventoService.js';
import LogoComponente from '../components/LogoComponente.jsx';
import Header from './Header.jsx';
import empleosService from '../services/EmpleosService.js';  // Importa tu servicio correctamente

const DetalleEvento = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [nombre, setNombre] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [empleos, setEmpleos] = useState([]);
  const [puestos, setPuestos] = useState([{ empleo: "", cantidad: "" }]);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEvento(id);
    }
  }, [id]);

  const getEvento = (eventId) => {
    
    eventoService.getEvento(eventId)  // Llama al servicio para obtener los datos del evento
      .then(res => {
        const eventoData = res.data;
        setNombre(eventoData.nombre);
        setFechaInicio(eventoData.fecha_inicio);
        setFechaFin(eventoData.fecha_fin);
        setEspecificaciones(eventoData.especificaciones);
        setDescripcion(eventoData.descripcion);
      })
      .catch(err => {
        console.error("Error cargando evento:", err);
        setErrorMessage("Hubo un error al cargar los datos del evento.");
      });
  };
  
  const proxEventos = () => {
    navigate('/proxEventos');
  };     

  const navigate = useNavigate();
  return (
    <div>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center" style={{ color: 'rgb(203, 102, 101)' }}>Detalle Evento</h2>
                <form>
                  <div className="form-group">
                    <label>Nombre: </label>
                    <input type="text" className="form-control" value={nombre} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Fecha Inicio: </label>
                    <input type="text" className="form-control" value={fecha_inicio} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Fecha Fin: </label>
                    <input type="text" className="form-control" value={fecha_fin} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Especificaciones:</label>
                    <input type="text" className="form-control" value={especificaciones} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Descripción:</label>
                    <input type="text" className="form-control" value={descripcion} readOnly />
                  </div>

                  
                  <button type="submit" className="btn btn-lg mt-4" onClick={proxEventos} style={{ width: '100%', backgroundColor: 'rgb(203, 102, 101)', color: 'white' }}>
                    Volver
                  </button>
                </form>
              </div>
              <div>
               <LogoComponente/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleEvento;
