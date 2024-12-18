package com.example.ColaborandoApplication.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class NotificacionResponseDTO {
    private Integer eventoId;
    private String nombreEvento;
    private Date fechaEvento;
    private String empleo;
    private Integer notificacionId;
    private Integer colaboradoresEmpleosId;
    private Integer tipoNotificacion;
}
