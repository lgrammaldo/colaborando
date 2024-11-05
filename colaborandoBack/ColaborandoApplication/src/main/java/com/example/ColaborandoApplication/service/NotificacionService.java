package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.AceptarNotificacionDTO;
import com.example.ColaborandoApplication.DTO.AsociarEmpleosDTO;
import com.example.ColaborandoApplication.DTO.NotificacionResponseDTO;
import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacionService {

    @Autowired
    private EmpleosRepository empleosRepository;
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
    private AsistenciaRepository asistenciaRepository;

    public List<NotificacionResponseDTO> getNotificaciones(Integer userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);
        List<ColaboradoresEmpleos> colaboradoresEmpleos = colaboradoresEmpleosRepository.findByColaborador(colaborador);


        List<Notificaciones> notificaciones = notificacionesRepository.findByColaboradoresEmpleosInAndStatus(colaboradoresEmpleos, "Active");

         ;

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
                return dto;
        }).collect(Collectors.toList());

    }

    public void actualizarEstadoNotificacion(Integer notificacionId) {
        Notificaciones notificacion = notificacionesRepository.findById(notificacionId)
                .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
        notificacion.setStatus("Inactive");
        notificacionesRepository.save(notificacion);
    }

    @Transactional
    public String aceptarPuesto(AceptarNotificacionDTO aceptarNotificacionDTO) {
        // Obtener la notificación
        Notificaciones notificacion = notificacionesRepository.findById(aceptarNotificacionDTO.getNotificacionId())
                .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));

        // Obtener el detalle del evento correspondiente a la notificación
        DetalleEvento detalleEvento = detalleEventoRepository.findByEventoAndEmpleos(
                notificacion.getEvento(), notificacion.getColaboradoresEmpleos().getEmpleos());

        // Obtener el ColaboradoresEmpleos
        ColaboradoresEmpleos colaboradorEmpleo = notificacion.getColaboradoresEmpleos();

        // Verificar si el colaborador ya tiene un evento el mismo día
        LocalDate fechaEventoSinHora = aceptarNotificacionDTO.getFechaEvento().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        // Obtener asistencias existentes del colaborador para la fecha
        List<Asistencia> asistenciasEnFecha = asistenciaRepository.findByColaboradoresEmpleos(colaboradorEmpleo);

        boolean tieneEventoEseDia = asistenciasEnFecha.stream()
                .anyMatch(asistencia -> asistencia.getFechaEvento().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .equals(fechaEventoSinHora));
        // Retorno el error que ya tiene un evento
        if (tieneEventoEseDia) {
            throw new CustomException("¡Ya tienes un empleo ese día! No puedes aceptarlo.");
        }

        // Verificar disponibilidad
        if (detalleEvento.getCantidadDisponible() > 0) {
            // Crear nueva asistencia
            Asistencia asistencia = new Asistencia();
            asistencia.setColaboradoresEmpleos(colaboradorEmpleo);
            asistencia.setDetalleEvento(detalleEvento);
            asistencia.setFechaEvento(aceptarNotificacionDTO.getFechaEvento());

            // Guardar asistencia
            asistenciaRepository.save(asistencia);

            // Actualizar cantidad disponible
            detalleEvento.setCantidadDisponible(detalleEvento.getCantidadDisponible() - 1);
            detalleEventoRepository.save(detalleEvento);

            // Actualizar el estado de la notificación
            notificacion.setStatus("Inactive"); // O lo que necesites
            notificacionesRepository.save(notificacion);
        } else {
            throw new IllegalArgumentException("No hay disponibilidad para este puesto.");
        }
        return "Ok";
    }

}
