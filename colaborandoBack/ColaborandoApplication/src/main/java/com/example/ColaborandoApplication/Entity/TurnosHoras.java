package com.example.ColaborandoApplication.Entity;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "turnoshoras")
public class TurnosHoras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Relacion;

    @OneToOne
    @JoinColumn(name = "id_Turno", unique = false)
    private Turnos turnos;

    @Column(nullable = false, unique = true)
    private Integer Hora;

}