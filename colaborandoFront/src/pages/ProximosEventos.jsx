import React, { useEffect, useState }  from 'react';
import './Home.css';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import eventoService from '../services/EventoService.js';
import moment from 'moment'; // Importa moment

function Home() {
    const navigate = useNavigate();
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [proximosEventos, setProximosEventos] = useState([]);

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
           
            <div className="container text-center">
                <div className="row align-items-center box3">
                    <div className="col-md-4">
                        <ul className="list-group">
                            {proximosEventos.map((evento, index) => (
                            <li className="list-group-item" key={index}>
                                <strong>{evento.nombre}</strong> - {moment(evento.fecha).format('DD/MM/YYYY')}
                            </li>
                            ))}
                        </ul>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
