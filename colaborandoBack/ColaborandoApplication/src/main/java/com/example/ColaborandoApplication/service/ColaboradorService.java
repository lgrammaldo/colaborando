package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.DTO.EstablecimientoDTO;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.Establecimiento;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.mapper.EmpresaMapper;
import com.example.ColaborandoApplication.mapper.PersonaMapper;
import com.example.ColaborandoApplication.repository.ColaboradorRepository;
import com.example.ColaborandoApplication.repository.EstablecimientoRepository;
import com.example.ColaborandoApplication.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ColaboradorService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;

    public ColaboradorDTO obtenerColaborador(Integer userId) {

        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));
        Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

        return buildColaboradorDTO(usuario, colaborador);

    }

    public void updateColaborador(Integer id, ColaboradorDTO updatedColaborador) {
        colaboradorRepository.findById(id).map(colaborador -> {
            colaborador.setNombre(updatedColaborador.getNombre());
            colaborador.setApellido(updatedColaborador.getApellido());
            colaborador.setTelefono(updatedColaborador.getTelefono());
            colaborador.setDni(updatedColaborador.getDni());
            colaborador.setCodigoEstablecimiento(updatedColaborador.getCodEstablecimiento());

            // Actualizar datos en el objeto Usuario
            Usuario usuario = colaborador.getUsuario();
            usuario.setEmail(updatedColaborador.getEmail());
            usuario.setPassword(updatedColaborador.getPassword());
            usuarioRepository.save(usuario);

            colaboradorRepository.save(colaborador);
            return null;
        });
    }

    public static ColaboradorDTO buildColaboradorDTO(Usuario usuario, Colaborador colaborador){
        ColaboradorDTO colaboradorDTO = new ColaboradorDTO();
            colaboradorDTO.setNombre(colaborador.getNombre());
            colaboradorDTO.setApellido(colaborador.getApellido());
            colaboradorDTO.setDni(colaborador.getDni());
            colaboradorDTO.setTelefono(colaborador.getTelefono());
            colaboradorDTO.setCodEstablecimiento(colaborador.getCodigoEstablecimiento());

            colaboradorDTO.setEmail(usuario.getEmail());
            colaboradorDTO.setPassword(usuario.getPassword());

        return colaboradorDTO;
    }

}
