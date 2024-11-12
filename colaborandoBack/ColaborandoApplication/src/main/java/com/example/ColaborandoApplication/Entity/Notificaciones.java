package com.example.ColaborandoApplication.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "notificaciones")
public class Notificaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = true)
    private Integer notificacion;

    @OneToOne
    @JoinColumn(name = "id_colaboradoresEmpleos")
    private ColaboradoresEmpleos colaboradoresEmpleos;

    @Column
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

}
