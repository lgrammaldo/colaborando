package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.Entity.AsistenciasConfirmadas;
import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.service.AsistenciasConfirmadasService;
import com.example.ColaborandoApplication.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://colaborando.ddns.net")
@RestController
@RequestMapping("/colaborando/asistencias")
public class AsistenciasConfirmadasController {

    @Autowired
    private AsistenciasConfirmadasService asistenciasConfirmadasService;

    @GetMapping("/get-evento-asistentes/{idEvento}")
    public ResponseEntity<List<AsistenciasConfirmadas>> getEventosAsistentes(@PathVariable Integer idEvento) {
        return ResponseEntity.ok(asistenciasConfirmadasService.getEventoAsistentes(idEvento));
    }

    @GetMapping("/cancelar_asistencia_confirmada/{eventoId}/{userId}")
    public ResponseEntity<Void> getAsistenciasCanceladas(@PathVariable Integer eventoId, @PathVariable Integer userId) {
        asistenciasConfirmadasService.cancelarAsistenciaColaborador(eventoId, userId);
        return null;
    }

}
