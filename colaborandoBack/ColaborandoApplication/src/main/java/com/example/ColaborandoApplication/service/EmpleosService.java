package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.DTO.EstablecimientoDTO;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.Entity.Establecimiento;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.mapper.EmpresaMapper;
import com.example.ColaborandoApplication.mapper.PersonaMapper;
import com.example.ColaborandoApplication.repository.EmpleosRepository;
import com.example.ColaborandoApplication.repository.EmpresaRepository;
import com.example.ColaborandoApplication.repository.PersonaRepository;
import com.example.ColaborandoApplication.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class EmpleosService {

    @Autowired
    private EmpleosRepository empleosRepository;

    public List<Empleos> getEmpleos() {
        List<Empleos> empleos = List.of();
        try {
            empleos = empleosRepository.findAllByOrderByNombreAsc();
        } catch (Exception e) {
            System.out.println("Error al crear Usuario2 o Empresa: {}"+ e.getMessage());
        }
        return empleos;
    }
}
