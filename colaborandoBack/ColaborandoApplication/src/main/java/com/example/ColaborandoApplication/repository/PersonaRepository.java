package com.example.ColaborandoApplication.repository;

import com.example.ColaborandoApplication.Entity.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Colaborador, Integer> {
}
