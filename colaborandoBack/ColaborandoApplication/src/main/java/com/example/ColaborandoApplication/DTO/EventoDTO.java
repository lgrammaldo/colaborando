package com.example.ColaborandoApplication.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Date;

@Data
@RequiredArgsConstructor
public class EventoDTO {
    private Integer id_evento;
    private String nombre;
    private Date fecha_publicacion;
    private Date fecha_fin_busqueda;
    private Date fecha_inicio;
    private Date fecha_fin;
    private Integer id_usuario;
    private Integer id_status;
    private String especificaciones;
    private String descripcion;

}
