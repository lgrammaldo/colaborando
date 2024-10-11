package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "listas")
public class Listas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_listas;

    @Column(nullable = false, unique = true)
    private Integer cantidad;

    @OneToOne
    @JoinColumn(name = "id_evento", unique = true)
    private Evento evento;

    @OneToOne
    @JoinColumn(name = "id_empleos", unique = true)
    private Empleos empleos;

}