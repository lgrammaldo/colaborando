package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Solicitudes;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface SolicitudesRepository extends JpaRepository<Solicitudes, Integer> {
    boolean existsByColaboradoresEmpleosAndFechaEvento(ColaboradoresEmpleos colaboradoresEmpleos, Date fechaEvento);

   /* @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Asistencia a " +
            "WHERE a.colaboradoresEmpleos = :colaboradoresEmpleos AND " +
            "DATE(a.fechaEvento) = :fechaEventoSinHora")
    boolean existsByColaboradoresEmpleosAndFechaEvento(
            @Param("colaboradoresEmpleos") ColaboradoresEmpleos colaboradoresEmpleos,
            @Param("fechaEventoSinHora") LocalDate fechaEventoSinHora);*/

    List<Solicitudes> findByColaboradoresEmpleos(ColaboradoresEmpleos colaboradoresEmpleos);

}
