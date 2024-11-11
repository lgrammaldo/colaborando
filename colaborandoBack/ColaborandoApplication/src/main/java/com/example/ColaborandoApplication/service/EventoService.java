package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.mapper.EventoMapper;
import com.example.ColaborandoApplication.repository.*;
import com.example.ColaborandoApplication.DTO.EventoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.lang.Integer;


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
                    notificaciones.setEvento(evento); // Relacionar con la lista actual
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
        try{
            //List<Evento> eventos = eventoRepository.findByStatus("Active");
            List<Evento> eventos = eventoRepository.findByStatus(status);
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
            evento.setStatus("Canceled");
            eventoRepository.save(evento);
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

    public List<Evento> getEventosColaborador(String status, String colaborador){
        try{
            List<Evento> eventos = eventoRepository.findByStatusAndColaborador(status,colaborador);
            return eventos;
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
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
