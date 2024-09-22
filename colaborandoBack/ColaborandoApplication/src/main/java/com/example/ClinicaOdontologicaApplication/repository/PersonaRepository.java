package com.example.ClinicaOdontologicaApplication.repository;

import com.example.ClinicaOdontologicaApplication.Entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer> {
}
