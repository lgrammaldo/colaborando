package com.example.ColaborandoApplication.Entity;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "RelUsuarioTurno")
public class RelUsuarioTurno {

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = true)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_turno", unique = true)
    private Turnos turno;

}
