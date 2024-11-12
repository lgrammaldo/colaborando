package com.example.ColaborandoApplication.DTO;

import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.DetalleEvento;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@RequiredArgsConstructor
public class AsistenciasConfirmadasDTO {
    private Colaborador colaborador;
    private ColaboradoresEmpleos colaboradoresEmpleos;
    private DetalleEvento detalleEvento;
    private Integer solicitudId;
}
