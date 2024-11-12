package com.example.ColaborandoApplication.Entity;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "establecimientos")
public class Establecimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;

    @Column(nullable = false, name = "razon_social")
    private String razonSocial;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String cuit;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false)
    private String ciudad;

    @Column(nullable = false)
    private String provincia;

}
