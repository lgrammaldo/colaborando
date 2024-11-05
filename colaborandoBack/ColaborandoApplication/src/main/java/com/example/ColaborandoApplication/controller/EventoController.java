package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/colaborando/evento")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @PostMapping("/crear-evento")
    public ResponseEntity<Evento> crearEvento(@RequestBody EventoDTO eventoDTO) {
        Evento evento = eventoService.crearEvento(eventoDTO);
        return ResponseEntity.ok(evento);
    }

    @PostMapping("/get-eventos")
    public ResponseEntity<List<Evento>> getEventos() {
        return ResponseEntity.ok(eventoService.getEventos());
    }
}
