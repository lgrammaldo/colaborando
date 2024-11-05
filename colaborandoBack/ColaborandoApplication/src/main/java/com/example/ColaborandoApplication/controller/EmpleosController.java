package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.AsociarEmpleosDTO;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.service.EmpleosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/colaborando")
public class EmpleosController {

    @Autowired
    private EmpleosService empleosService;

    @GetMapping("/get-empleos")
    public ResponseEntity<List<Empleos>> getEmpleos() {
        return ResponseEntity.ok(empleosService.getEmpleos());
    }

    @PostMapping("/asociar-empleos")
    public ResponseEntity<Void> asociarEmpleos(@RequestBody AsociarEmpleosDTO asociarEmpleosDTO) {
        empleosService.asociarEmpleos(asociarEmpleosDTO);
        return ResponseEntity.ok().build();
    }
}
