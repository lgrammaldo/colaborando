package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Asistencia;
import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Integer> {
    boolean existsByColaboradoresEmpleosAndFechaEvento(ColaboradoresEmpleos colaboradoresEmpleos, Date fechaEvento);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Asistencia a " +
            "WHERE a.colaboradoresEmpleos = :colaboradoresEmpleos AND " +
            "DATE(a.fechaEvento) = :fechaEventoSinHora")
    boolean existsByColaboradoresEmpleosAndFechaEvento(
            @Param("colaboradoresEmpleos") ColaboradoresEmpleos colaboradoresEmpleos,
            @Param("fechaEventoSinHora") LocalDate fechaEventoSinHora);

    List<Asistencia> findByColaboradoresEmpleos(ColaboradoresEmpleos colaboradoresEmpleos);

}
