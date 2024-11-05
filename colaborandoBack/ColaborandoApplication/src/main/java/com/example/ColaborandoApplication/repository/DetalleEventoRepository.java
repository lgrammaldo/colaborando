package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.DetalleEvento;
import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.Entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DetalleEventoRepository extends JpaRepository<DetalleEvento, Integer> {
    List<DetalleEvento> findByEvento(Evento evento);

    DetalleEvento findByEventoAndEmpleos(Evento evento, Empleos empleos);
}
