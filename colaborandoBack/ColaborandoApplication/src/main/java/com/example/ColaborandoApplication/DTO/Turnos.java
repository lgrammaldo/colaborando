package com.example.ClinicaOdontologicaApplication.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class TurnosDTO {
    private String descripcion_turno;

}
