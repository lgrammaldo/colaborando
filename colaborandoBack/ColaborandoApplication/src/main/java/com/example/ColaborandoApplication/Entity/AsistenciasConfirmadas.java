package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "asistenciasConfirmadas")
public class AsistenciasConfirmadas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_colaboradorEmpleos")
    private ColaboradoresEmpleos colaboradoresEmpleos;

    @ManyToOne
    @JoinColumn(name = "id_colaborador")
    private Colaborador colaborador;

    @ManyToOne
    @JoinColumn(name = "id_detalleEvento")
    private Evento evento;

    @Column
    private Date fechaEvento;
}
