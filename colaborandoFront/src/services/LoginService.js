import axios from 'axios';

const LOGIN_API_BASE_URL = "http://colaborando.ddns.net:8080/colaborando/login";

class LoginService { 
    
    // Método para enviar las credenciales del usuario al endpoint de login
    authenticateUser(credentials) {
        return axios.post(LOGIN_API_BASE_URL, credentials);
    }

    logout() {
        return axios.post(LOGIN_API_BASE_URL, null, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
    }

}

const loginService = new LoginService();

export default loginService;
