package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Evento;
import com.example.ColaborandoApplication.Entity.ReporteHoras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReporteHorasRepository extends JpaRepository<ReporteHoras, Integer> {

    @Query("SELECT e FROM ReporteHoras e WHERE e.idColaborador = :colaborador")
    List<ReporteHoras> findByHorasColaborador(@Param("colaborador") Integer colaborador);

}

