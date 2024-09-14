import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8080/colaborando/usuario";

class UsuariosService { 

    createUsuarioPersona(persona){
        return axios.post(PERSONA_API_BASE_URL + "/crear-persona", persona, {})
    }

    createUsuarioEmpresa(empresa){
      return axios.post(PERSONA_API_BASE_URL + "/crear-empresa", empresa, {})
  }

}

const usuariosService = new UsuariosService();

export default usuariosService;