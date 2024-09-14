package com.example.ClinicaOdontologicaApplication.mapper;

import com.example.ClinicaOdontologicaApplication.DTO.PersonaDTO;
import com.example.ClinicaOdontologicaApplication.Entity.Persona;

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
