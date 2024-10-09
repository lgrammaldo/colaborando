package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "evento")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_evento;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false)
    private Date fecha_publicacion;

    @Column(nullable = false)
    private Date fecha_fin_busqueda;

    @Column(nullable = false)
    private Date fecha_inicio;

    @Column(nullable = false)
    private Date fecha_fin;

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = true)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_status", unique = true)
    private Status status;

    @OneToOne
    @JoinColumn(name = "id_turno", unique = true)
    private Turnos turnos;


}