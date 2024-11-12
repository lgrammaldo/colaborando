import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventoService from '../services/EventoService';
import LogoComponente from '../components/LogoComponente.jsx';
import Header from './Header.jsx';
import empleosService from '../services/EmpleosService';  // Importa tu servicio correctamente

const UpdateEvento = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [nombre, setNombre] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [asistentesEventos, setAsistentesEventos] = useState([]);

  const [empleos, setEmpleos] = useState([]);
  const [puestos, setPuestos] = useState([{ empleo: "", cantidad: "" }]);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    empleosService.getEmpleos()
    .then(res => {
        setEmpleos(res.data);      
        getEvento(id);       
        getEventoAsistentes(id);
    })
    .catch(err => console.error("Error obteniendo empleos:", err));
}, []);

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

  const getEventoAsistentes = (eventId) => {
    eventoService.getEventoAsistentes(eventId)
    .then(res => {
        setAsistentesEventos(res.data);
    })
    .catch(err => {
      console.error("Error cargando los asistentes del evento:", err);
      setErrorMessage("Hubo un error al cargar los asistentes del evento.");
    });
  }   
    // Función para agregar un nuevo puesto a la tabla
    const handleAddPuesto = () => {
        setPuestos([...puestos, { empleo: "", cantidad: "" }]);
    };

    // Función para manejar cambios en empleo o cantidad en una fila específica
    const handlePuestoChange = (index, field, value) => {
        const updatedPuestos = [...puestos];
        updatedPuestos[index][field] = value;
        setPuestos(updatedPuestos);
    };

    // Función opcional para eliminar un puesto específico
    const handleRemovePuesto = (index) => {
        setPuestos(puestos.filter((_, i) => i !== index));
    };

  const navigate = useNavigate();

  const handleFechaInicioChange = (e) => {
    const nuevaFechaInicio = e.target.value;
    setFechaInicio(nuevaFechaInicio);

    // Validar que fecha_fin no sea menor que fecha_inicio
    if (fecha_fin && new Date(nuevaFechaInicio) >= new Date(fecha_fin)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
    }
  };

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = e.target.value;
    setFechaFin(nuevaFechaFin);

    // Validar que fecha_fin no sea menor que fecha_inicio
    if (nuevaFechaFin && new Date(nuevaFechaFin) <= new Date(fecha_inicio)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
    }
  };  
  const saveEvento = (e) => {
    e.preventDefault();

    setErrorMessage(''); // Reiniciar el mensaje de error
    // Validar que la fecha de inicio no sea mayor que la fecha de fin
    if (new Date(fecha_inicio) >= new Date(fecha_fin)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
      return;
    }

    const fecha_publicacion = new Date();

    var empleosYcantidad = {};
    puestos.forEach((puesto, index) => {
      if (puesto.empleo && puesto.cantidad) {
        empleosYcantidad[puesto.empleo] = puesto.cantidad; // Usamos `puesto.empleo` (el id) como clave
      }
    });

    const evento = { nombre, fecha_publicacion, fecha_inicio, fecha_fin, userId, especificaciones, descripcion, empleosYcantidad };
    console.log(evento);
    eventoService.createEvento(evento)
      .then(res => {
        console.log('Evento registrado:', evento);
        alert("Evento creado exitosamente.");
        navigate('/home');
      })
      .catch(error => {
        alert("Error al crear evento");
      });
  };

  const proxEventos = (e) => {
    e.preventDefault();
    navigate(-1); // Vuelve a la página anterior en el historial
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
                      {asistentesEventos.map((puesto, index) => (
                        <tr key={index} style={{ padding: '10px 0' }}>
                          <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                            <select
                              className="form-control"
                              value={puesto.empleo}
                              onChange={(e) => handlePuestoChange(index, "empleo", e.target.value)}
                              required
                              style={{ width: '100%' }}
                            >
                              <option value="">Seleccionar</option>
                              {empleos.map((empleo) => (   
                                /* <option key={empleo.id} value={empleo.nombre}> */
                                <option key={empleo.id} value={empleo.id}>
                                  {empleo.nombre}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                            <input
                              type="number"
                              className="form-control"
                              value={puesto.cantidad}
                              onChange={(e) => handlePuestoChange(index, "cantidad", e.target.value)}
                              placeholder="Cantidad"
                              required
                              style={{ width: '100%' }}
                            />
                          </td>
                          <td style={{ padding: '10px', verticalAlign: 'middle', textAlign: 'center' }}>
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
                    Actualizar Evento
                  </button>
                  <button type="button" onClick={proxEventos} className="btn btn-lg mt-4" style={{ width: '100%', backgroundColor: 'rgb(203, 102, 101)', color: 'white' }}>
                    Cancelar
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

export default UpdateEvento;
