import axios from 'axios';

const NOTIFICACIONES_API_BASE_URL = "http://localhost:8080/colaborando/notificaciones";

class NotificacionesService { 
    // Método para obtener un colaborador enviando el userId como parámetro
    getNotificaciones(userId) {
        return axios.get(`${NOTIFICACIONES_API_BASE_URL}/get-notificaciones/${userId}`);
    }

    rechazarNotificacion(notificacionId) {
        return axios.put(`${NOTIFICACIONES_API_BASE_URL}/rechazar/${notificacionId}`);
    }

    aceptarNotificacion(notificacionId, fechaEvento) {
        const aceptarNotificacionDTO = {notificacionId, fechaEvento}
        return axios.post(`${NOTIFICACIONES_API_BASE_URL}/aceptar`, aceptarNotificacionDTO);
    }

}

const notificacionesService = new NotificacionesService();

export default notificacionesService;