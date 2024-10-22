import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService';
import LogoComponente from '../components/LogoComponente';

const CrearEvento = () => {
  const [nombre, setNombre] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [numero3, setNumero3] = useState('');
  const [combo1, setCombo1] = useState('');
  const [combo2, setCombo2] = useState('');
  const [combo3, setCombo3] = useState('');

  const navigate = useNavigate();

  const saveEvento = (e) => {
    e.preventDefault();
    const fecha_publicacion = new Date();
    var usu = null;
    var sta = null;
    const evento = { nombre, fecha_publicacion, fecha_inicio, fecha_fin, usu, sta, especificaciones, descripcion };

    eventoService.createEvento(evento)
      .then(res => {
        console.log('Evento registrado:', evento);
        alert("Evento creado exitosamente.");
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
                    <input type="datetime-local" className="form-control" value={fecha_inicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Fecha Fin: </label>
                    <input type="datetime-local" className="form-control" value={fecha_fin} onChange={(e) => setFechaFin(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Especificaciones:</label>
                    <input type="text" className="form-control" value={especificaciones} onChange={(e) => setEspecificaciones(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Descripción:</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                  </div>

                  <table className="table mt-4">
                    <tbody>
                      <tr>
                        <td>
                          <label>Combo 1:</label>
                          <select className="form-control" value={combo1} onChange={(e) => setCombo1(e.target.value)}>
                            <option value="">Seleccionar</option>
                            <option value="opcion1">Camarero</option>
                            <option value="opcion2">Mozo</option>
                            <option value="opcion3">DJ</option>
                          </select>
                        </td>
                        <td>
                          <input type="number" className="form-control" value={numero1} onChange={(e) => setNumero1(e.target.value)} placeholder="Cantidad" required />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Combo 2:</label>
                          <select className="form-control" value={combo2} onChange={(e) => setCombo2(e.target.value)}>
                            <option value="">Seleccionar</option>
                            <option value="opcion1">Camarero</option>
                            <option value="opcion2">Mozo</option>
                            <option value="opcion3">DJ</option>
                          </select>
                        </td>
                        <td>
                          <input type="number" className="form-control" value={numero2} onChange={(e) => setNumero2(e.target.value)} placeholder="Cantidad" required />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Combo 3:</label>
                          <select className="form-control" value={combo3} onChange={(e) => setCombo3(e.target.value)}>
                            <option value="">Seleccionar</option>
                            <option value="opcion1">Camarero</option>
                            <option value="opcion2">Mozo</option>
                            <option value="opcion3">DJ</option>
                          </select>
                        </td>
                        <td>
                          <input type="number" className="form-control" value={numero3} onChange={(e) => setNumero3(e.target.value)} placeholder="Cantidad" required />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button type="submit" className="btn btn-lg mt-4" style={{ width: '100%', backgroundColor: 'rgb(203, 102, 101)', color: 'white' }}>
                    Crear Evento
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

export default CrearEvento;
