import axios from 'axios';

const EVENTO_API_BASE_URL = "http://colaborando.ddns.net:8080/colaborando/detalleEvento";

class EventoService { 

    getEventoAsistentes(idEvento){
        return axios.get(`${EVENTO_API_BASE_URL}/get-detalle-evento/${idEvento}`, {});
    }       
   
}

const eventoService = new EventoService();

export default eventoService;