import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo';
import eventoService from '../services/EventoService';



const CrearEvento = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [duracion, setDuracion] = useState('');
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
    //const evento = { nombre, fecha, duracion, especificaciones, descripcion, numero1, numero2, numero3, combo1, combo2, combo3 };
    var usu = null;
    var sta = null;
    const evento = { nombre, fecha, fecha, fecha, fecha, usu, sta, especificaciones, descripcion};
    
    eventoService.createEvento(evento)
    .then(
        res => {
            console.log('Evento registrada:', evento);
            alert("Evento creado con exitoso.");
            //handleLogin(e);              
        }
    ).catch(error => {
        alert("Error al crear evento")
    })
  };

  return (
    <div>
    
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">   
          <div className="card">
            <div className="card-body d-flex flex-column align-items-center"> {/* Added flexbox for centering */}
              <div>
              <h2 className="text-center">Crear Evento</h2>
                  <div className='form-group'>
                    <label>Nombre: </label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                  </div>
                  <div className='form-group'>
                    <label>Fecha: </label>
                    <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required/>
                  </div>
                  <div className='form-group'>
                    <label>Duración:</label>
                    <input type="text" className="form-control" value={duracion} onChange={(e) => setDuracion(e.target.value)} required/>
                  </div>
                  <div className='form-group'>
                    <label>Especificaciones:</label>
                    <input type="text" className="form-control" value={especificaciones} onChange={(e) => setEspecificaciones(e.target.value)} required/>
                  </div>
                  <div className='form-group'>
                    <label>Descripción:</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
                  </div>
                  <table>
                    <tr>
                      <td>
                        <div>
                          <label>Combo 1:
                          <select className="form-control" value={combo1} onChange={(e) => setCombo1(e.target.value)}>
                            <option value="">Seleccionar</option>
                            <option value="opcion1">Camarero</option>
                            <option value="opcion2">Mozo</option>
                            <option value="opcion3">DJ</option>
                          </select>
                          </label>
                        </div>                        
                      </td>
                      <td>
                        <input type="number" className="form-control" value={numero1} onChange={(e) => setNumero1(e.target.value)} placeholder="Cantidad" required/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <label>Combo 2:
                            <select className="form-control" value={combo2} onChange={(e) => setCombo2(e.target.value)}>
                              <option value="">Seleccionar</option>
                              <option value="opcion1">Camarero</option>
                              <option value="opcion2">Mozo</option>
                              <option value="opcion3">DJ</option>
                            </select>
                           
                          </label>
                        </div>
                      </td>
                      <td>
                        <input type="number" className="form-control" value={numero2} onChange={(e) => setNumero2(e.target.value)} placeholder="Cantidad" required/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <label>
                            Combo 3:
                            <select className="form-control" value={combo3} onChange={(e) => setCombo3(e.target.value)}>
                              <option value="">Seleccionar</option>
                              <option value="opcion1">Camarero</option>
                              <option value="opcion2">Mozo</option>
                              <option value="opcion3">DJ</option>
                            </select>
                            
                          </label>
                        </div>   
                      </td>
                      <td>
                        <input type="number" className="form-control" value={numero3} onChange={(e) => setNumero3(e.target.value)} placeholder="Número" required/>
                      </td>
                    </tr>
                  </table>
                  <button className='btn btn-success' onClick={(e) => saveEvento(e)}>Crear Evento</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default CrearEvento;