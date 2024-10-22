package com.example.ColaborandoApplication.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class AsociarEmpleosDTO {
    private List<Integer> empleosSeleccionados;
    private Integer userId;
}
