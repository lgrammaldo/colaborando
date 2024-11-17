import axios from 'axios';

const NOTIFICACIONES_API_BASE_URL = "http://colaborando.ddns.net:8080/colaborando/notificaciones";

class NotificacionesService { 
    // Método para obtener un colaborador enviando el userId como parámetro
    getNotificaciones(userId, rol) {
        if (rol === 'Colaborador'){
            return axios.get(`${NOTIFICACIONES_API_BASE_URL}/colaborador/get-notificaciones/${userId}`);
        } else {
            return axios.get(`${NOTIFICACIONES_API_BASE_URL}/establecimiento/get-notificaciones/${userId}`);
        }
        
    }

    rechazarNotificacion(notificacionId, rol) {
        return axios.put(`${NOTIFICACIONES_API_BASE_URL}/rechazar/${notificacionId}/${rol}`);
    }

    aceptarNotificacion(notificacionId, fechaEvento) {
        const aceptarNotificacionDTO = {notificacionId, fechaEvento}
        return axios.post(`${NOTIFICACIONES_API_BASE_URL}/aceptar`, aceptarNotificacionDTO);
    }

    confirmarColaborador(detalleColaborador) {
        return axios.post(`${NOTIFICACIONES_API_BASE_URL}/confirmar_colaborador`, detalleColaborador);
    }

    hasNotificaciones(userId) {
        return axios.get(`${NOTIFICACIONES_API_BASE_URL}/hasNotifications/${userId}`);
    }

}

const notificacionesService = new NotificacionesService();

export default notificacionesService;
