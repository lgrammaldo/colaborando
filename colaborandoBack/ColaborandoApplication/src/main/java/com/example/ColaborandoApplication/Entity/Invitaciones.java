package com.example.ColaborandoApplication.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "invitaciones")
public class Invitaciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_invitaciones;

    @Column(nullable = false, unique = true)
    private Integer notificacion;

    @OneToOne
    @JoinColumn(name = "id_colaboradoresEmpleos", unique = true)
    private ColaboradoresEmpleos colaboradoresEmpleos;

    @OneToOne
    @JoinColumn(name = "id_listas", unique = true)
    private Listas listas;

}