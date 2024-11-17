import axios from 'axios';

const EVENTO_API_BASE_URL = "http://colaborando.ddns.net:8080/colaborando/reporteHoras";

class ReporteHorasService { 

    getHorasColaborador(colaborador){
        return axios.get(`${EVENTO_API_BASE_URL}/horas-colaborador/${colaborador}`, {});
    }  

    getHorasEmpresa(){
        console.log(`${EVENTO_API_BASE_URL}/horas-empresa`);
        return axios.get(`${EVENTO_API_BASE_URL}/horas-empresa`);

    }      

}

const ReporteHorasServiceService = new ReporteHorasService();

export default ReporteHorasServiceService;