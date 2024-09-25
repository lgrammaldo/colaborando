package com.example.ColaborandoApplication.mapper;

import com.example.ColaborandoApplication.DTO.EmpresaDTO;
import com.example.ColaborandoApplication.Entity.Empresa;

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
