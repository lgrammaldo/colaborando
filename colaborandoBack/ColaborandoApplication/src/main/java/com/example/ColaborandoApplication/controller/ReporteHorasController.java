package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.Entity.ReporteHoras;
import com.example.ColaborandoApplication.service.ReporteHorasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://colaborando.ddns.net", "http://localhost:3000"})
@RestController
@RequestMapping("/colaborando/reporteHoras")
public class ReporteHorasController {

    @Autowired
    private ReporteHorasService reporteHorasService;

    @GetMapping("/horas-colaborador/{colaborador}")
    public ResponseEntity<List<ReporteHoras>> getHorasColaborador(@PathVariable Integer colaborador) {
        return ResponseEntity.ok(reporteHorasService.getHorasColaborador(colaborador));
    }

    @GetMapping("/horas-empresa")
    public ResponseEntity<List<ReporteHoras>> getHorasEmpresa() {
        return ResponseEntity.ok(reporteHorasService.getHorasEmpresa());
    }
}
