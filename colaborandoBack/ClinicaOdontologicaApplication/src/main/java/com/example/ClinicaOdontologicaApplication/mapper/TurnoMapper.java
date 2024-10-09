package com.example.ClinicaOdontologicaApplication.mapper;

import com.example.ClinicaOdontologicaApplication.DTO.TurnoDTO;
import com.example.ClinicaOdontologicaApplication.Entity.Turno;

public class TurnoMapper {
    public static Evento mapPersonaDTOtoPersona(TurnoDTO turnoDTO) {
        return Evento.builder()
                .descripcion_turno(turnoDTO.getdescripcion_turno())
                .build();
    }
}
