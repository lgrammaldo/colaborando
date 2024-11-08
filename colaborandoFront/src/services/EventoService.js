import axios from 'axios';

const EVENTO_API_BASE_URL = "http://localhost:8080/colaborando/evento";

class EventoService { 

    createEvento(evento){
        return axios.post(EVENTO_API_BASE_URL + "/crear-evento", evento, {})
    }

    getProximosEventos(status){
        return axios.get(`${EVENTO_API_BASE_URL}/get-eventos/${status}`, {});
    }    

    updateEvento(eventoId){
        return axios.post(EVENTO_API_BASE_URL + "/update-eventos", eventoId, {})
    }       

}

const eventoService = new EventoService();

export default eventoService;