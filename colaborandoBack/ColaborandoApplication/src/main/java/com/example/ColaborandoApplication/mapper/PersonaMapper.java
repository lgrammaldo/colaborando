package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.Entity.Colaborador;

public class PersonaMapper {
    public static Colaborador mapPersonaDTOtoPersona(ColaboradorDTO colaboradorDTO) {
        return Colaborador.builder()
                .dni(colaboradorDTO.getDni())
                .nombre(colaboradorDTO.getNombre())
                .apellido(colaboradorDTO.getApellido())
                .telefono(colaboradorDTO.getTelefono())
                .build();
    }
}
