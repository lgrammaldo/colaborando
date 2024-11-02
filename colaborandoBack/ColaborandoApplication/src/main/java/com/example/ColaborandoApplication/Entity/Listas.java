package com.example.ColaborandoApplication.Entity;

import lombok.Builder;
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

    @Column(nullable = false, unique = false)
    private Integer cantidad;

    @OneToOne
    @JoinColumn(name = "id_evento", unique = false)
    private Evento evento;

    @OneToOne
    @JoinColumn(name = "id_empleos", unique = false)
    private Empleos empleos;

}