package com.example.ClinicaOdontologicaApplication.mapper;

import com.example.ClinicaOdontologicaApplication.DTO.EmpresaDTO;
import com.example.ClinicaOdontologicaApplication.Entity.Empresa;

public class EmpresaMapper {
    public static Empresa mapPersonaDTOtoPersona(EmpresaDTO empresaDTO) {
        return Empresa.builder()
                .razonSocial(empresaDTO.getRazonSocial())
                .cuit(empresaDTO.getCuit())
                .telefono(empresaDTO.getTelefono())
                .direccion(empresaDTO.getDireccion())
                .build();
    }
}
