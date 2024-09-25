package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.EmpresaDTO;
import com.example.ColaborandoApplication.DTO.PersonaDTO;
import com.example.ColaborandoApplication.Entity.Usuario2;
import com.example.ColaborandoApplication.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/colaborando/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/crear-persona")
    public ResponseEntity<Usuario2> crearPersona(@RequestBody PersonaDTO personaDTO) {
        Usuario2 usuario2 = usuarioService.crearUsuarioYPersona(personaDTO);
        return ResponseEntity.ok(usuario2);
    }

    @PostMapping("/crear-empresa")
    public ResponseEntity<Usuario2> crearEmpresa(@RequestBody EmpresaDTO empresaDTO) {
        Usuario2 usuario2 = usuarioService.crearUsuarioYEmpresa(empresaDTO);
        return ResponseEntity.ok(usuario2);
    }

    @GetMapping("/obtener-persona")
    public ResponseEntity<Usuario2> getPersona(@RequestBody EmpresaDTO empresaDTO) {
        Usuario2 usuario2 = usuarioService.crearUsuarioYEmpresa(empresaDTO);
        return ResponseEntity.ok(usuario2);
    }
}
