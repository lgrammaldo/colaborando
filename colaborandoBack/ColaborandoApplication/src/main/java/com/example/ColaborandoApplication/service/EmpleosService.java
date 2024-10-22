package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.AsociarEmpleosDTO;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.repository.ColaboradoresEmpleosRepository;
import com.example.ColaborandoApplication.repository.EmpleosRepository;
import com.example.ColaborandoApplication.repository.ColaboradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleosService {

    @Autowired
    private EmpleosRepository empleosRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;
    @Autowired
    private ColaboradoresEmpleosRepository colaboradoresEmpleosRepository;

    public List<Empleos> getEmpleos() {
        List<Empleos> empleos = List.of();
        try {
            empleos = empleosRepository.findAllByOrderByNombreAsc();
        } catch (Exception e) {
            System.out.println("Error al obtener empleos: {}"+ e.getMessage());
        }
        return empleos;
    }

    public void asociarEmpleos(AsociarEmpleosDTO asociarEmpleosDTO) {
        Colaborador colaborador = colaboradorRepository.findById(asociarEmpleosDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

        // Itera sobre la lista de IDs de empleos
        for (Integer empleoId : asociarEmpleosDTO.getEmpleosSeleccionados()) {
            Empleos empleo = empleosRepository.findById(empleoId)
                    .orElseThrow(() -> new IllegalArgumentException("Empleo no encontrado"));

            // Crea una nueva instancia de ColaboradoresEmpleos
            ColaboradoresEmpleos colaboradoresEmpleos = new ColaboradoresEmpleos();
            colaboradoresEmpleos.setColaborador(colaborador);
            colaboradoresEmpleos.setEmpleos(empleo);
            colaboradoresEmpleos.setStatus("Active");

            // Guarda la asociación en la base de datos
            colaboradoresEmpleosRepository.save(colaboradoresEmpleos);
        }
    }

}
