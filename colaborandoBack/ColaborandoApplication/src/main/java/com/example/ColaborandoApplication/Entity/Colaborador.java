package com.example.ColaborandoApplication.Entity;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "colaboradores")
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = true)
    private Usuario usuario;

    @Column(nullable = false, unique = true)
    private Integer dni;

  /*  /*Agregado 9-10*/
  /*  @Column(nullable = true, unique = true)
    private String calificacion;

    @Column(nullable = true, unique = true)
    private String cuil; */
    /**/

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false)
    private String telefono;

/*    @Column(nullable = false, unique = true)
    private Integer id_turnos;
*/
}
