package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.Entity.AsistenciasConfirmadas;
import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/colaborando/detalleEvento")
public class DetalleEventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping("/detalle-evento/{idEvento}")
    public ResponseEntity<Evento> getEventos(@PathVariable Integer idEvento) {
        return ResponseEntity.ok(eventoService.getEvento(idEvento));
    }

}
