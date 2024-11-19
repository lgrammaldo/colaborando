package com.example.ColaborandoApplication.service;

import com.example.ColaborandoApplication.Entity.*;
import com.example.ColaborandoApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class AsistenciasConfirmadasService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AsistenciasConfirmadasRepository asistenciasConfirmadasRepository;

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Autowired
    DetalleEventoRepository detalleEventoRepository;

    @Autowired
    private SolicitudesRepository solicitudesRepository;

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

    public void cancelarAsistenciaColaborador(Integer eventoId, Integer user_id){
        try{
            Usuario usuario = usuarioRepository.findById(user_id)
                    .orElseThrow(() -> new IllegalArgumentException("Colaborador no encontrado"));
            Colaborador colaborador = colaboradorRepository.findByUsuario(usuario);

            List<AsistenciasConfirmadas> asistencias = asistenciasConfirmadasRepository.findByColaborador(colaborador);

            AsistenciasConfirmadas asistencia = asistencias.stream()
                    .filter(asist -> asist.getEvento().getId_evento().equals(eventoId))
                    .findFirst()
                    .orElse(null);

            DetalleEvento de = detalleEventoRepository.findByEventoAndEmpleos(asistencia.getEvento(), asistencia.getColaboradoresEmpleos().getEmpleos());
            de.setCantidadDisponible(de.getCantidadDisponible()+1);

            Solicitudes solicitudes = new Solicitudes();
            solicitudes.setColaboradoresEmpleos(asistencia.getColaboradoresEmpleos());
            solicitudes.setDetalleEvento(de);
            solicitudes.setFechaEvento(de.getEvento().getFecha_inicio());
            solicitudes.setStatus("Cancelled");
            solicitudesRepository.save(solicitudes);

            asistenciasConfirmadasRepository.delete(asistencia);
        } catch (Exception e) {
            System.out.println("Error al buscar los Eventos: {}"+ e.getMessage()+"\n");
        }
    }




}
