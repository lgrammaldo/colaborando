package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.Entity.Evento;

public class EventoMapper {
    public static Evento mapEventoaDTOtoEvento(EventoDTO eventoDTO) {
        return Evento.builder()
                .nombre(eventoDTO.getNombre())
                .fecha_publicacion(eventoDTO.getFecha_publicacion())
                .fecha_fin_busqueda(eventoDTO.getFecha_fin_busqueda())
                .fecha_inicio(eventoDTO.getFecha_inicio())
                .fecha_fin(eventoDTO.getFecha_fin())
                /*.usuario(eventoDTO.getId_usuario())
                .id_status(eventoDTO.getId_status())*/
                .especificaciones(eventoDTO.getEspecificaciones())
                .mensaje_predeterminado(eventoDTO.getMensaje_predeterminado())
                .build();
    }
}
