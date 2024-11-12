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

    @GetMapping("/update-evento/{idEvento}")
    public ResponseEntity<Evento> updateEventos(@PathVariable Integer idEvento) {
        return ResponseEntity.ok(eventoService.updateEvento(idEvento));
    }

    @GetMapping("/get-evento/{idEvento}")
    public ResponseEntity<Evento> getEventos(@PathVariable Integer idEvento) {
        return ResponseEntity.ok(eventoService.getEvento(idEvento));
    }
/*
    @GetMapping("/get-evento-asistentes/{idEvento}")
    public ResponseEntity<AsistenciasConfirmadas> getEventosAsistentes(@PathVariable Integer idEvento) {
        return ResponseEntity.ok(eventoService.getEventoAsistentes(idEvento));
    }
*/
    @GetMapping("/get-eventos-colaborador/{status}/{colaborador}")
    public ResponseEntity<List<AsistenciasConfirmadas>> getEventosColaborador(@PathVariable String status, @PathVariable Integer colaborador) {
        return ResponseEntity.ok(eventoService.getEventosColaborador(status, colaborador));
    }

    @GetMapping("/update-eventos-colaborador/{status}/{colaborador}")
    public ResponseEntity<Evento> updateEventoColaborador(@PathVariable String status, @PathVariable Integer colaborador) {
        return ResponseEntity.ok(eventoService.updateEventoColaborador(status, colaborador));
    }

}
