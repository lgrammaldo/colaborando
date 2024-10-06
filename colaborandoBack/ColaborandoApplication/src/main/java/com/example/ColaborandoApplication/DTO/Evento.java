package com.example.ClinicaOdontologicaApplication.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class EventoDTO {
    private String nombre;
    private Date fecha ;
    private Integer id_establecimiento;
    private Integer cantidad_personal;
    private String especificaciones;
    private String mensaje_predeterminado;

}
