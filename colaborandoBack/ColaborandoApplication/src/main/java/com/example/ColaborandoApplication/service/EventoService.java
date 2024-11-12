package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.mapper.EventoMapper;
import com.example.ColaborandoApplication.repository.*;
import com.example.ColaborandoApplication.DTO.EventoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.lang.Integer;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DetalleEventoRepository detalleEventoRepository;

    @Autowired
    private EmpleosRepository empleosRepository;

    @Autowired
    private NotificacionesRepository notificacionesRepository;

    @Autowired
    private ColaboradoresEmpleosRepository colaboradoresEmpleosRepository;

    @Autowired
    private AsistenciasConfirmadasRepository asistenciasConfirmadasRepository;

    @Autowired
    private ColaboradorRepository colaboradorRepository;


    @Transactional(rollbackOn = Exception.class)
    public Evento crearEvento(EventoDTO eventoDTO) {
        Evento evento = null;
        try {
            /*hay que ver como obtener el mail del que esta creando el evento*/
            Usuario usuario = usuarioRepository.findById(eventoDTO.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

            evento = EventoMapper.mapEventoaDTOtoEvento(eventoDTO);
            evento.setUsuario(usuario);
            eventoRepository.save(evento);



            Map<Integer, Integer> map = eventoDTO.getEmpleosYcantidad();
            for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
                Integer empleo = entry.getKey();
                Integer cantidad = entry.getValue();

                DetalleEvento detalleEvento = new DetalleEvento();
                detalleEvento.setEvento(evento);
                // La cantidad solicitada es la inicial y la disponible se irá actualizando a medida que se acepten trabajos
                detalleEvento.setCantidadSolicitada(cantidad);
                detalleEvento.setCantidadDisponible(cantidad);

                Empleos empleos = empleosRepository.findById(empleo)
                        .orElseThrow(() -> new IllegalArgumentException("Empleo no encontrado"));
                detalleEvento.setEmpleos(empleos);//Crear variable empleo recuperada del map
                detalleEventoRepository.save(detalleEvento);

                // Llenar tabla asistencias para los colaboradores relacionados con este empleo en la lista
                List<ColaboradoresEmpleos> colaboradoresEnLista = colaboradoresEmpleosRepository.findByEmpleosId(empleo);

                for (ColaboradoresEmpleos colaboradorEmpleo : colaboradoresEnLista) {
                    Notificaciones notificaciones = new Notificaciones();
                    notificaciones.setColaboradoresEmpleos(colaboradorEmpleo);
                    notificaciones.setNotificacion(0);
                    notificaciones.setStatus("Active");
                    notificaciones.setEvento(evento);
                    notificacionesRepository.save(notificaciones);
                }
            }

        } catch (Exception e) {
            System.out.println("Error al crear el Evento: {}"+ e.getMessage()+"\n");
        }
        return evento;
    }

    @Transactional(rollbackOn = Exception.class)
    public List<Evento> getEventos(String status){
        List<Evento> eventos = null;
        try{
            if ("Active".equals(status)){
                eventos = eventoRepository.findByStatus(status);
            }else {
                eventos = eventoRepository.findByStatus(status);
                List<Evento> eventosCancelados = eventoRepository.findByStatus("Canceled");
                eventos.addAll(eventosCancelados);
            }

            return eventos;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public Evento updateEvento(Integer idEvento){
        try{
            Evento evento = eventoRepository.findById(idEvento)
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
            // Cancelo el evento
            evento.setStatus("Canceled");
            eventoRepository.save(evento);

            // Modifico las notificaciones del evento a inactivo
            List<Notificaciones> notificacionesDelEvento = notificacionesRepository.findByEvento(evento);
            notificacionesDelEvento.forEach(notificacion -> notificacion.setStatus("Inactive"));
            notificacionesRepository.saveAll(notificacionesDelEvento);

            // Inactivar notificaciones de colaboradores para ese evento
            Set<Colaborador> colaboradoresUnicos = new HashSet<>();
            notificacionesDelEvento.forEach(notificacion ->
                    colaboradoresUnicos.add(notificacion.getColaboradoresEmpleos().getColaborador())
            );

            // Enviar notificación de evento cancelado a cada colaborador único
            colaboradoresUnicos.forEach(colaborador -> {
                ColaboradoresEmpleos ce = colaboradoresEmpleosRepository.findFirstByColaboradorAndStatus(colaborador, "Active");

                Notificaciones notificacionCancelacion = new Notificaciones();
                notificacionCancelacion.setNotificacion(7); // estandarizamos "notificacion = 7" para eventos cancelados
                notificacionCancelacion.setEvento(evento);
                notificacionCancelacion.setColaboradoresEmpleos(ce); // Le paso el primer empleo activo que encuentre de la persona.
                notificacionCancelacion.setStatus("Active");
                notificacionesRepository.save(notificacionCancelacion);
            });

            //Falta Liberar Agenda del colaboradore

            return evento;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public Evento updateEventoCompleto(EventoDTO eventoDTO){
        Evento evento = null;
        try{
            Usuario usuario = usuarioRepository.findById(eventoDTO.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

            evento = eventoRepository.findById(eventoDTO.getId_evento())
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));

            evento.setNombre(eventoDTO.getNombre());
            evento.setFecha_fin(eventoDTO.getFecha_fin());
            evento.setFecha_inicio(eventoDTO.getFecha_inicio());
            evento.setEspecificaciones(eventoDTO.getEspecificaciones());
            evento.setDescripcion(eventoDTO.getDescripcion());

            eventoRepository.save(evento);

            Map<Integer, Integer> map = eventoDTO.getEmpleosYcantidad();
            for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
                Integer empleo = entry.getKey();
                Integer cantidad = entry.getValue();

                DetalleEvento detalleEvento = new DetalleEvento();
                detalleEvento.setEvento(evento);
                // La cantidad solicitada es la inicial y la disponible se irá actualizando a medida que se acepten trabajos
                detalleEvento.setCantidadSolicitada(cantidad);
                detalleEvento.setCantidadDisponible(cantidad);

                Empleos empleos = empleosRepository.findById(empleo)
                        .orElseThrow(() -> new IllegalArgumentException("Empleo no encontrado"));
                detalleEvento.setEmpleos(empleos);//Crear variable empleo recuperada del map
                detalleEventoRepository.save(detalleEvento);

                // Llenar tabla asistencias para los colaboradores relacionados con este empleo en la lista
                List<ColaboradoresEmpleos> colaboradoresEnLista = colaboradoresEmpleosRepository.findByEmpleosId(empleo);

                for (ColaboradoresEmpleos colaboradorEmpleo : colaboradoresEnLista) {
                    Notificaciones notificaciones = new Notificaciones();
                    notificaciones.setColaboradoresEmpleos(colaboradorEmpleo);
                    notificaciones.setNotificacion(0);
                    notificaciones.setStatus("Active");
                    notificaciones.setEvento(evento);
                    notificacionesRepository.save(notificaciones);
                }
            }
            return evento;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public Evento getEvento(Integer idEvento){
        try{
            Evento evento = eventoRepository.findById(idEvento)
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
            return evento;
        } catch (Exception e) {
            System.out.println("Error al buscar el Evento: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public List<AsistenciasConfirmadas> getEventosColaborador(String status, Integer user_id){
        try{
            //Find user
            //Buscar colaborador con el ID
            Usuario usuario = usuarioRepository.findById(user_id)
                    .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

            Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

            List<AsistenciasConfirmadas> asistenciasConfirmadas = asistenciasConfirmadasRepository.findByColaborador(colaborador);
            //Filter status active
            List<AsistenciasConfirmadas> asistenciasFiltradas = null;
            if ("Active".equals(status)) {
                asistenciasFiltradas = asistenciasConfirmadas.stream()
                        .filter(asistencia -> status.equals(asistencia.getEvento().getStatus())) // Acceso al status de Evento
                        .collect(Collectors.toList());
            }else {
                asistenciasFiltradas = asistenciasConfirmadas.stream()
                        .filter(asistencia -> status.equals(asistencia.getEvento().getStatus())) // Acceso al status de Evento
                        .collect(Collectors.toList());
                List<AsistenciasConfirmadas> asistenciasCanceladas = asistenciasConfirmadas.stream()
                        .filter(asistencia -> "Canceled".equals(asistencia.getEvento().getStatus())) // Acceso al status de Evento
                        .collect(Collectors.toList());
                asistenciasFiltradas.addAll(asistenciasCanceladas);
            }

            return asistenciasFiltradas;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public List<AsistenciasConfirmadas> getEventoAsistentes(Integer idEvento){
        try{
            Evento evento = eventoRepository.findById(idEvento)
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
            List<AsistenciasConfirmadas> asistenciasConfirmadas = asistenciasConfirmadasRepository.findByEvento(evento);
            return asistenciasConfirmadas;
        } catch (Exception e) {
            System.out.println("Error al buscar los asistentes al Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }

    public Evento updateEventoColaborador(String status, Integer colaborador){
        try{
            //Falta ver como cancelar correctamente la asistencia del colaborador
            Evento evento = eventoRepository.findById(colaborador)
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
            evento.setStatus("Canceled");
            eventoRepository.save(evento);
            return evento;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }


}
