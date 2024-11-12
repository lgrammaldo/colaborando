import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8080/colaborando";

class EmpleosService { 

    getEmpleos(){
        return axios.get(PERSONA_API_BASE_URL + "/get-empleos", {
          /*headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }*/
        })
    }

    getEmpleosColaborador(userId){
      return axios.get(PERSONA_API_BASE_URL + `/get-empleos/colaborador/${userId}`, {
      })
    }

    asociarEmpleosAColaborador(asociarEmpleosDTO){
      return axios.post(PERSONA_API_BASE_URL + "/asociar-empleos", asociarEmpleosDTO, {})
    }

    actualizarEmpleosColaborador(asociarEmpleosDTO){
      return axios.put(PERSONA_API_BASE_URL + "/modificar-empleos", asociarEmpleosDTO, {})
    }
}

const empleosService = new EmpleosService();

export default empleosService;