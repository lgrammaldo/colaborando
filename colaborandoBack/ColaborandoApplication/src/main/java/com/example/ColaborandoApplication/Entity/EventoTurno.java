package com.example.ColaborandoApplication.Entity;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "EventoTurno")
public class EventoTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Relacion;

    @OneToOne
    @JoinColumn(name = "id_Evento", unique = false)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_Turno", unique = false)
    private Turnos turnos;

}

