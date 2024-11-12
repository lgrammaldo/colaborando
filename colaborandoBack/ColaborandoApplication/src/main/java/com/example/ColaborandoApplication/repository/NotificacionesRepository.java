package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.Entity.Notificaciones;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacionesRepository extends JpaRepository<Notificaciones, Integer> {
    List<Notificaciones> findByColaboradoresEmpleosIn(List<ColaboradoresEmpleos> colaboradoresEmpleos);
    List<Notificaciones> findByColaboradoresEmpleosInAndStatus(List<ColaboradoresEmpleos> colaboradoresEmpleos, String status);

    List<Notificaciones> findByEvento(Evento evento);
}
