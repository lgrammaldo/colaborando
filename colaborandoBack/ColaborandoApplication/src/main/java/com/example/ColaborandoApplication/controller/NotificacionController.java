package com.example.ColaborandoApplication.controller;

import com.example.ColaborandoApplication.DTO.AceptarNotificacionDTO;
import com.example.ColaborandoApplication.DTO.AsistenciasConfirmadasDTO;
import com.example.ColaborandoApplication.DTO.NotificacionResponseDTO;
import com.example.ColaborandoApplication.Entity.AsistenciasConfirmadas;
import com.example.ColaborandoApplication.Entity.Solicitudes;
import com.example.ColaborandoApplication.service.CustomException;
import com.example.ColaborandoApplication.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://colaborando.ddns.net", "http://localhost:3000"})
@RestController
@RequestMapping("/colaborando/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping("/colaborador/get-notificaciones/{userId}")
    public ResponseEntity<List<NotificacionResponseDTO>> getNotificacionesColaborador(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificacionService.getNotificacionesColaborador(userId));
    }

    @GetMapping("/establecimiento/get-notificaciones/{userId}")
    public ResponseEntity<List<Solicitudes> > getNotificacionesEstablecimiento(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificacionService.getNotificacionesEstablecimiento(userId));
    }

    @GetMapping("/hasNotifications/{userId}")
    public ResponseEntity<Boolean> userHasNotifications(@PathVariable Integer userId) {
        return ResponseEntity.ok(notificacionService.hasNotificaciones(userId));
    }

    @PutMapping("/rechazar/{notificacionId}/{rol}")
    public ResponseEntity<Void> rechazarNotificacion(@PathVariable Integer notificacionId, @PathVariable String rol) {
        notificacionService.actualizarEstadoNotificacion(notificacionId, rol);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/aceptar")
    public ResponseEntity<Void> aceptarNotificacionColaborador(@RequestBody AceptarNotificacionDTO aceptarNotificacionDTO) {
        notificacionService.aceptarPosiblePuesto(aceptarNotificacionDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/confirmar_colaborador")
    public ResponseEntity<Void> aceptarNotificacionEstablecimiento(@RequestBody AsistenciasConfirmadasDTO asistenciasConfirmadasDTO) {
        notificacionService.confirmarAsistenciaDeColaborador(asistenciasConfirmadasDTO);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> handleCustomException(CustomException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
