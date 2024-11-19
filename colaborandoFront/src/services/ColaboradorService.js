import axios from 'axios';

const PERSONA_API_BASE_URL = "http://colaborando.ddns.net:8080/colaborando/colaborador";

class ColaboradorService { 
    // Método para obtener un colaborador enviando el userId como parámetro
    getColaborador(userId) {
        return axios.get(`${PERSONA_API_BASE_URL}/get-colaborador`, { params: { userId } });
    }

    updateColaborador(userId, colaboradorData) {
        return axios.put(`${PERSONA_API_BASE_URL}/update-colaborador/${userId}`, colaboradorData);
    };

    /* Método para crear un usuario empresa (comentar si no es necesario)
    createUsuarioEmpresa(empresa) {
        return axios.post(`${PERSONA_API_BASE_URL}/crear-establecimiento`, empresa, {});
    } */
    
    // Puedes añadir otros métodos según sea necesario
    
     getRoles(userId) {
        return axios.get(`${PERSONA_API_BASE_URL}/get-roles`, { params: { userId } });
    }
 
    
}

const colaboradorService = new ColaboradorService();

export default colaboradorService;
