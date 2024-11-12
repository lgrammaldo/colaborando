package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.Entity.ReporteHoras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByStatus(String status);

    @Query("SELECT e FROM Evento e WHERE e.status = :status AND e.status = :colaborador")
    List<Evento> findByStatusAndColaborador(@Param("status") String status, @Param("colaborador") String colaborador);

}

