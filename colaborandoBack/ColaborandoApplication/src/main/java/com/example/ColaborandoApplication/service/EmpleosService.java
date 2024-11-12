package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.AsociarEmpleosDTO;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.repository.ColaboradoresEmpleosRepository;
import com.example.ColaborandoApplication.repository.EmpleosRepository;
import com.example.ColaborandoApplication.repository.ColaboradorRepository;
import com.example.ColaborandoApplication.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpleosService {

    @Autowired
    private EmpleosRepository empleosRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;
    @Autowired
    private ColaboradoresEmpleosRepository colaboradoresEmpleosRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Empleos> getEmpleos() {
        List<Empleos> empleos = List.of();
        try {
            empleos = empleosRepository.findAllByOrderByNombreAsc();
        } catch (Exception e) {
            System.out.println("Error al obtener empleos: {}"+ e.getMessage());
        }
        return empleos;
    }

    public List<ColaboradoresEmpleos> getEmpleosDeColaborador(Integer userId) {
        List<ColaboradoresEmpleos> empleos = List.of();

        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));
        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

        try {
            empleos = colaboradoresEmpleosRepository.findByColaborador(colaborador);
        } catch (Exception e) {
            System.out.println("Error al obtener empleos: {}"+ e.getMessage());
        }
        return empleos.stream()
                .filter(empleo -> "Active".equals(empleo.getStatus()))
                .collect(Collectors.toList());
    }

    public void asociarEmpleos(AsociarEmpleosDTO asociarEmpleosDTO) {

        Usuario usuario = usuarioRepository.findById(asociarEmpleosDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

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

    @Transactional
    public void actualizarEmpleosColaborador(Integer userId, List<Integer> empleosSeleccionados) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));

        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

        List<ColaboradoresEmpleos> relaciones = colaboradoresEmpleosRepository.findByColaborador(colaborador);

        // Iterar sobre las relaciones actuales y actualizar el estado según la lista empleosSeleccionados
        for (ColaboradoresEmpleos relacion : relaciones) {
            if (empleosSeleccionados.contains(relacion.getEmpleos().getId())) {
                // Si el empleo está en la lista seleccionada, activarlo
                relacion.setStatus("Active");
            } else {
                // Si no está en la lista, desactivarlo
                relacion.setStatus("Inactive");
            }
        }

        // Guardar los cambios en el repositorio
        colaboradoresEmpleosRepository.saveAll(relaciones);

        // Crear nuevas relaciones para los empleos seleccionados que aún no existen
        for (Integer empleoId : empleosSeleccionados) {
            boolean existeRelacion = relaciones.stream()
                    .anyMatch(relacion -> relacion.getEmpleos().getId().equals(empleoId));
            if (!existeRelacion) {
                ColaboradoresEmpleos nuevaRelacion = new ColaboradoresEmpleos();
                nuevaRelacion.setColaborador(colaborador);
                Empleos empleo = empleosRepository.findById(empleoId)
                        .orElseThrow(() -> new IllegalArgumentException("Empleo no encontrado"));

                nuevaRelacion.setEmpleos(empleo); // Suponiendo que tienes un constructor para esto
                nuevaRelacion.setStatus("Active");
                colaboradoresEmpleosRepository.save(nuevaRelacion);
            }
        }
    }

}
