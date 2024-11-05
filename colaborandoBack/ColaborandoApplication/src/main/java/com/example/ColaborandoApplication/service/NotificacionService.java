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
        // Obtener todos los eventos con status "Active"
        List<Evento> eventosActivos = eventoRepository.findByStatus("Active");

        if (eventosActivos.isEmpty()) {
            return null;
        }
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

        // Para cada evento activo, enviar notificaciones y construir la respuesta
        List<NotificacionResponseDTO> response = eventosActivos.stream()
                .flatMap(evento -> {
                    // Obtener todos los empleos relacionados al evento
                    List<DetalleEvento> detallesEvento = detalleEventoRepository.findByEvento(evento);
                    List<Integer> idsEmpleosEvento = detallesEvento.stream()
                            .map(detalle -> detalle.getEmpleos().getId())
                            .collect(Collectors.toList());

                    // Obtener los colaboradores con empleos que coinciden con el evento
                    List<ColaboradoresEmpleos> colaboradoresEmpleos = colaboradoresEmpleosRepository
                            .findByEmpleosIdInAndColaborador(idsEmpleosEvento, colaborador);

                    // Crear las notificaciones y construir la respuesta para cada colaborador
                    return colaboradoresEmpleos.stream().map(ce -> {
                        /*Notificaciones notificacion = new Notificaciones();
                        notificacion.setEvento(evento);
                        notificacion.setColaboradoresEmpleos(ce);
                        notificacion.setNotificacion(0);
                        notificacionesRepository.save(notificacion);*/

                        // Construir el objeto de respuesta
                        NotificacionResponseDTO res = new NotificacionResponseDTO();
                        res.setNombreEvento(evento.getNombre());
                        res.setFechaEvento(evento.getFecha_inicio());
                        res.setEmpleo(ce.getEmpleos().getNombre());
                        return res;
                    });
                })
                .collect(Collectors.toList());

        return response;
    }

}
