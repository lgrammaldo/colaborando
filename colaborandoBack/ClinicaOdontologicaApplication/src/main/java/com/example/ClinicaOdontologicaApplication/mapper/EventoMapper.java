package com.example.ClinicaOdontologicaApplication.mapper;

import com.example.ClinicaOdontologicaApplication.DTO.EventoDTO;
import com.example.ClinicaOdontologicaApplication.Entity.Evento;

public class EventoMapper {
    public static Evento mapPersonaDTOtoPersona(EventoDTO eventoDTO) {
        return Evento.builder()
                .nombre(eventoDTO.getEvento())
                .fecha(eventoDTO.getFecha())
                .id_establecimiento(eventoDTO.getid_establecimiento())
                .cantidad_personal(eventoDTO.getcantidad_personal())
                .especificaciones(eventoDTO.getespecificaciones())
                .mensaje_predeterminado(eventoDTO.getmensaje_predeterminado())
                .build();
    }
}
