import axios from 'axios';

const EVENTO_API_BASE_URL = "http://localhost:8080/colaborando/evento";
const EVENTO_API_BASE_URL_ASISTENCIAS = "http://localhost:8080/colaborando/asistencias";

class EventoService { 

    createEvento(evento){
        return axios.post(EVENTO_API_BASE_URL + "/crear-evento", evento, {})
    }

    getEventos(status){
        console.log(`${EVENTO_API_BASE_URL}/get-eventos/${status}`, {});
        return axios.get(`${EVENTO_API_BASE_URL}/get-eventos/${status}`, {});
    }    

    updateEvento(idEvento){
        return axios.get(`${EVENTO_API_BASE_URL}/update-evento/${idEvento}`, {});
    }   
    
    updateEventoCompleto(evento){
        return axios.get(`${EVENTO_API_BASE_URL}/update-evento-completo`, evento, {});
    }       

    getEvento(idEvento){
        return axios.get(`${EVENTO_API_BASE_URL}/get-evento/${idEvento}`, {});
    }     
    
    getEventoAsistentes(idEvento){
        return axios.get(`${EVENTO_API_BASE_URL_ASISTENCIAS}/get-evento-asistentes/${idEvento}`, {});
    }       
    
    getEventosColaborador(status, colaborador){
        return axios.get(`${EVENTO_API_BASE_URL}/get-eventos-colaborador/${status}/${colaborador}`, {});
    }     
    
    updateEventosColaborador(status, colaborador){
        return axios.get(`${EVENTO_API_BASE_URL}/get-eventos-colaborador/${status}/${colaborador}`, {});
    }       

    getAsistentesRequeridos(idEvento){
        return axios.get(`${EVENTO_API_BASE_URL_ASISTENCIAS}/get-evento-asistentes/${idEvento}`, {});
    }
    
    cancelarEventoColaborador(eventoId, colaborador){
        return axios.get(`${EVENTO_API_BASE_URL_ASISTENCIAS}/cancelar_asistencia_confirmada/${eventoId}/${colaborador}`, {});
    }  
    
}

const eventoService = new EventoService();

export default eventoService;