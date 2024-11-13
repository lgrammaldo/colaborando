package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.DTO.EventoDTO;
import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.mapper.EventoMapper;
import com.example.ColaborandoApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class DetalleEventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private DetalleEventoRepository detalleEventoRepository;

    public List<DetalleEvento> getDetalleEvento(Integer idEvento){
        try{
            Evento evento = eventoRepository.findById(idEvento)
                    .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
            List<DetalleEvento> detalleEventos = detalleEventoRepository.findByEvento(evento);

            return detalleEventos;
        } catch (Exception e) {
            System.out.println("Error al buscar el Evento: {}"+ e.getMessage()+"\n");
        }
        return  null;
    }


}
