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
@Table(name = "turnos")
public class Turnos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_turno;

    @Column(nullable = false, unique = true)
    private String descripcion_turno;

    @Column(nullable = false, unique = true)
    private String horario;

}