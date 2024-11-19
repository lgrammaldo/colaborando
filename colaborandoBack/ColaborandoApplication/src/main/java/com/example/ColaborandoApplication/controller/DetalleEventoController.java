package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.Entity.DetalleEvento;
import com.example.ColaborandoApplication.service.DetalleEventoService;
import com.example.ColaborandoApplication.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://colaborando.ddns.net", "http://localhost:3000"})
@RestController
@RequestMapping("/colaborando/detalleEvento")
public class DetalleEventoController {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private DetalleEventoService detalleEventoService;

    @GetMapping("/get-detalle-evento/{idEvento}")
    public ResponseEntity<List<DetalleEvento>> getDetalleEventos(@PathVariable Integer idEvento) {
        return ResponseEntity.ok(detalleEventoService.getDetalleEvento(idEvento));
    }

}
