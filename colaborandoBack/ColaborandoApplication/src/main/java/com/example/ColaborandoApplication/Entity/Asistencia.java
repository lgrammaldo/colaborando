package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "asistencias")
public class Asistencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_colaboradorEmpleos")
    private ColaboradoresEmpleos colaboradoresEmpleos;

    @ManyToOne
    @JoinColumn(name = "id_detalleEvento")
    private DetalleEvento detalleEvento;

    @Column
    private Date fechaEvento;
}
