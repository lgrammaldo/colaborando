package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.EstablecimientoDTO;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.service.EmpleosService;
import com.example.ColaborandoApplication.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/colaborando")
public class EmpleosController {

    @Autowired
    private EmpleosService empleosService;

    @GetMapping("/get-empleos")
    public ResponseEntity<List<Empleos>> getEmpleos() {
        return ResponseEntity.ok(empleosService.getEmpleos());
    }
}
