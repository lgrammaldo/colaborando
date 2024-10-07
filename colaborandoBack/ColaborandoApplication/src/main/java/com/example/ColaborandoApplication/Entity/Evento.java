package com.example.ClinicaOdontologicaApplication.Entity;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "eventos")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_evento;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false)
    private Date fecha;

    @Column(nullable = false)
    private Integer Id_establecimiento;

    @Column(nullable = false)
    private Integer Cantidad_personal;

    @Column(nullable = false)
    private String Especificaciones;

    @Column(nullable = false)
    private String Mensaje_predeterminado;

}