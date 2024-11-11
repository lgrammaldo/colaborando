package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "reporteHoras")
public class ReporteHoras {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = true)
    private Integer idColaborador;

    @Column(nullable = true)
    private Integer anoEvento;

    @Column(nullable = true)
    private String mesEvento;

    @Column(nullable = true)
    private String colaborador;

    @Column(nullable = true)
    private Integer horasTrabajadas;

    @Column(nullable = true)
    private Integer eventosAsistidos;
}
