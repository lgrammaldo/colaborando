package com.example.ColaborandoApplication.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@RequiredArgsConstructor
public class EventoDTO {
    private String nombre;
    private Date fecha_publicacion;
    private Date fecha_fin_busqueda;
    private Date fecha_inicio;
    private Date fecha_fin;
    private Integer userId;
    private String especificaciones;
    private String descripcion;
    private Map<Integer, Integer> empleosYcantidad;

}
