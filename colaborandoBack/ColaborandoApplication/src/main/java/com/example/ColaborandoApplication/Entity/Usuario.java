package com.example.ColaborandoApplication.Entity;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.*;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String tipoUsuario;

    /* @OneToOne
    @JoinColumn(name = "id_status", unique = true)
    private Status status;


    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_creacion", nullable = false)
    private Date fechaCreacion;
     */
}