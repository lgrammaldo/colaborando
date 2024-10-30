package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.EstablecimientoDTO;
import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.service.CodigoEstablecimientoInvalidoException;
import com.example.ColaborandoApplication.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/colaborando/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/crear-colaborador")
    public ResponseEntity<Usuario> crearPersona(@RequestBody ColaboradorDTO colaboradorDTO) throws CodigoEstablecimientoInvalidoException {
        Usuario usuario = usuarioService.crearUsuarioYPersona(colaboradorDTO);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/crear-establecimiento")
    public ResponseEntity<Usuario> crearEstablecimiento(@RequestBody EstablecimientoDTO establecimientoDTO) {
        Usuario usuario = usuarioService.crearUsuarioYEmpresa(establecimientoDTO);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/obtener-persona")
    public ResponseEntity<Usuario> getPersona(@RequestBody EstablecimientoDTO establecimientoDTO) {
        Usuario usuario = usuarioService.crearUsuarioYEmpresa(establecimientoDTO);
        return ResponseEntity.ok(usuario);
    }

    @ExceptionHandler(CodigoEstablecimientoInvalidoException.class)
    public ResponseEntity<String> handleCodigoEstablecimientoInvalidoException(CodigoEstablecimientoInvalidoException ex) {
        return ResponseEntity.badRequest().body("Por favor ingresa un código de Establecimiento válido.");
    }
}
