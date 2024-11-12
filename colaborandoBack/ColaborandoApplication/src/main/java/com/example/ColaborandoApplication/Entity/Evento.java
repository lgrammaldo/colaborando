package com.example.ColaborandoApplication.Entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "evento")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_evento;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = true)
    private Date fecha_publicacion;

    @Column(nullable = true)
    private Date fecha_fin_busqueda;

    @Column(nullable = true)
    private Date fecha_inicio;

    @Column(nullable = true)
    private Date fecha_fin;

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String status;

    @Column(nullable = true)
    private String especificaciones;

    @Column(nullable = true)
    private String descripcion;

}