package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.EstablecimientoDTO;
import com.example.ColaborandoApplication.Entity.Establecimiento;

public class EmpresaMapper {
    public static Establecimiento mapPersonaDTOtoPersona(EstablecimientoDTO establecimientoDTO) {
        return Establecimiento.builder()
                .razonSocial(establecimientoDTO.getRazonSocial())
                .cuit(establecimientoDTO.getCuit())
                .telefono(establecimientoDTO.getTelefono())
                .direccion(establecimientoDTO.getDireccion())
                .build();
    }
}
