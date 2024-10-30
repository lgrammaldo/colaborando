package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.mapper.EventoMapper;
import com.example.ColaborandoApplication.repository.EventoRepository;
import com.example.ColaborandoApplication.DTO.EventoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Transactional(rollbackOn = Exception.class)
    public Evento crearEvento(EventoDTO eventoDTO) {
        Evento evento = null;
        try {
            /*hay que ver como obtener el mail del que esta creando el evento*/
            Usuario usuario;// = null;
            usuario = getUserFromEntity("gavilan.lucas4@gmail.com");

            /*hay que ver como obtener el status del evento
            Status status;// = null;
            status = getStatusFromEntity("Activo"); */

            evento = EventoMapper.mapEventoaDTOtoEvento(eventoDTO);
            //evento.setUsuario(usuario);
            //evento.setStatus(status);
            eventoRepository.save(evento);

            Listas lista = new Listas();
            lista.setEvento(evento);
            lista.setCantidad(0); // Establece un valor inicial para cantidad, o según necesites
            // Asigna un Empleos si es necesario, o déjalo nulo si se establecerá más tarde
          /*  Empleos empleos = getEmpleoFromEntity("Nombre del empleo"); // Modifica según tu lógica
            lista.setEmpleos(empleos);

            listasRepository.save(lista);*/

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
