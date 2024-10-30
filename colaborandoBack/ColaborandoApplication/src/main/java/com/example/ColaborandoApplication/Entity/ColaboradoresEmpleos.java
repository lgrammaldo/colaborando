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
    @JoinColumn(name = "id_colaborador")
    private Colaborador colaborador;

   // @OneToOne
    @JoinColumn(nullable = true)
    private String status;

    @OneToOne
    @JoinColumn(name = "id_empleos")
    private Empleos empleos;

}