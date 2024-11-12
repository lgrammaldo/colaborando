package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.AsistenciasConfirmadas;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.Solicitudes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AsistenciasConfirmadasRepository extends JpaRepository<AsistenciasConfirmadas, Integer> {
    boolean existsByColaboradoresEmpleosAndFechaEvento(ColaboradoresEmpleos colaboradoresEmpleos, Date fechaEvento);

    List<AsistenciasConfirmadas> findByColaboradoresEmpleos(ColaboradoresEmpleos colaboradoresEmpleos);

    List<AsistenciasConfirmadas> findByColaborador (Colaborador colaborador);

}
