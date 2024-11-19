package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface AsistenciasConfirmadasRepository extends JpaRepository<AsistenciasConfirmadas, Integer> {
    boolean existsByColaboradoresEmpleosAndFechaEvento(ColaboradoresEmpleos colaboradoresEmpleos, Date fechaEvento);

    List<AsistenciasConfirmadas> findByColaboradoresEmpleos(ColaboradoresEmpleos colaboradoresEmpleos);

    List<AsistenciasConfirmadas> findByColaborador (Colaborador colaborador);

    List<AsistenciasConfirmadas> findByEvento(Evento evento);

}
