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

}
