package com.example.ColaborandoApplication.Entity;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "asistencias")
public class Asistencias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private Integer notificacion;

    @OneToOne
    @JoinColumn(name = "id_colaboradoresEmpleos", unique = true)
    private ColaboradoresEmpleos colaboradoresEmpleos;

    @OneToOne
    @JoinColumn(name = "id_status", unique = true)
    private Status status;




}
