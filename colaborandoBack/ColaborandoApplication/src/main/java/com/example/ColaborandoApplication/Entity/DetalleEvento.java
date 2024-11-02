package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "detalle_evento")
public class DetalleEvento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_listas;

    @Column(nullable = false, unique = false)
    private Integer cantidad;

    @OneToOne
    @JoinColumn(name = "id_evento", unique = false)
    private Evento evento;

    @OneToOne
    @JoinColumn(name = "id_empleos", unique = false)
    private Empleos empleos;
}