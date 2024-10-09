package com.example.ClinicaOdontologicaApplication.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Date;

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
