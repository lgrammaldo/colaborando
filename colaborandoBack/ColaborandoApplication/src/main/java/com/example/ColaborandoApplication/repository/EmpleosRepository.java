package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Empleos;
import com.example.ColaborandoApplication.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpleosRepository extends JpaRepository<Empleos, Integer> {
    List<Empleos> findAllByOrderByNombreAsc();
}
