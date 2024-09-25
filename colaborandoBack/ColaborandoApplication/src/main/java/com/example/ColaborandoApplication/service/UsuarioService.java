package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.EmpresaDTO;
import com.example.ColaborandoApplication.DTO.PersonaDTO;
import com.example.ColaborandoApplication.Entity.Empresa;
import com.example.ColaborandoApplication.Entity.Persona;
import com.example.ColaborandoApplication.Entity.Usuario2;
import com.example.ColaborandoApplication.mapper.EmpresaMapper;
import com.example.ColaborandoApplication.mapper.PersonaMapper;
import com.example.ColaborandoApplication.repository.EmpresaRepository;
import com.example.ColaborandoApplication.repository.PersonaRepository;
import com.example.ColaborandoApplication.repository.UsuarioRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository2 usuarioRepository;
    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Transactional(rollbackOn = Exception.class)
    public Usuario2 crearUsuarioYPersona(PersonaDTO personaDTO) {
        Usuario2 usuario2 = null;
        try {
            usuario2 = getUserFromEntity(personaDTO.getEmail(), personaDTO.getPassword(), "Persona");
            usuario2 = usuarioRepository.save(usuario2);

            Persona persona = PersonaMapper.mapPersonaDTOtoPersona(personaDTO);
            persona.setUsuario2(usuario2);
            personaRepository.save(persona);
        } catch (Exception e) {
            System.out.println("Error al crear Usuario2 o Persona: {}"+ e.getMessage());
        }
        return usuario2;
    }

    @Transactional(rollbackOn = Exception.class)
    public Usuario2 crearUsuarioYEmpresa(EmpresaDTO empresaDTO) {
        Usuario2 usuario2 = null;
        try {
            usuario2 = getUserFromEntity(empresaDTO.getEmail(), empresaDTO.getPassword(), "Empresa");
            usuario2 = usuarioRepository.save(usuario2);

            Empresa empresa = EmpresaMapper.mapPersonaDTOtoPersona(empresaDTO);
            empresa.setUsuario2(usuario2);
            empresaRepository.save(empresa);
        } catch (Exception e) {
            System.out.println("Error al crear Usuario2 o Empresa: {}"+ e.getMessage());
        }
        return usuario2;
    }

    private Usuario2 getUserFromEntity(String email, String password, String tipoPersona) {
        Usuario2 user = new Usuario2();
            user.setEmail(email);
            user.setPassword(password);
            user.setTipoUsuario(tipoPersona);
            user.setFechaCreacion(new Date());
        return user;
    }
}
