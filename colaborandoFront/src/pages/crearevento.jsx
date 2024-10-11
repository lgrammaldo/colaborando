import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarWithLogo from '../components/NavBarWithLogo';

const CrearEvento = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    duracion: '',
    especificaciones: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí podrías hacer algo con los datos, como enviarlos a un servidor
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
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label>Nombre: </label>
                    <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required/>
                  </div>
                  <div className='form-group'>
                    <label>Fecha: </label>
                    <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required/>
                  </div>
                  <div className='form-group'>
                    <label>Duración:</label>
                    <input type="text" name="duracion" value={formData.duracion} onChange={handleChange} required/>
                  </div>
                  <div className='form-group'>
                    <label>Especificaciones:</label>
                    <input type="text" name="especificaciones" value={formData.especificaciones} onChange={handleChange} required/>
                  </div>
                  <div className='form-group'>
                    <label>Descripción:</label>
                    <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required/>
                  </div>
                  <table>
                    <tr>
                      <td>
                        <div>
                          <label>Combo 1:
                          <select name="combo1" value={formData.combo1} onChange={handleChange}>
                            <option value="">Seleccionar</option>
                            <option value="opcion1">Camarero</option>
                            <option value="opcion2">Mozo</option>
                            <option value="opcion3">DJ</option>
                          </select>
                          </label>
                        </div>                        
                      </td>
                      <td>
                        <input type="number" name="numero1" value={formData.numero1} onChange={handleChange} placeholder="Cantidad" required/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <label>Combo 2:
                            <select name="combo2" value={formData.combo2} onChange={handleChange}>
                              <option value="">Seleccionar</option>
                              <option value="opcion1">Camarero</option>
                              <option value="opcion2">Mozo</option>
                              <option value="opcion3">DJ</option>
                            </select>
                           
                          </label>
                        </div>
                      </td>
                      <td>
                        <input type="number" name="numero2" value={formData.numero2} onChange={handleChange} placeholder="Cantidad" required/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <label>
                            Combo 3:
                            <select name="combo3" value={formData.combo3} onChange={handleChange}>
                              <option value="">Seleccionar</option>
                              <option value="opcion1">Camarero</option>
                              <option value="opcion2">Mozo</option>
                              <option value="opcion3">DJ</option>
                            </select>
                            
                          </label>
                        </div>   
                      </td>
                      <td>
                        <input type="number" name="numero3" value={formData.numero3} onChange={handleChange} placeholder="Número" required/>
                      </td>
                    </tr>
                  </table>
                  <button className='btn btn-success' onClick={(e) => CrearEvento(e)}>Crear Evento</button>
                </form>
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