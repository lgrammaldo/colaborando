package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.AsociarEmpleosDTO;
import com.example.ColaborandoApplication.DTO.NotificacionResponseDTO;
import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<NotificacionResponseDTO> getNotificaciones(Integer userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);
        List<ColaboradoresEmpleos> colaboradoresEmpleos = colaboradoresEmpleosRepository.findByColaborador(colaborador);


        List<Notificaciones> notificaciones = notificacionesRepository.findByColaboradoresEmpleosInAndStatus(colaboradoresEmpleos, "Active");


        return notificaciones.stream().map(notificacion -> {
            NotificacionResponseDTO dto = new NotificacionResponseDTO();
            dto.setNombreEvento(notificacion.getEvento().getNombre());
            dto.setFechaEvento(notificacion.getEvento().getFecha_inicio());
            dto.setEmpleo(notificacion.getColaboradoresEmpleos().getEmpleos().getNombre());
            dto.setNotificacionId(notificacion.getId());
            return dto;
        }).collect(Collectors.toList());

    }

    public void actualizarEstadoNotificacion(Integer notificacionId) {
        Notificaciones notificacion = notificacionesRepository.findById(notificacionId)
                .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
        notificacion.setStatus("Inactive");
        notificacionesRepository.save(notificacion);
    }

}
