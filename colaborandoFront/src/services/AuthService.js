// AuthService.js

import axios from 'axios';

const AuthService = {
  getProtectedData: () => {
    const token = localStorage.getItem("token");

    return axios.get("URL_DEL_ENDPOINT_PROTEGIDO", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "GET, OPTIONS, POST, PUT"
      },
      mode: "no-cors",
    });
  }
};

export default AuthService;
