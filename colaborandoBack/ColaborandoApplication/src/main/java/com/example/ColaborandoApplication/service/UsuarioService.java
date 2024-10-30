package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.EstablecimientoDTO;
import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.Entity.Establecimiento;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.mapper.EmpresaMapper;
import com.example.ColaborandoApplication.mapper.PersonaMapper;
import com.example.ColaborandoApplication.repository.EstablecimientoRepository;
import com.example.ColaborandoApplication.repository.ColaboradorRepository;
import com.example.ColaborandoApplication.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Autowired
    private EstablecimientoRepository establecimientoRepository;

    @Transactional(rollbackOn = Exception.class)
    public Usuario crearUsuarioYPersona(ColaboradorDTO colaboradorDTO) throws CodigoEstablecimientoInvalidoException {
        // Logica de verificar el codigo de establecimiento
      /*  var establecimiento = establecimientoRepository.findByCodigo(colaboradorDTO.getCodEstablecimiento());
        if (establecimiento.isEmpty()){
            throw new CodigoEstablecimientoInvalidoException("Por favor ingresa un código de Establecimiento válido.");
        } */

        Usuario usuario = null;
        Colaborador colaborador = null;
        try {
            usuario = getUserFromEntity(colaboradorDTO.getEmail(), colaboradorDTO.getPassword(), "Colaborador");
            usuarioRepository.save(usuario);

            // Logica de verificar el codigo de establecimiento
        /*    var establecimiento = establecimientoRepository.findByCodigo(colaboradorDTO.getCodEstablecimiento());

            if (establecimiento.isEmpty()){
                throw new CodigoEstablecimientoInvalidoException("Por favor ingresa un código de Establecimiento válido.");
            } */

            colaborador = PersonaMapper.mapPersonaDTOtoPersona(colaboradorDTO);
            colaborador.setUsuario(usuario);
            colaboradorRepository.save(colaborador);
        } catch (Exception e) {
            System.out.println("Error al crear Usuario2 o Colaborador: {}"+ e.getMessage()+"\n");
        }
        return usuario;
    }

    @Transactional(rollbackOn = Exception.class)
    public Usuario crearUsuarioYEmpresa(EstablecimientoDTO establecimientoDTO) {
        Usuario usuario = null;
        try {
            usuario = getUserFromEntity(establecimientoDTO.getEmail(), establecimientoDTO.getPassword(), "Establecimiento");
            usuario = usuarioRepository.save(usuario);

            Establecimiento establecimiento = EmpresaMapper.mapPersonaDTOtoPersona(establecimientoDTO);
            establecimiento.setUsuario(usuario);
            establecimientoRepository.save(establecimiento);
        } catch (Exception e) {
            System.out.println("Error al crear Usuario2 o Empresa: {}"+ e.getMessage());
        }
        return usuario;
    }

    private Usuario getUserFromEntity(String email, String password, String tipoPersona) {
        Usuario user = new Usuario();
            user.setEmail(email);
            user.setPassword(password);
            user.setTipoUsuario(tipoPersona);
           // user.setStatus(new Status());
            /*user.setFechaCreacion(new Date());*/
        return user;
    }
}
