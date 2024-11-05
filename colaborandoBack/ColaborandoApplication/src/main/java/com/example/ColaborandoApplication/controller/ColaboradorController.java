package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.ColaboradorDTO;
import com.example.ColaborandoApplication.Entity.Usuario;
import com.example.ColaborandoApplication.service.CodigoEstablecimientoInvalidoException;
import com.example.ColaborandoApplication.service.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/colaborando/colaborador")
public class ColaboradorController {
    @Autowired
    private ColaboradorService colaboradorService;

    @GetMapping("/get-colaborador")
    public ResponseEntity<ColaboradorDTO> crearPersona(@RequestParam Integer userId) throws CodigoEstablecimientoInvalidoException {
        ColaboradorDTO colaboradorDTO = colaboradorService.obtenerColaborador(userId);
        return ResponseEntity.ok(colaboradorDTO);
    }
}
