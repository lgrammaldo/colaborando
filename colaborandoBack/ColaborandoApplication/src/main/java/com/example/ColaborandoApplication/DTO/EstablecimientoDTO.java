package com.example.ColaborandoApplication.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class EstablecimientoDTO {
    @JsonProperty("razon_social")
    private String razonSocial;
    private String telefono;
    private String cuit;
    private String direccion;
    private String email;
    private String password;

}
