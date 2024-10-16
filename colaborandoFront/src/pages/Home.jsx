import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';


function Home() {
  const [turnos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  const addTurno = () => {
    navigate('/crear-turnos');
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const tieneTurnos = (date) => {
    // Aquí debes implementar la lógica para verificar si hay turnos en 'date'
    return turnos.some(turno => new Date(turno.fechaTurno).toDateString() === date.toDateString());
  }

  // Renderiza el punto si hay turnos en el día seleccionado
  const renderDot = ({ date, view }) => {
    if (view === 'month' && tieneTurnos(date)) {
      return <div className="turno-dot"></div>;
    }
    return null;
  };

  const editTurno = (id) => {
    navigate(`/actualizar-turno/${id}`);
  }

  const deleteTurno = (id) => {

  };

  // Filtrar los turnos para mostrar solo los de la fecha seleccionada
  const filteredTurnos = turnos.filter(turno =>
    new Date(turno.fechaTurno).toLocaleDateString() === selectedDate.toLocaleDateString()
  );

  // Filtrar los turnos para mostrar solo los del mes seleccionado
  const filteredTurnosByMonth = turnos.filter(turno =>
    new Date(turno.fechaTurno).getMonth() === selectedDate.getMonth()
  );

  return (
    <div>
      <Header />
      <div className="container text-center">
        <div className="row align-items-start" style={{ marginTop: "15px" }}>
          <div className="col-3">
            <h2 >Agenda</h2>
          </div>
          <div className="col-7">
            <h2 >Lista de Turnos</h2>
          </div>
          <div className="col-2">
            <button className='btn btn-primary' onClick={addTurno}> Dar Turno</button>
          </div>
        </div>
        <div className="row align-items-start">
          <div className='col-4'>
            <div className="calendar-container">
              <Calendar onChange={handleDateChange} value={selectedDate} tileContent={renderDot} />
            </div>
          </div>

          <div className="col-8">
            <div>
              <table className='table table-striped' style={{ alignItems: "center" }}>
                <thead>
                  <tr>
                    <th>Fecha y Hora</th>
                    <th>Evento</th>
                    <th>Estado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  { /*selectedDate.getDate() === 1 && selectedDate.getHours() === 0
                    ? filteredTurnosByMonth.map(turno => (
                      <tr key={turno.id}>
                        <td>{format(new Date(turno.fechaTurno), 'yyyy-MM-dd HH:mm')}</td>
                        <td>{turno.paciente.nombre} {turno.paciente.apellido} - {turno.paciente.telefono}</td>
                        <td>{turno.odontologo.nombre}</td>
                        <td>{turno.tratamiento}</td>
                        <td>{turno.urgencia ? 'Urgente' : 'Normal'}</td>
                      </tr>
                    ))
                    : filteredTurnos.map(turno => (
                      <tr key={turno.id}>
                        <td>{format(new Date(turno.fechaTurno), 'yyyy-MM-dd HH:mm')}</td>
                        <td>{turno.paciente.nombre} {turno.paciente.apellido} - {turno.paciente.telefono}</td>
                        <td>{turno.odontologo.nombre} {turno.odontologo.apellido}</td>
                        <td>{turno.odontologo.especialidad}</td>
                        <td>{turno.urgencia ? 'Urgente' : 'Normal'}</td>
                        <td>
                          <button onClick={() => editTurno(turno.id)} className='btn btn-info'>Actualizar</button>
                          <button onClick={() => deleteTurno(turno.id)} className='btn btn-danger' style={{ marginTop: "10px" }}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Home;