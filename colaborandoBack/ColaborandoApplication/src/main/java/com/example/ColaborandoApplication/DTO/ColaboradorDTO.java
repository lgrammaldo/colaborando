package com.example.ColaborandoApplication.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ColaboradorDTO {

    private Integer dni;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
    private String password;
    private String codEstablecimiento;

}
