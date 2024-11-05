package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.NotificacionResponseDTO;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.service.EmpleosService;
import com.example.ColaborandoApplication.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/colaborando/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping("/get-notificaciones/{userId}")
    public ResponseEntity<List<NotificacionResponseDTO>> getNotificaciones(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificacionService.getNotificaciones(userId));
    }
}
