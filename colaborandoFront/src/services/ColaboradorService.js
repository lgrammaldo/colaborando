import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8080/colaborando/colaborador";

class ColaboradorService { 

    obtenerColaborador(userId){
      return axios.get(PERSONA_API_BASE_URL + "/get-colaborador", { params: {userId:userId} }) // envio userId
    }

    /*createUsuarioEmpresa(empresa){
      return axios.post(PERSONA_API_BASE_URL + "/crear-establecimiento", empresa, {})
    }*/

}

const colaboradorService = new ColaboradorService();

export default colaboradorService;