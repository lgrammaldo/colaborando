import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8080/colaborando/usuario";

class UsuariosService { 

    createUsuarioPersona(colaborador){
        return axios.post(PERSONA_API_BASE_URL + "/crear-colaborador", colaborador, {})
    }

    /*createUsuarioEmpresa(empresa){
      return axios.post(PERSONA_API_BASE_URL + "/crear-establecimiento", empresa, {})
    }*/

}

const usuariosService = new UsuariosService();

export default usuariosService;