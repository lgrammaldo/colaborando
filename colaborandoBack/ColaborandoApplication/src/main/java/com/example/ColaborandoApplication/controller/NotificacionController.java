package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.NotificacionResponseDTO;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.service.EmpleosService;
import com.example.ColaborandoApplication.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/colaborando/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping("/get-notificaciones/{userId}")
    public ResponseEntity<List<NotificacionResponseDTO>> getNotificaciones(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificacionService.getNotificaciones(userId));
    }

    @PutMapping("/rechazar/{notificacionId}")
    public ResponseEntity<Void> rechazarNotificacion(@PathVariable Integer notificacionId) {
        notificacionService.actualizarEstadoNotificacion(notificacionId);
        return ResponseEntity.ok().build();
    }
}
