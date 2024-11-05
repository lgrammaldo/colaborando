import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8080/colaborando/colaborador";

class ColaboradorService { 
    // Método para obtener un colaborador enviando el userId como parámetro
    getColaborador(userId) {
        return axios.get(`${PERSONA_API_BASE_URL}/get-colaborador`, { params: { userId } });
    }

    /* Método para crear un usuario empresa (comentar si no es necesario)
    createUsuarioEmpresa(empresa) {
        return axios.post(`${PERSONA_API_BASE_URL}/crear-establecimiento`, empresa, {});
    } */
    
    // Puedes añadir otros métodos según sea necesario
}

const colaboradorService = new ColaboradorService();

export default colaboradorService;
