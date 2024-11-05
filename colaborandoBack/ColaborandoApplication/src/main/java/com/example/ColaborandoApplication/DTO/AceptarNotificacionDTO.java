package com.example.ColaborandoApplication.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class AceptarNotificacionDTO {
    private Integer notificacionId;
    private Date fechaEvento;
}
