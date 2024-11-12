package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
public class AsistenciasConfirmadasService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AsistenciasConfirmadasRepository asistenciasConfirmadasRepository;


    @Transactional(rollbackOn = Exception.class)

    public List<AsistenciasConfirmadas> getEventoAsistentes(Integer idEvento){
        try{
            Evento evento = eventoRepository.findById(idEvento)
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
            List<AsistenciasConfirmadas> asistenciasConfirmadas = asistenciasConfirmadasRepository.findByEvento(evento);
            return asistenciasConfirmadas;
        } catch (Exception e) {
            System.out.println("Error al buscar los asistentes al Eventos: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }




}
