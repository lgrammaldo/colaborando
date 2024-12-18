package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.AceptarNotificacionDTO;
import com.example.ColaborandoApplication.DTO.AsistenciasConfirmadasDTO;
import com.example.ColaborandoApplication.DTO.NotificacionResponseDTO;
import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacionService {

    @Autowired
    private EmpleosRepository empleosRepository;
    @Autowired
    private EstablecimientoRepository establecimientoRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;
    @Autowired
    private ColaboradoresEmpleosRepository colaboradoresEmpleosRepository;
    @Autowired
    private DetalleEventoRepository detalleEventoRepository;
    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private NotificacionesRepository notificacionesRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SolicitudesRepository solicitudesRepository;
    @Autowired
    private AsistenciasConfirmadasRepository asistenciasConfirmadasRepository;

    public List<NotificacionResponseDTO> getNotificacionesColaborador(Integer userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);
        List<ColaboradoresEmpleos> colaboradoresEmpleos = colaboradoresEmpleosRepository.findByColaborador(colaborador);

        colaboradoresEmpleos = colaboradoresEmpleos.stream()
                .filter(colaboradorEmpleos -> "Active".equals(colaboradorEmpleos.getStatus())
                        || "Canceled".equals(colaboradorEmpleos.getStatus()))
                .collect(Collectors.toList());


        List<Notificaciones> notificaciones = notificacionesRepository.findByColaboradoresEmpleosInAndStatus(colaboradoresEmpleos, "Active");

        return notificaciones.stream()
            .filter(notificacion -> {
                DetalleEvento detalleEvento = detalleEventoRepository.findByEventoAndEmpleos(
                    notificacion.getEvento(), notificacion.getColaboradoresEmpleos().getEmpleos());
                    return detalleEvento.getCantidadDisponible() > 0;
                })
            .map(notificacion -> {
                NotificacionResponseDTO dto = new NotificacionResponseDTO();
                dto.setNombreEvento(notificacion.getEvento().getNombre());
                dto.setFechaEvento(notificacion.getEvento().getFecha_inicio());
                dto.setEmpleo(notificacion.getColaboradoresEmpleos().getEmpleos().getNombre());
                dto.setColaboradoresEmpleosId(notificacion.getColaboradoresEmpleos().getId_colaboradoresEmpleos());
                dto.setNotificacionId(notificacion.getId());
                dto.setEventoId(notificacion.getEvento().getId_evento());
                dto.setTipoNotificacion(notificacion.getNotificacion());
                return dto;
        }).collect(Collectors.toList());
    }

    public List<Solicitudes> getNotificacionesEstablecimiento(Integer userId) {
        return solicitudesRepository.findAll().stream()
                .filter(solicitud -> "Active".equals(solicitud.getStatus()) || "Cancelled".equals(solicitud.getStatus()))
                .collect(Collectors.toList());
    }

    public Boolean hasNotificaciones(Integer userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        if ("Colaborador".equals(usuario.getTipoUsuario())){
            return notificacionesRepository.findAll().stream()
                    .anyMatch(notificaciones -> "Active".equals(notificaciones.getStatus()));
        } else if ("Establecimiento".equals(usuario.getTipoUsuario())){
            return solicitudesRepository.findAll().stream()
                    .anyMatch(solicitud -> "Active".equals(solicitud.getStatus()));
        }
        return false;
    }

    public void actualizarEstadoNotificacion(Integer notificacionId, String rol) {
        if ("Colaborador".equals(rol)){
            Notificaciones notificacion = notificacionesRepository.findById(notificacionId)
                    .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
            notificacion.setStatus("Inactive");
            notificacionesRepository.save(notificacion);
        } else {
            Solicitudes solicitudes = solicitudesRepository.findById(notificacionId)
                    .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
            solicitudes.setStatus("Inactive");
            solicitudesRepository.save(solicitudes);
        }

    }

    @Transactional
    public String aceptarPosiblePuesto(AceptarNotificacionDTO aceptarNotificacionDTO) {
        // Obtener la notificación
        Notificaciones notificacion = notificacionesRepository.findById(aceptarNotificacionDTO.getNotificacionId())
                .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));

        DetalleEvento detalleEvento = detalleEventoRepository.findByEventoAndEmpleos(
                notificacion.getEvento(), notificacion.getColaboradoresEmpleos().getEmpleos());

        ColaboradoresEmpleos colaboradorEmpleo = notificacion.getColaboradoresEmpleos();

            Solicitudes solicitudes = new Solicitudes();
            solicitudes.setColaboradoresEmpleos(colaboradorEmpleo);
            solicitudes.setDetalleEvento(detalleEvento);
            solicitudes.setFechaEvento(aceptarNotificacionDTO.getFechaEvento());
            solicitudes.setStatus("Active");

            // Guardar asistencia
            solicitudesRepository.save(solicitudes);

            // Actualizar el estado de la notificación
            notificacion.setStatus("Inactive"); // O lo que necesites
            notificacionesRepository.save(notificacion);
        return "Ok";
    }

    public void confirmarAsistenciaDeColaborador(AsistenciasConfirmadasDTO asistenciasConfirmadasDTO){
        DetalleEvento detalleEvento = asistenciasConfirmadasDTO.getDetalleEvento();
        ColaboradoresEmpleos colaboradorEmpleo = asistenciasConfirmadasDTO.getColaboradoresEmpleos();

        LocalDate fechaEventoSinHora = asistenciasConfirmadasDTO.getDetalleEvento().getEvento().getFecha_inicio().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        // Obtener asistencias existentes del colaborador para la fecha
        List<AsistenciasConfirmadas> asistenciasEnFecha = asistenciasConfirmadasRepository.findByColaborador(asistenciasConfirmadasDTO.getColaborador());

        boolean tieneEventoEseDia = asistenciasEnFecha.stream()
                .anyMatch(asistencia -> asistencia.getEvento().getFecha_inicio()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .equals(fechaEventoSinHora) &&
                        "Active".equals(asistencia.getEvento().getStatus())); // Verifica que el evento esté activo

        // Retorno el error que ya tiene un evento
        if (tieneEventoEseDia) {
            String mensaje = String.format("¡El colaborador %s %s ya tiene ocupado ese día! No puedes aceptarlo",
                    colaboradorEmpleo.getColaborador().getNombre(),
                    colaboradorEmpleo.getColaborador().getApellido());
            throw new CustomException(mensaje);
        }

        if (detalleEvento.getCantidadDisponible() > 0) {
            // Crear nueva asistenciaConfirmada
            AsistenciasConfirmadas asistenciaConfirmada = new AsistenciasConfirmadas();
            asistenciaConfirmada.setColaboradoresEmpleos(colaboradorEmpleo);
            asistenciaConfirmada.setColaborador(asistenciasConfirmadasDTO.getColaborador());
            asistenciaConfirmada.setEvento(detalleEvento.getEvento());
            asistenciasConfirmadasRepository.save(asistenciaConfirmada);

            // TODO: Actualizar cantidad disponible MOVER A LA ASISTENCIA REAL CUANDO CONFIRMA EL ESTABLECIMIENTO
             detalleEvento.setCantidadDisponible(detalleEvento.getCantidadDisponible() - 1);
             detalleEventoRepository.save(detalleEvento);

            // Actualizar el estado de la solicitud
            Solicitudes solicitud = solicitudesRepository.findById(asistenciasConfirmadasDTO.getSolicitudId())
                    .orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada"));
            solicitud.setStatus("Inactive"); // O lo que necesites
            solicitudesRepository.save(solicitud);

            Notificaciones notificacionQuedasteColaborador = new Notificaciones();
            notificacionQuedasteColaborador.setEvento(asistenciasConfirmadasDTO.getDetalleEvento().getEvento());
            notificacionQuedasteColaborador.setColaboradoresEmpleos(asistenciasConfirmadasDTO.getColaboradoresEmpleos());
            notificacionQuedasteColaborador.setStatus("Active");
            notificacionQuedasteColaborador.setNotificacion(3);
            notificacionesRepository.save(notificacionQuedasteColaborador);
        } else {
            throw new CustomException(String.format("¡Ya ocupaste el cupo para %s", detalleEvento.getEmpleos().getNombre()));
        }
    }

}
