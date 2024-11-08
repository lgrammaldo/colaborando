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

    @GetMapping("/get-eventos/{status}")
    public ResponseEntity<List<Evento>> getEventos(@PathVariable String status) {
        return ResponseEntity.ok(eventoService.getEventos(status));
    }

    @PostMapping("/update-evento")
    public ResponseEntity<Evento> updateEventos(Integer idEvento) {
        return ResponseEntity.ok(eventoService.updateEvento(idEvento));
    }
}
