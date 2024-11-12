package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Colaborador;
import com.example.ColaborandoApplication.Entity.ColaboradoresEmpleos;
import com.example.ColaborandoApplication.Entity.Empleos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ColaboradoresEmpleosRepository extends JpaRepository<ColaboradoresEmpleos, Integer>
{
    List<ColaboradoresEmpleos> findByEmpleosId(Integer empleoId);
    List<ColaboradoresEmpleos> findByEmpleosIdInAndColaborador(List<Integer> idsEmpleos, Colaborador colaborador);
    List<ColaboradoresEmpleos> findByColaborador(Colaborador colaborador);

    ColaboradoresEmpleos findFirstByColaboradorAndStatus(Colaborador colaborador, String active);
}
