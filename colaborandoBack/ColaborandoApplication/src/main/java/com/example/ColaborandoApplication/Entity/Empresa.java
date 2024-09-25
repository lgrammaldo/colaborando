package com.example.ColaborandoApplication.Entity;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "empresas")
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario2 usuario2;

    @Column(nullable = false, name = "razon_social")
    private String razonSocial;



    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String cuit;

    @Column(nullable = false)
    private String direccion;
}
