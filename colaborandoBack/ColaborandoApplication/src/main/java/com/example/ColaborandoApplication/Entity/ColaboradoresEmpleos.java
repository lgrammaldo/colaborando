package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "colaboradoresEmpleos")
public class ColaboradoresEmpleos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_colaboradoresEmpleos;

    @OneToOne
    @JoinColumn(name = "id_colaborador", unique = true)
    private Colaborador colaborador;

    @OneToOne
    @JoinColumn(name = "id_status", unique = true)
    private Status status;

    @OneToOne
    @JoinColumn(name = "id_empleos", unique = true)
    private Empleos empleos;

}