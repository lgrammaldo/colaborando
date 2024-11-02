package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.mapper.EventoMapper;
import com.example.ColaborandoApplication.repository.EmpleosRepository;
import com.example.ColaborandoApplication.repository.EventoRepository;
import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.repository.UsuarioRepository;
import com.example.ColaborandoApplication.repository.ListasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;


@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ListasRepository listasRepository;

    @Autowired
    private EmpleosRepository empleosRepository;

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

                Listas listas = new Listas();
                listas.setEvento(evento);
                listas.setCantidad(cantidad);

                Empleos empleos = empleosRepository.findById(empleo)
                        .orElseThrow(() -> new IllegalArgumentException("Empleo no encontrado"));
                listas.setEmpleos(empleos);//Crear variable empleo recuperada del map
                listasRepository.save(listas);

            }


            // Establece un valor inicial para cantidad, o según necesites
            // Asigna un Empleos si es necesario, o déjalo nulo si se establecerá más tarde
          /*  Empleos empleos = getEmpleoFromEntity("Nombre del empleo"); // Modifica según tu lógica
            lista.setEmpleos(empleos);*/



        } catch (Exception e) {
            System.out.println("Error al crear el Evento: {}"+ e.getMessage()+"\n");
        }
        return evento;
    }

    private Usuario getUserFromEntity(String email) {
        Usuario user = new Usuario();
        user.setEmail(email);
        return user;
    }

    private Status getStatusFromEntity(String nombre){
        Status status = new Status();
        status.setNombre(nombre);
        return status;
    }

}
