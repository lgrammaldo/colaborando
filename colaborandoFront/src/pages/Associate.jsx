import 'react-calendar/dist/Calendar.css';
import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';


function Associate() {
  const navigate = useNavigate();

  const handleSi = () => {
    navigate('/codigoEmpresa');
  };

  const handleNo = () => {
    navigate('/success');
  };
 
  return (
    <div>
      <Header />
      <div className="container text-center">
        <h1 className="my-4">¿Desea asociarse a un Establecimiento?</h1>
        <button className="btn btn-primary mx-2" onClick={handleSi}>Sí</button>
        <button className="btn btn-secondary mx-2" onClick={handleNo}>No</button>
      </div>
    </div>
  );

}

export default Associate;