package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.Entity.Evento;

public class EventoMapper {
    public static Evento mapEventoaDTOtoEvento(EventoDTO eventoDTO) {
         Evento evento = new Evento();
            evento.setNombre(eventoDTO.getNombre());
            evento.setFecha_publicacion(eventoDTO.getFecha_publicacion());
            evento.setFecha_fin_busqueda(eventoDTO.getFecha_fin_busqueda());
            evento.setFecha_inicio(eventoDTO.getFecha_inicio());
            evento.setFecha_fin(eventoDTO.getFecha_fin());
            evento.setStatus("Active");
            evento.setEspecificaciones(eventoDTO.getEspecificaciones());
            evento.setDescripcion(eventoDTO.getDescripcion());
        return evento;
    }
}
