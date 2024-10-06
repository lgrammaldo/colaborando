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

}

const empleosService = new EmpleosService();

export default empleosService;