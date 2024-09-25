package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.PersonaDTO;
import com.example.ColaborandoApplication.Entity.Persona;

public class PersonaMapper {
    public static Persona mapPersonaDTOtoPersona(PersonaDTO personaDTO) {
        return Persona.builder()
                .dni(personaDTO.getDni())
                .nombre(personaDTO.getNombre())
                .apellido(personaDTO.getApellido())
                .telefono(personaDTO.getTelefono())
                .build();
    }
}
