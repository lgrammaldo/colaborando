package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.Entity.Colaborador;

public class PersonaMapper {
    public static Colaborador mapPersonaDTOtoPersona(ColaboradorDTO colaboradorDTO) {
        Colaborador colaborador =  new Colaborador();
            colaborador.setDni(colaboradorDTO.getDni());
            colaborador.setNombre(colaboradorDTO.getNombre());
            colaborador.setApellido(colaboradorDTO.getApellido());
            colaborador.setTelefono(colaboradorDTO.getTelefono());

        return colaborador;
    }
}
