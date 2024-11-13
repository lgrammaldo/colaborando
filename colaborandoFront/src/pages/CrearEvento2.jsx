import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService';
import LogoComponente from '../components/LogoComponente.jsx';
import Header from './Header.jsx';
import empleosService from '../services/EmpleosService';  // Importa tu servicio correctamente

const CrearEvento = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [nombre, setNombre] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [empleos, setEmpleos] = useState([]);
  const [puestos, setPuestos] = useState([{ empleo: "", cantidad: "" }]);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    empleosService.getEmpleos()
      .then(res => {
        setEmpleos(res.data);
      })
      .catch(err => console.error("Error obteniendo empleos:", err));
  }, []);

  const handleAddPuesto = () => {
    setPuestos([...puestos, { empleo: "", cantidad: "" }]);
  };

  const handlePuestoChange = (index, field, value) => {
    const updatedPuestos = [...puestos];
    updatedPuestos[index][field] = value;
    setPuestos(updatedPuestos);
  };

  const handleRemovePuesto = (index) => {
    setPuestos(puestos.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const handleFechaInicioChange = (e) => {
    const nuevaFechaInicio = e.target.value;
    setFechaInicio(nuevaFechaInicio);
    if (fecha_fin && new Date(nuevaFechaInicio) >= new Date(fecha_fin)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
    }
  };

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = e.target.value;
    setFechaFin(nuevaFechaFin);
    if (nuevaFechaFin && new Date(nuevaFechaFin) <= new Date(fecha_inicio)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
    }
  };

  const saveEvento = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (new Date(fecha_inicio) >= new Date(fecha_fin)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
      return;
    }

    const fecha_publicacion = new Date();
    var empleosYcantidad = {};
    puestos.forEach((puesto) => {
      if (puesto.empleo && puesto.cantidad) {
        empleosYcantidad[puesto.empleo] = puesto.cantidad;
      }
    });

    const evento = { nombre, fecha_publicacion, fecha_inicio, fecha_fin, userId, especificaciones, descripcion, empleosYcantidad };
    eventoService.createEvento(evento)
      .then(res => {
        alert("Evento creado exitosamente.");
        navigate('/home');
      })
      .catch(error => {
        alert("Error al crear evento");
      });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center" style={{ color: 'rgb(203, 102, 101)' }}>Crear Evento</h2>
                <form onSubmit={saveEvento}>
                  <div className="form-group">
                    <label>Nombre: </label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Fecha Inicio: </label>
                    <input type="datetime-local" className="form-control" value={fecha_inicio} onChange={handleFechaInicioChange} required />
                  </div>
                  <div className="form-group">
                    <label>Fecha Fin: </label>
                    <input type="datetime-local" className="form-control" value={fecha_fin} onChange={handleFechaFinChange} required />
                  </div>
                  <div className="form-group">
                    <label>Especificaciones:</label>
                    <input type="text" className="form-control" value={especificaciones} onChange={(e) => setEspecificaciones(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Descripción:</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                  </div>

                  <button type="button" onClick={handleAddPuesto} className="btn btn-lg mt-4" style={{ width: '100%', backgroundColor: 'rgb(0, 102, 50)', color: 'white' }}>
                    Agregar puesto
                  </button>

                  <table className="table">
                    <tbody>
                      {puestos.map((puesto, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              className="custom-select"
                              value={puesto.empleo}
                              onChange={(e) => handlePuestoChange(index, "empleo", e.target.value)}
                              required
                            >
                              <option value="">Seleccionar</option>
                              {empleos.map((empleo) => (
                                <option key={empleo.id} value={empleo.id}>
                                  {empleo.nombre}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={puesto.cantidad}
                              onChange={(e) => handlePuestoChange(index, "cantidad", e.target.value)}
                              placeholder="Cantidad"
                              required
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleRemovePuesto(index)}
                              style={{
                                color: 'red',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                padding: 0
                              }}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button type="submit" className="btn btn-lg mt-4" style={{ width: '100%', backgroundColor: 'rgb(203, 102, 101)', color: 'white' }}>
                    Crear Evento
                  </button>
                </form>
              </div>
              <div>
                <LogoComponente />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEvento;
