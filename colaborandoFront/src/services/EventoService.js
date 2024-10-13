import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8080/colaborando/evento";

class EventoService { 

    createEvento(evento){
        return axios.post(PERSONA_API_BASE_URL + "/crear-evento", evento, {})
    }

}

const eventoService = new EventoService();

export default eventoService;